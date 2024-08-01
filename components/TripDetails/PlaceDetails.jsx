import React from 'react';
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';

const PlaceDetails = ({ name, details, geo_coordinates, image_url, ticket_pricing, time_to_travel }) => {
  const openMap = () => {
    const [latitude, longitude] = geo_coordinates.split(', ').map(coord => parseFloat(coord));
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: image_url }} style={styles.image} /> */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>{details}</Text>
      <Text style={styles.info}>Ticket Pricing: {ticket_pricing}</Text>
      <Text style={styles.info}>Time to Travel: {time_to_travel}</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
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
