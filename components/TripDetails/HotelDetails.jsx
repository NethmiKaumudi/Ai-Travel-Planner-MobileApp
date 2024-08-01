import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { Colors } from "./../../constants/Colors"; // Adjust the path accordingly

const HotelDetails = ({ name, address, description, geo_coordinates, image_url, price, rating }) => {
  const handleShowLocation = () => {
    if (!geo_coordinates) {
      Alert.alert("Location", "Geo-coordinates are not available.");
      return;
    }

    const { latitude, longitude } = geo_coordinates;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    
    Linking.openURL(url).catch((err) => Alert.alert("Error", "Failed to open map."));
  };

  if (!name || !address || !description || !image_url) {
    return <Text>Hotel details are not available.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* {image_url ? (
        <Image source={{ uri: image_url }} style={styles.image} />
      ) : (
        <Text>No image available.</Text>
      )} */}
      <Text style={styles.name}>{name}</Text>
      <Text>{address}</Text>
      <Text>{description}</Text>
      <Text>Price: ${price}</Text>
      <Text>Rating: {rating} stars</Text>
      <TouchableOpacity style={styles.button} onPress={handleShowLocation}>
        <Text style={styles.buttonText}>Show Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.light.secondary,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HotelDetails;
