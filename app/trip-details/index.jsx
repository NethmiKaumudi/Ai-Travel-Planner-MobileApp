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
import { Colors } from "./../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const UNSPLASH_ACCESS_KEY = "mqALTYeQ6QdGjWuvLmD5rOlSG3pzNjmGIls5EJn67MY"; // Replace with your Unsplash API key

const TripDetails = () => {
  const [tripDetails, setTripDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flightImage, setFlightImage] = useState(null);
  const [tripImage, setTripImage] = useState(null);

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

        const tripData = trips[0]?.tripData || {};
        setTripDetails(tripData);
        setFlightImage(tripData.flight_details?.image_url || null);
        setTripImage(tripData.image_url || null);

        if (!tripData.image_url) {
          fetchUnsplashImage(tripData.destination);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching trips:", err);
        setError("Failed to fetch trips. Please try again later.");
        setLoading(false);
      }
    };

    const fetchUnsplashImage = async (query) => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: { query: query, per_page: 1 },
            headers: {
              Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
          }
        );
        const imageUrl = response.data.results[0]?.urls?.regular;
        setTripImage(imageUrl || null);
      } catch (err) {
        console.error("Error fetching Unsplash image:", err);
      }
    };

    fetchUserTrips();
  }, [user]);

  const handleBookFlight = () => {
    const flightDetails = tripDetails.flight_details;

    if (!flightDetails) {
      Alert.alert("Error", "Flight details are not available.");
      return;
    }

    const { departure_city, departure_date, flight_number, price } = flightDetails;
    const bookingUrl = "https://www.britishairways.com/";

    const message = `Flight Details:\n
      Departure City: ${departure_city}\n
      Departure Date: ${departure_date}\n
      Flight Number: ${flight_number}\n
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

  const renderArrayItems = (items, Component, emptyMessage, icon) => {
    if (Array.isArray(items) && items.length > 0) {
      return items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          {icon && (
            <Icon
              name={icon}
              size={24}
              color={Colors.primary}
              style={styles.icon}
            />
          )}
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
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
              Start Date: {tripDetails.startdate || "N/A"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="calendar-today" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>
              End Date: {tripDetails.enddate || "N/A"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="people" size={20} color={Colors.primary} />
            <Text style={styles.detailText}>
              Travelers: {tripDetails.travelers || "N/A"}
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flight Details:</Text>
          <View style={styles.flightContainer}>
            <Text style={styles.detailText}>
              Airline: {tripDetails.flight_details?.airline || "N/A"}
            </Text>
            <Text style={styles.detailText}>
              Route: {tripDetails.flight_details?.departure_city || "N/A"} to{" "}
              {tripDetails.flight_details?.arrival_city || "N/A"}
            </Text>
            <Text style={styles.detailText}>
              Departure: {tripDetails.flight_details?.departure_date || "N/A"}
            </Text>
            <Text style={styles.detailText}>
              Flight Number: {tripDetails.flight_details?.flight_number || "N/A"}
            </Text>
            <Text style={styles.detailText}>
              Price: ${tripDetails.flight_details?.price || "N/A"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleBookFlight}
            style={styles.bookButton}
          >
            <Text style={styles.bookButtonText}>Book Flight</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hotel Details:</Text>
          {renderArrayItems(
            tripDetails.hotels || [],
            HotelDetails,
            "No hotel details available."
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Place Details:</Text>
          {renderArrayItems(
            tripDetails.places || [],
            PlaceDetails,
            "No place details available."
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Plans:</Text>
          {renderArrayItems(
            tripDetails.daily_plans || [],
            DailyPlan,
            "No daily plans available.",
            "today"
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center', // Centering content horizontally
  },
  iconButton: {
    position: 'absolute',
    left: 20, // Positioning the back icon to the left
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center", // Center the title text
    color: Colors.white, // Ensure the title color contrasts well
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  destination: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
  },
  flightContainer: {
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  itemContainer: {
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});


export default TripDetails;
