import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from "../../config/FirebaseConfig"; // Adjust the import path as needed
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";

// Function to get initials from a name or email
const getInitials = (value) => {
  if (!value) return "";
  const parts = value.split(" ");
  if (parts.length === 1) {
    // Single part (like email), take the first two letters
    return value.slice(0, 2).toUpperCase();
  }
  // Multiple parts (like full name), take the first letter of each part
  return parts.map(part => part.charAt(0)).join("").toUpperCase();
};

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.replace("/auth/sign-in"); // Redirect to sign-in if not logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.replace("/auth/sign-in"); // Redirect to sign-in page after logout
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  if (!user) {
    return null; // or a loading spinner
  }

  // Get initials based on display name or email
  const initials = getInitials(user.displayName || user.email);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.initialsContainer}>
          <Text style={styles.initialsText}>
            {initials}
          </Text>
        </View>
        <Text style={styles.userName}>{user.displayName || user.email.split('@')[0]}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{user.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>UID:</Text>
          <Text style={styles.detailValue}>{user.uid}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF", // White background
    alignItems: "center",
    justifyContent: "center",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  initialsContainer: {
    backgroundColor: "#2E7D32", // Dark green background
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 4, // Adds shadow effect
  },
  initialsText: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  detailsContainer: {
    width: "100%",
    backgroundColor: "#E8F5E9", // Light green background
    padding: 15,
    borderRadius: 10,
    elevation: 4, // Adds shadow effect
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 18,
    color: "#2E7D32",
    fontWeight: "bold",
  },
  detailValue: {
    fontSize: 18,
    color: "#2E7D32",
  },
  signOutButton: {
    backgroundColor: "#C62828",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
  },
  signOutButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});
