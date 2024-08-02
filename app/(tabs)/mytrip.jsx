import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig'; // Update this path as needed
import UserTripList from './../../components/MyTrips/UserTripList'; // Update this path as needed
import StartNewTripCard from './../../components/MyTrips/StartNewTripCard'; // Update this path as needed
import { Colors } from './../../constants/Colors'; // Update this path as needed

const MyTripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStartNewTripCard, setShowStartNewTripCard] = useState(false);
  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchUserTrips = async () => {
      if (!user || !user.email) {
        setError("User email is missing.");
        setLoading(false);
        return;
      }

      const email = user.email;
      const q = query(collection(db, "usersTrips"), where("email", "==", email));

      try {
        const querySnapshot = await getDocs(q);
        const fetchedTrips = [];

        querySnapshot.forEach((doc) => {
          const tripData = doc.data();
          fetchedTrips.push({ id: doc.id, ...tripData });
        });

        setTrips(fetchedTrips);
      } catch (error) {
        console.error("Error fetching user trips:", error);
        setError("Error fetching trips. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserTrips();
  }, [user]);

  const handleAddNewTrip = () => {
    // Show the "Start New Trip" card
    setShowStartNewTripCard(true);
  };

  const handleCloseNewTripCard = () => {
    // Hide the "Start New Trip" card
    setShowStartNewTripCard(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
        <TouchableOpacity onPress={handleAddNewTrip} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.light.primary} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {showStartNewTripCard ? (
            <View style={styles.centeredContainer}>
              <StartNewTripCard onClose={handleCloseNewTripCard} />
            </View>
          ) : (
            <UserTripList trips={trips} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.light.primary,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop:20,
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginTop:20,

  },
  addButtonText: {
    fontSize: 20,
    color: Colors.light.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: '100%', // Ensure the container fills the available space
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyTripsPage;
