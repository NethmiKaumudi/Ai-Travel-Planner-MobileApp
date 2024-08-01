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
          console.log("Document ID:", doc.id, "=> Data:", JSON.stringify(tripData, null, 2));
          trips.push({ id: doc.id, ...tripData });
        });

        if (trips.length > 0) {
          // Assuming the latest trip is the first in the sorted array
          setTripDetails(trips[0]); // Set the latest trip data
          console.log(tripDetails)
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

  const dailyPlan = tripDetails.daily_plan || [];

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: tripDetails.destination_image_url }}
        style={styles.image}
        resizeMode="cover" // Ensure image fits well
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
        <Text>Price: {tripDetails.flight_details?.price}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Hotels:</Text>
        {tripDetails.hotels?.map((hotel, index) => (
          <View key={index} style={styles.hotelContainer}>
            <Image source={{ uri: hotel.image_url }} style={styles.hotelImage} />
            <Text>{hotel.name}</Text>
            <Text>{hotel.address}</Text>
            <Text>Rating: {hotel.rating}</Text>
            <Text>Price: {hotel.price}</Text>
          </View>
        )) || <Text>No hotels available.</Text>}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Places to Visit:</Text>
        {tripDetails.places_to_visit?.map((place, index) => (
          <View key={index} style={styles.placeContainer}>
            <Text>{place.name}</Text>
            <Text>{place.address}</Text>
            <Text>{place.opening_hours}</Text>
            <Text>{place.description}</Text>
          </View>
        )) || <Text>No places to visit available.</Text>}
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
