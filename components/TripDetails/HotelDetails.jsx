import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { Colors } from './../../constants/Colors'; // Adjust the path accordingly
import Ionicons from 'react-native-vector-icons/Ionicons'; // For star icons

const HotelDetails = ({ name, address, description, geoCoordinates, imageUrl, price, rating }) => {
  const handleShowLocation = () => {
    if (!geoCoordinates) {
      Alert.alert("Location", "Geo-coordinates are not available.");
      return;
    }

    const [latitude, longitude] = geoCoordinates.split(', ').map(coord => parseFloat(coord));
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.openURL(url).catch((err) => Alert.alert("Error", "Failed to open map."));
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Ionicons key={i} name='star' size={20} color={Colors.primary} />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<Ionicons key={i} name='star-half' size={20} color={Colors.primary} />);
      } else {
        stars.push(<Ionicons key={i} name='star-outline' size={20} color={Colors.primary} />);
      }
    }

    return stars;
  };

  if (!name || !address || !description || !imageUrl) {
    return <Text style={styles.emptyMessage}>Hotel details are not available.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />} */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>Price: ${price}</Text>
      <View style={styles.ratingContainer}>
        {renderRatingStars(rating)}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleShowLocation}>
        <Text style={styles.buttonText}>Show Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.light.secondary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  address: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.primary,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: '#888',
  },
});

export default HotelDetails;
