import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  ScrollView,
} from "react-native";
import { db } from "./../../config/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Icon from "react-native-vector-icons/MaterialIcons";
import HotelDetails from "./../../components/TripDetails/HotelDetails";
import PlaceDetails from "./../../components/TripDetails/PlaceDetails";
import DailyPlan from "./../../components/TripDetails/DailyPlans";
import RestaurantDetails from "./../../components/TripDetails/RestaurantsDetails"; // Import the new component
import { Colors } from "./../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TripDetails = () => {
  const [tripDetails, setTripDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flightImage, setFlightImage] = useState(null);

  const user = getAuth().currentUser;
  const router = useRouter();

  useEffect(() => {
    const fetchUserTrips = async () => {
      try {
        if (!user || !user.email) {
          setError("User is not authenticated.");
          setLoading(false);
          return;
        }

        const email = user.email;
        const q = query(
          collection(db, "usersTrips"),
          where("email", "==", email)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("No trips found.");
          setLoading(false);
          return;
        }

        const trips = [];
        querySnapshot.forEach((doc) => {
          trips.push({ id: doc.id, ...doc.data() });
        });

        setTripDetails(trips[0]?.tripData || {});
        setFlightImage(trips[0]?.tripData?.flightDetails?.imageUrl || null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching trips:", err);
        setError("Failed to fetch trips. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserTrips();
  }, [user]);

  const handleBookFlight = () => {
    const flightDetails = tripDetails.flightDetails;

    if (!flightDetails) {
      Alert.alert("Error", "Flight details are not available.");
      return;
    }

    const { departureAirport, departureDate, flightNumber, price } =
      flightDetails;
    const bookingUrl = flightDetails.bookingUrl;

    const message = `Flight Details:\n
      Departure Airport: ${departureAirport}\n
      Departure Date: ${departureDate}\n
      Flight Number: ${flightNumber}\n
      Price: $${price}`;

    Alert.alert("Book Flight", message, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Book Now",
        onPress: () => Linking.openURL(bookingUrl),
      },
    ]);
  };

  const renderArrayItems = (items, Component, emptyMessage) => {
    if (Array.isArray(items) && items.length > 0) {
      return items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Component {...item} />
        </View>
      ));
    } else {
      return <Text style={styles.emptyMessage}>{emptyMessage}</Text>;
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={styles.loading}
      />
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!tripDetails) {
    return <Text style={styles.emptyMessage}>No trip data available.</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>My Trip Plan</Text>
      </View>
      <Text style={styles.destination}>{tripDetails.destination}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Details:</Text>
          <View style={styles.detailRow}>
            <Icon name="calendar-today" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>
              Start Date: {tripDetails.startDate || "N/A"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="calendar-today" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>
              End Date: {tripDetails.endDate || "N/A"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="people" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>
              Travelers: {tripDetails.family_size || "N/A"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="timer" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>
              Duration: {tripDetails.duration || "N/A"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="attach-money" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>
              Budget: {tripDetails.budget || "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.flightContainer}>
          <Text style={styles.sectionTitle}>Flight Details:</Text>
          <Text style={styles.detailText}>
            Airline: {tripDetails.flightDetails?.airline || "N/A"}
          </Text>
          <Text style={styles.detailText}>
            Route: {tripDetails.flightDetails?.departureAirport || "N/A"} to{" "}
            {tripDetails.flightDetails?.arrivalAirport || "N/A"}
          </Text>
          <Text style={styles.detailText}>
            Departure: {tripDetails.flightDetails?.departureDate || "N/A"}
          </Text>
          <Text style={styles.detailText}>
            Arrival: {tripDetails.flightDetails?.arrivalDate || "N/A"}
          </Text>
          <Text style={styles.detailText}>
            Price: ${tripDetails.flightDetails?.flightPrice || "N/A"}
          </Text>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBookFlight}
          >
            <Text style={styles.bookButtonText}>Book Flight</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hotels:</Text>
        {tripDetails.hotels &&
        Array.isArray(tripDetails.hotels) &&
        tripDetails.hotels.length > 0 ? (
          renderArrayItems(
            tripDetails.hotels,
            HotelDetails,
            "No hotels available."
          )
        ) : (
          <Text style={styles.emptyMessage}>No hotels available.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Places to Visit:</Text>
        {tripDetails.placesToVisit &&
        Array.isArray(tripDetails.placesToVisit) &&
        tripDetails.placesToVisit.length > 0 ? (
          renderArrayItems(
            tripDetails.placesToVisit,
            PlaceDetails,
            "No places to visit available."
          )
        ) : (
          <Text style={styles.emptyMessage}>No places to visit available.</Text>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Plans:</Text>
        {tripDetails.dailyPlan &&
        Array.isArray(tripDetails.dailyPlan) &&
        tripDetails.dailyPlan.length > 0 ? (
          renderArrayItems(
            tripDetails.dailyPlan,
            DailyPlan,
            "No daily plans available."
          )
        ) : (
          <Text style={styles.emptyMessage}>No daily plans available.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Restaurants:</Text>
        {tripDetails.restaurants &&
        Array.isArray(tripDetails.restaurants) &&
        tripDetails.restaurants.length > 0 ? (
          renderArrayItems(
            tripDetails.restaurants,
            RestaurantDetails,
            "No restaurants available."
          )
        ) : (
          <Text style={styles.emptyMessage}>No restaurants available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop:20,
  },
  iconButton: {
    position: "absolute",
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
  },
  destination: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.secondary,
    textAlign: "center",
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  bookButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    marginBottom: 15,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  error: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TripDetails;
