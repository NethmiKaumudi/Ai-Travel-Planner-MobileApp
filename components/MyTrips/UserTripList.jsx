import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Colors } from "./../../constants/Colors"; // Ensure this path is correct
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Material Icons
import { useRouter } from "expo-router";

// Import your image
import tripImage from "./../../assets/images/mytrip.png"; // Update this path as needed

const UserTripList = ({ trips }) => {
  
  const router = useRouter();
  console.log("UserTripList trips:", trips);

  const handleSeeYourPlan = (tripData) => {
    console.log("UserTripList handleSeeYourPlan tripData:", tripData);
    router.push({
      pathname: "/trip-details",
      params: { tripData: JSON.stringify(tripData) }, // Convert tripData to a JSON string
    });
  };
  

  return (
    <View style={styles.container}>
      {/* Display the image at the top */}
      <Image source={tripImage} style={styles.image} />

      {trips.length > 0 ? (
        <>
          {/* Display the latest trip review data */}
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>Latest Trip Review:</Text>
            <View style={styles.detailContainer}>
              <Icon name="place" size={20} color={Colors.light.icon} />
              <Text style={styles.tripDetail}>
                Destination:{" "}
                {trips[0]?.tripData?.selectedPlace?.place_name ||
                  "No data available"}
              </Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="attach-money" size={20} color={Colors.light.icon} />
              <Text style={styles.tripDetail}>
                Budget: {trips[0]?.tripData?.budget || "No data available"}
              </Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="people" size={20} color={Colors.light.icon} />
              <Text style={styles.tripDetail}>
                Travelers:{" "}
                {trips[0]?.tripData?.travelers || "No data available"}
              </Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="calendar-today" size={20} color={Colors.light.icon} />
              <Text style={styles.tripDetail}>
                Travel Dates: {trips[0]?.tripData?.travelDates?.startDate} to{" "}
                {trips[0]?.tripData?.travelDates?.endDate ||
                  "No data available"}
              </Text>
            </View>
          </View>

          {/* "See Your Plan" Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSeeYourPlan(trips[0]?.tripData)}
          >
            <Text style={styles.buttonText}>See Your Plan</Text>
          </TouchableOpacity>

          {/* Display other trips in smaller boxes */}
          <Text style={styles.reviewTitle}>My Trips</Text>

          {trips.slice(0).map((trip) => (
            <View key={trip.id} style={styles.tripBox}>
              <Image
                source={{
                  uri:
                    trip.tripData?.imageURL ||
                    "https://assets.vogue.com/photos/6603d64d13a27b5703522946/master/w_2560%2Cc_limit/509288876",
                }}
                style={styles.tripImage}
              />
              <Text style={styles.tripTitle}>Trip:</Text>
              <View style={styles.detailContainer}>
                <Icon name="place" size={20} color={Colors.white} />
                <Text style={styles.tripDetail}>
                  Destination:{" "}
                  {trip.tripData?.selectedPlace?.place_name ||
                    "No data available"}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Icon name="attach-money" size={20} color={Colors.white} />
                <Text style={styles.tripDetail}>
                  Budget: {trip.tripData?.budget || "No data available"}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Icon name="people" size={20} color={Colors.white} />
                <Text style={styles.tripDetail}>
                  Travelers: {trip.tripData?.travelers || "No data available"}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Icon name="calendar-today" size={20} color={Colors.white} />
                <Text style={styles.tripDetail}>
                  Travel Dates: {trip.tripData?.travelDates?.startDate} to{" "}
                  {trip.tripData?.travelDates?.endDate || "No data available"}
                </Text>
              </View>
            </View>
          ))}
        </>
      ) : (
        <Text style={styles.noTrips}>No trips found.</Text>
      )}
    </View>
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
  reviewContainer: {
    marginBottom: 20,
  },
  reviewTitle: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    color: Colors.light.text,
    marginBottom: 10,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tripDetail: {
    fontSize: 16,
    fontFamily: "outfit-regular",
    color: Colors.light.text,
    marginLeft: 10,
  },
  button: {
    backgroundColor: Colors.light.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.light.background,
    fontFamily: "outfit-bold",
  },
  tripBox: {
    backgroundColor: Colors.dark.greenTint,
    padding: 11,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  tripImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  noTrips: {
    fontSize: 18,
    color: Colors.light.text,
    textAlign: "center",
    marginTop: 20,
  },
});

export default UserTripList;
