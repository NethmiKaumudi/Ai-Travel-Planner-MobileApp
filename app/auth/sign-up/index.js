import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../../config/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = () => {
    // Redirect to sign-in page
    router.push("/auth/sign-in"); // Adjust the route as needed
  };
  const OnCreateAccount = () => {
    if (!email && !password&& !fullName) {
      ToastAndroid.show("please enter all details", ToastAndroid.BOTTOM);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
          // Clear the input fields
          setFullName("");
          setEmail("");
          setPassword("");
          
          ToastAndroid.show("Account created successfully!", ToastAndroid.BOTTOM);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
        ToastAndroid.show("Failed to create account. Please try again.", ToastAndroid.BOTTOM);

      });
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

      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

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
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={OnCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={handleSignIn}>
        <Text style={styles.linkText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9", // Light green background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32", // Dark green color for title
    marginBottom: 30, // Bottom margin
    marginTop: 30, // Top margin
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#2E7D32", // Dark green color for labels
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 15,
    borderColor: "#A5D6A7", // Light green border
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  showPasswordText: {
    color: "#2E7D32", // Dark green color for 'Show/Hide' text
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#2E7D32", // Dark green button
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginVertical: 10, // Vertical margin
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
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
