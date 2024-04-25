const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const passport = require("passport");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const path = require("path");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.listen(port, () => {
   console.log("Server running on port", port);
});

const pool = mysql.createPool({
   host: "tools.goo.kz",
   user: "eventmakeruser",
   password: "eventmaker0947",
   database: "eventmaker", // Add your database name here
});

// Configure multer
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "uploads/"); // Specify where to save the uploaded files
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp as filename
   },
});

const upload = multer({ storage: storage });

// Route to handle file upload
app.post("/upload", upload.single("image"), (req, res) => {
   if (req.file) {
      console.log("Received file:", req.file);
      res.status(200).json({ message: "File uploaded successfully!" });
   } else {
      res.status(400).json({ message: "No file uploaded" });
   }
});

// Test the connection pool
pool.getConnection((err, connection) => {
   if (err) {
      console.error("Error connecting to MySQL database:", err);
      return;
   }
   console.log("Connected to MySQL database!");
   connection.release(); // Release the connection back to the pool
});

// Route to handle HTTP requests
app.get("/markers", (req, res) => {
   // Get a connection from the pool
   console.log("markers");
   pool.getConnection((err, connection) => {
      if (err) {
         console.error("Error getting MySQL connection:", err);
         res.status(500).json({ message: "Error connecting to database" });
         return;
      }

      // Execute SQL query
      connection.query(
         "SELECT * FROM events WHERE visible = 1",
         (error, results, fields) => {
            // Release the connection back to the pool
            connection.release();

            if (error) {
               console.error("Error executing SQL query:", error);
               res.status(500).json({ message: "Error executing query" });
               return;
            }
            res.json(results); // Send query results as JSON response
         }
      );
   });
});

// Example route to handle saving a marker
app.post("/saveMarker", async (req, res) => {
   try {
      console.log("saveMarker");
      const { title, description, coordinate, time, visible, id_user } =
         req.body;

      // Get a connection from the pool
      pool.getConnection((err, connection) => {
         if (err) {
            console.error("Error getting MySQL connection:", err);
            res.status(500).json({
               message: "Error getting database connection",
               error: err,
            });
            return;
         }

         // Execute the SQL query using the obtained connection
         const sql =
            "INSERT INTO events (title, description, coordinate, time, visible, id_user) VALUES (?, ?, ?, ?, ?, ?)";
         connection.execute(
            sql,
            [title, description, coordinate, time, visible, id_user],
            (error, results) => {
               // Release the connection back to the pool
               connection.release();

               if (error) {
                  console.error("Error executing SQL query:", error);
                  res.status(500).json({
                     message: "Error executing SQL query",
                     error: error,
                  });
                  return;
               }

               console.log(
                  "Data inserted successfully:",
                  results.affectedRows,
                  "rows affected"
               );
               res.status(201).json({
                  message: "Data inserted successfully",
                  affectedRows: results.affectedRows,
               });
            }
         );
      });
   } catch (error) {
      console.error("Error saving marker:", error);
      res.status(500).json({
         message: "An internal server error occurred",
         error: error,
      });
   }
});

app.put("/updateMarker/:id", (req, res) => {
   // Get marker ID from request parameters
   const markerId = req.params.id;

   // Extract updated marker data from request body
   const { title, description, coordinate, time, visible, id_user } = req.body;

   // Execute the update query
   pool.getConnection((err, connection) => {
      if (err) {
         console.error("Error getting MySQL connection:", err);
         res.status(500).json({ message: "Error connecting to database" });
         return;
      }

      // Execute SQL query to update the marker
      connection.query(
         `UPDATE events SET title=?, description=?,  time=?, visible=?, id_user=? WHERE id=?`,
         [title, description, time, visible, id_user, markerId],
         (error, results, fields) => {
            // Release the connection back to the pool
            connection.release();

            if (error) {
               console.error("Error executing SQL query:", error);
               res.status(500).json({ message: "Error updating marker" });
               return;
            }

            // Check if any rows were affected by the update
            if (results.affectedRows === 0) {
               res.status(404).json({ message: "Marker not found" });
               return;
            }

            // Send a success response
            res.json({ message: "Marker updated successfully" });
         }
      );
   });
});

