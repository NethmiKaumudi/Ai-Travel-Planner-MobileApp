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
import { Ionicons } from '@expo/vector-icons';
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
        setFlightImage(trips[0]?.tripData?.flight_details?.image_url || null);
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
    const flightDetails = tripDetails.flight_details;

    if (!flightDetails) {
      Alert.alert("Error", "Flight details are not available.");
      return;
    }

    const { departure_city, departure_date, flight_number, price } =
      flightDetails;
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
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>My Trip Plan</Text>
      </View>
      <Text style={styles.destination}>{tripDetails.destination}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Trip Details:
          </Text>
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

        <View style={styles.flightContainer}>
          <Text style={styles.sectionTitle}>Flight Details:</Text>
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
            Arrival: {tripDetails.flight_details?.arrival_date || "N/A"}
          </Text>
          <Text style={styles.detailText}>
            Price: ${tripDetails.flight_details?.price || "N/A"}
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
        {tripDetails.hotels && tripDetails.hotels.length > 0 ? (
          renderArrayItems(
            tripDetails.hotels,
            HotelDetails,
            "No hotel details available.",
            "hotel"
          )
        ) : (
          <Text style={styles.emptyMessage}>No hotels available.</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Places to Visit:</Text>
        {tripDetails.places_to_visit &&
        Array.isArray(tripDetails.places_to_visit) &&
        tripDetails.places_to_visit.length > 0 ? (
          renderArrayItems(
            tripDetails.places_to_visit,
            PlaceDetails,
            "No places to visit available.",
            "place"
          )
        ) : (
          <Text style={styles.emptyMessage}>No places to visit available.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Plan:</Text>
        {tripDetails.day_plan && Array.isArray(tripDetails.day_plan) ? (
          <DailyPlan dailyPlan={tripDetails.day_plan} />
        ) : (
          <Text style={styles.emptyMessage}>No daily plans available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
  },
  iconButton: {
    position: "absolute",
    left: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginTop:20,
  },
  destination: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  detailsContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
    textAlign:"center"
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
  },
  flightContainer: {
    backgroundColor: '#fce4ec',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyMessage: {
    textAlign: "center",
    color: '#888',
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    textAlign: "center",
    color: 'red',
    fontSize: 16,
  },
  itemContainer: {
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
});

export default TripDetails;
