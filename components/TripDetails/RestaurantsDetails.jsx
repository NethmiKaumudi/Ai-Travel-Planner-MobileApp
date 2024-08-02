import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you have react-native-vector-icons installed

const RestaurantDetails = ({ name, description, geoCoordinates, imageUrl, menu, ratings }) => {
  const handleViewMenu = () => {
    Linking.openURL(menu);
  };

  const handleViewOnMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${geoCoordinates}`;
    Linking.openURL(url);
  };

  // Calculate the star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    return Array(totalStars).fill().map((_, index) => {
      if (index < fullStars) {
        return <Icon key={index} name="star" size={20} color={Colors.primary} />;
      }
      if (hasHalfStar && index === fullStars) {
        return <Icon key={index} name="star-half-o" size={20} color={Colors.primary} />;
      }
      return <Icon key={index} name="star-o" size={20} color={Colors.primary} />;
    });
  };

  return (
    <View style={styles.container}>
      {/* {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />} */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.ratingsContainer}>
        {renderStars(ratings)}
        <Text style={styles.ratings}> {ratings} / 5</Text>
      </View>
      <TouchableOpacity onPress={handleViewMenu} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>View Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleViewOnMap} style={styles.mapButton}>
        <Text style={styles.buttonText}>View on Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratings: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  menuButton: {
    backgroundColor: Colors.dark.greenTint,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapButton: {
    backgroundColor: Colors.light.greenTint,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RestaurantDetails;