//endpoint for registration of the user

app.post("/register", async (req, res) => {
   try {
      console.log("register");
      const { name, email, password } = req.body;

      const salt = await bcrypt.genSalt();
      const psswordHash = await bcrypt.hash(password, salt);

      // Get a connection from the pool
      pool.getConnection((err, connection) => {
         if (err) {
            console.error("Error getting MySQL connection:", err);
            res.status(500).json({
               message: "Error getting database connection",
               error: err,
            });
            return;
         }

         // Execute the SQL query using the obtained connection
         const sql =
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
         connection.execute(
            sql,
            [name, email, psswordHash],
            (error, results) => {
               // Release the connection back to the pool
               connection.release();

               if (error) {
                  console.error("Error executing SQL query:", error);
                  res.status(500).json({
                     message: "Error executing SQL query",
                     error: error,
                  });
                  return;
               }

               console.log(
                  "Data inserted successfully:",
                  results.affectedRows,
                  "rows affected"
               );
               res.status(200).json({
                  message: "Data inserted successfully",
                  affectedRows: results.affectedRows,
               });
            }
         );
      });
   } catch (error) {
      console.error("Error saving marker:", error);
      res.status(500).json({
         message: "An internal server error occurred",
         error: error,
      });
   }
});

//function to create a token for the user
const createToken = (userId) => {
   // Set the token payload
   const payload = {
      userId: userId,
   };

   // Generate the token with a secret key and expiration time
   const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });

   return token;
};

//endpoint for logging in of that particular user
app.post("/login", (req, res) => {
   try {
      const { email, password } = req.body;

      // Get a connection from the pool
      pool.getConnection((err, connection) => {
         if (err) {
            console.error("Error getting MySQL connection:", err);
            res.status(500).json({
               message: "Error getting database connection",
               error: err,
            });
            return;
         }

         //check if the email and password are provided
         if (!email || !password) {
            return res
               .status(404)
               .json({ message: "Email and the password are required" });
         }

         // Execute SQL query
         connection.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (error, results, fields) => {
               // Release the connection back to the pool
               connection.release();

               if (error) {
                  console.error("Error executing SQL query:", error);
                  res.status(500).json({ message: "Error executing query" });
                  return;
               }
               if (!results.length) {
                  return res.status(404).json({ message: "User not found" });
               }

               const isMatch = await bcrypt.compare(
                  password,
                  results[0].password
               );

               if (!isMatch)
                  return res.status(400).json({ message: "Invalid Password!" });

               const token = createToken(results[0].id);
               res.status(200).json({ token });

               // console.log(results[0].password, password);

               // res.json(results); // Send query results as JSON response
            }
         );
      });

      //check for that user in the database
      // User.findOne({ email })
      //    .then((user) => {
      //       if (!user) {
      //          //user not found
      //          return res.status(404).json({ message: "User not found" });
      //       }

      //       //compare the provided passwords with the password in the database
      //       if (user.password !== password) {
      //          return res.status(404).json({ message: "Invalid Password!" });
      //       }

      //       const token = createToken(user._id);
      //       res.status(200).json({ token });
      //    })
      //    .catch((error) => {
      //       console.log("error in finding the user", error);
      //       res.status(500).json({ message: "Internal server Error!" });
      //    });
   } catch (error) {
      console.error("Error saving marker:", error);
      res.status(500).json({
         message: "An internal server error occurred",
         error: error,
      });
   }
});

//AIzaSyAhE5oyGpmj4LnZYc6UgkEHT78kOnu_tTg

//ChIJdxd9pig1-EIRUZdplpzA8GI
