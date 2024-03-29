const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mysql = require("mysql2");
require("dotenv").config();

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
   host: "liderpma.finistcom.kz",
   user: "eventmakeruser",
   password: "eventmaker0947",
   database: "eventmaker", // Add your database name here
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

//AIzaSyAhE5oyGpmj4LnZYc6UgkEHT78kOnu_tTg

//ChIJdxd9pig1-EIRUZdplpzA8GI
