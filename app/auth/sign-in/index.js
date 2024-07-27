import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../../config/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = () => {
    if (!email && !password) {
      ToastAndroid.show("please enter all details", ToastAndroid.BOTTOM);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.replace("/mytrip");

        // Clear the input fields
        setEmail("");
        setPassword("");

        // Show success message
        ToastAndroid.show("Signed in successfully!", ToastAndroid.SHORT);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        // Show error message
        ToastAndroid.show(
          "Failed to sign in. Please try again.",
          ToastAndroid.SHORT
        );
      });
  };

  const handleCreateAccount = () => {
    // Redirect to create account page
    router.push("/auth/sign-up"); // Adjust the route as needed
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.iconContainer}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>
        You’ve been missed. Let’s get started.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={handleCreateAccount}>
        <Text style={styles.linkText}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E8F5E9", // Light green background
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20, // Added bottom margin
    color: "#2E7D32", // Dark green color for title
    marginTop: 30, // Added top margin
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30, // Added bottom margin
    color: "#388E3C", // Medium green color for subtitle
    textAlign: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#2E7D32", // Dark green for label
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 15,
    borderColor: "#A5D6A7", // Light green border
    borderWidth: 1,
    borderRadius: 25, // Rounded text field
    backgroundColor: "#FFF",
    marginBottom: 15, // Added bottom margin
  },
  button: {
    backgroundColor: "#2E7D32", // Dark green button
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25, // Rounded button
    marginVertical: 15, // Added vertical margin
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  link: {
    marginTop: 15, // Added top margin
  },
  linkText: {
    color: "#2E7D32", // Dark green for the link
    fontSize: 16,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
});
