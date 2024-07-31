import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from './../../constants/Colors'; // Ensure this path is correct

// Import your image
import tripImage from './../../assets/images/mytrip.png'; // Update this path as needed

const UserTripList = ({ trips }) => {
  return (
    <View style={styles.container}>
      {/* Display the image at the top */}
      <Image source={tripImage} style={styles.image} />

      {trips.length > 0 ? (
        <>
          {/* Display the most recent trip in a large box */}
          <View style={styles.largeTripBox}>
            <Text style={styles.tripTitle}>Recent Trip:</Text>
            <Text style={styles.tripContent}>{trips[0]?.aiResponse || "No data available"}</Text>
          </View>
          {/* Display other trips in smaller boxes */}
          {trips.slice(1).map((trip) => (
            <View key={trip.id} style={styles.smallTripBox}>
              <Text style={styles.tripTitle}>Trip:</Text>
              <Text style={styles.tripContent}>{trip.aiResponse || "No data available"}</Text>
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
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200, // Adjust the height as needed
    borderRadius: 10,
    marginBottom: 20,
  },
  largeTripBox: {
    backgroundColor: Colors.light.primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  smallTripBox: {
    backgroundColor: Colors.light.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  tripContent: {
    fontSize: 16,
    color: Colors.light.text,
  },
  noTrips: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: "center",
    marginTop: 20,
  },
});

export default UserTripList;
