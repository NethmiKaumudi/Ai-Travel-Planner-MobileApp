import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig'; // Update this path as needed
import { useRouter } from 'expo-router';
import UserTripList from './../../components/MyTrips/UserTripList'; // Update this path as needed
import StartNewTripCard from './../../components/MyTrips/StartNewTripCard'; // Update this path as needed
import { Colors } from './../../constants/Colors'; // Update this path as needed

const MyTripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStartNewTripCard, setShowStartNewTripCard] = useState(false);
  const user = getAuth().currentUser;
  const router = useRouter();

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

        console.log("Fetched trips:", fetchedTrips); // Debug log

        setTrips(fetchedTrips);
        setShowStartNewTripCard(fetchedTrips.length === 0);
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
    setShowStartNewTripCard(true);
  };

  const handleCloseNewTripCard = () => {
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
        <ScrollView style={styles.content}>
          {showStartNewTripCard ? (
            <StartNewTripCard onClose={handleCloseNewTripCard} />
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
  content: {
    flex: 1,
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyTripsPage;
