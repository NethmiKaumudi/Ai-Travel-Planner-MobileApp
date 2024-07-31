import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "./../../constants/Colors"; // Ensure this path is correct
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import UserTripList from "../../components/MyTrips/UserTripList"; // Import the new component
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "./../../config/FirebaseConfig"; // Import Firebase config
import { getAuth } from "firebase/auth";

export default function MyTripScreen() {
  const [showStartNewTripCard, setShowStartNewTripCard] = useState(false);
  const [trips, setTrips] = useState([]);

  const handleAddButtonPress = () => {
    setShowStartNewTripCard(true);
  };

  const handleCloseCard = () => {
    setShowStartNewTripCard(false);
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const user = getAuth().currentUser;
        if (!user) throw new Error("User not authenticated");
        const email = user.email;

        // Query trips from Firestore
        const q = query(collection(db, "userTrips"), where("email", "==", email), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        const fetchedTrips = [];
        querySnapshot.forEach((doc) => {
          fetchedTrips.push({ id: doc.id, ...doc.data() });
        });

        setTrips(fetchedTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
          <MaterialIcons name="add" size={28} color={Colors.light.background} />
        </TouchableOpacity>
      </View>
      {showStartNewTripCard ? (
        <StartNewTripCard onClose={handleCloseCard} />
      ) : (
        <View style={styles.tripContent}>
          {trips.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyText}>No trips available.</Text>
              <Text style={styles.emptyText}>Click '+' to create a new trip.</Text>
            </View>
          ) : (
            <ScrollView style={styles.tripList}>
              <UserTripList trips={trips} />
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: "outfit-bold",
    color: Colors.light.text,
    letterSpacing: 1.2,
  },
  addButton: {
    backgroundColor: Colors.light.greenTint,
    borderRadius: 24,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.light.greenTint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  tripContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripList: {
    flex: 1,
    width: '100%',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 10,
  },
});
