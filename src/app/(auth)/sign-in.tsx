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
  const [error, setError] = useState(false);

  const handleRegister = async () => {
    try {
      const user = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://192.168.100.125:8000/login",
        user
      );

      console.log(response);

      const token = response.data.token;

      await AsyncStorage.setItem("token", token);

      router.push({
        pathname: "/(map)",
      });
    } catch (error: any) {
      setError(error.response.data.message);
    }
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

      {error ? <Text style={styles.errorMessage}>{error}</Text> : ""}

      <Link href="/sign-up" style={styles.textButton}>
        Create an account
      </Link>

      <Link href="/two" style={styles.textButton}>
        upload screen
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
  },
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
