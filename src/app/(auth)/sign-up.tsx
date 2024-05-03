import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import Colors from "../../constants/Colors";
import { Link, Stack } from "expo-router";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   async function signUpWithEmail() {
      if (email !== "" && password !== "") {
         const user = {
            email: email,
            password: password,
         };

         const response = await axios.post(
            "http://192.168.0.113:8000/register",
            user
         );

         router.push({
            pathname: "/sign-in",
         });
      }
   }

   return (
      <View style={styles.container}>
         <Stack.Screen options={{ title: "Sign up" }} />

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
            onPress={signUpWithEmail}
            disabled={loading}
            text={loading ? "Creating account..." : "Create account"}
         />
         <Link href="/sign-in" style={styles.textButton}>
            Sign in
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

export default SignUpScreen;
