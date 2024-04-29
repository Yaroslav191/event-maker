import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import Colors from "../../constants/Colors";
import { Link, Stack } from "expo-router";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = () => {
   const router = useRouter();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);

   const handleRegister = () => {
      const user = {
         email: email,
         password: password,
      };

      axios
         .post("http://192.168.0.113:8000/login", user)
         .then((response) => {
            const token = response.data.token;

            AsyncStorage.setItem("token", token);

            console.log(response.data.token);
            // Alert.alert(
            //    "Registration successful",
            //    "You have been registered Successfully"
            // );
            // setName("");
            // setEmail("");
            // setPassword("");
            // setImage("");

            if (response.status === 200) {
               router.push({
                  pathname: "/(map)",
               });
            }
         })
         .catch((error) => {
            Alert.alert(
               "Registration Error",
               "An error occurred while registering"
            );
            console.log("Registration failed", error);
         });
   };

   return (
      <View style={styles.container}>
         <Stack.Screen options={{ title: "Sign in" }} />

         <Text style={styles.label}>Email</Text>
         <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="jon@gmail.com"
            style={styles.input}
         />

         <Text style={styles.label}>Password</Text>
         <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder=""
            style={styles.input}
            secureTextEntry
         />

         <Button
            onPress={handleRegister}
            disabled={loading}
            text={loading ? "Signing in..." : "Sign in"}
         />
         <Link href="/sign-up" style={styles.textButton}>
            Create an account
         </Link>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      padding: 20,
      justifyContent: "center",
      flex: 1,
   },
   label: {
      color: "gray",
   },
   input: {
      borderWidth: 1,
      borderColor: "gray",
      padding: 10,
      marginTop: 5,
      marginBottom: 20,
      backgroundColor: "white",
      borderRadius: 5,
   },
   textButton: {
      alignSelf: "center",
      fontWeight: "bold",
      color: Colors.light.tint,
      marginVertical: 10,
   },
});

export default SignInScreen;
