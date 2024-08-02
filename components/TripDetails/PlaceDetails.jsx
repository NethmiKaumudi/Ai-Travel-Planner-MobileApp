import React from 'react';
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';

const PlaceDetails = ({ name, details, geoCoordinates, imageUrl, ticketPricing, timeToTravel }) => {
  const openMap = () => {
    const [latitude, longitude] = geoCoordinates.split(', ').map(coord => parseFloat(coord));
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>{details}</Text>
      <Text style={styles.info}>Ticket Pricing: {ticketPricing}</Text>
      <Text style={styles.info}>Time to Travel: {timeToTravel}</Text>
      <TouchableOpacity style={styles.button} onPress={openMap}>
        <Text style={styles.buttonText}>View on Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 17,
    marginBottom: 10,
    color: '#333',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  button: {
    backgroundColor: '#28a745', // Green color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'stretch', // Make button fit the width of the container
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PlaceDetails;
