import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Colors } from "./../../constants/Colors"; // Ensure this path is correct
import { getAuth } from "firebase/auth";
import { db } from "./../../config/FirebaseConfig"; // Ensure this path is correct
import { collection, query, where, getDocs } from "firebase/firestore";

const TripDetails = () => {
  const [tripDetails, setTripDetails] = useState(null); // Initialize with null
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
        const trips = [];

        querySnapshot.forEach((doc) => {
          const tripData = doc.data();
          // Convert the Firestore data to JSON
          const jsonData = JSON.parse(JSON.stringify(tripData));
          console.log("Document ID:", doc.id, "=> Data:", jsonData);
          trips.push({ id: doc.id, ...jsonData });
        });

        if (trips.length > 0) {
          setTripDetails(trips[0]); // Set the latest trip data
        } else {
          setError("No trips found.");
        }
      } catch (error) {
        console.error("Error fetching user trips:", error);
        setError("Error fetching trips. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserTrips();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.noData}>{error}</Text>
      </View>
    );
  }

  if (!tripDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.noData}>No trip data available.</Text>
      </View>
    );
  }

  const dailyPlan = tripDetails.day_plan || [];
  const hotels = tripDetails.hotels || [];
  const placesToVisit = tripDetails.places_to_visit || [];

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: tripDetails.image_url }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{tripDetails.destination}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Flight Details:</Text>
        <Text>{tripDetails.flight_details?.airline}</Text>
        <Text>
          {tripDetails.flight_details?.departure_city} to{" "}
          {tripDetails.flight_details?.arrival_city}
        </Text>
        <Text>
          Departure Date: {tripDetails.flight_details?.departure_date}
        </Text>
        <Text>
          Arrival Date: {tripDetails.flight_details?.arrival_date}
        </Text>
        <Text>Price: ${tripDetails.flight_details?.price}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Hotels:</Text>
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <View key={index} style={styles.hotelContainer}>
              <Image source={{ uri: hotel.image_url }} style={styles.hotelImage} />
              <Text>{hotel.name}</Text>
              <Text>{hotel.address}</Text>
              <Text>Rating: {hotel.rating}</Text>
              <Text>Price: ${hotel.price}</Text>
            </View>
          ))
        ) : (
          <Text>No hotels available.</Text>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Places to Visit:</Text>
        {placesToVisit.length > 0 ? (
          placesToVisit.map((place, index) => (
            <View key={index} style={styles.placeContainer}>
              <Text>{place.name}</Text>
              <Text>{place.address}</Text>
              <Text>{place.opening_hours}</Text>
              <Text>{place.description}</Text>
            </View>
          ))
        ) : (
          <Text>No places to visit available.</Text>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Daily Plan:</Text>
        {dailyPlan.length > 0 ? (
          dailyPlan.map((dayPlan, index) => (
            <View key={index} style={styles.dayPlanContainer}>
              <Text style={styles.dayTitle}>Day {index + 1}</Text>
              <Text>{dayPlan.activity}</Text>
              <Text>{dayPlan.time}</Text>
            </View>
          ))
        ) : (
          <Text>No daily plan available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.light.background,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    color: Colors.light.text,
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    color: Colors.light.text,
    marginBottom: 10,
  },
  hotelContainer: {
    marginBottom: 10,
  },
  hotelImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeContainer: {
    marginBottom: 10,
  },
  dayPlanContainer: {
    marginBottom: 10,
  },
  dayTitle: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    color: Colors.light.text,
    marginBottom: 5,
  },
  noData: {
    fontSize: 18,
    color: Colors.light.text,
    textAlign: "center",
    marginTop: 20,
  },
});

export default TripDetails;
