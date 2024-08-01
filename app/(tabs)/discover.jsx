import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

// Hardcoded list of must-visit places
const attractions = [
  {
    id: '1',
    name: 'Eiffel Tower',
    location: 'Paris, France',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Eiffel_Tower_Night.jpg',
  },
  {
    id: '2',
    name: 'Great Wall of China',
    location: 'China',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Great_Wall_of_China_July_2006.JPG',
  },
  {
    id: '3',
    name: 'Statue of Liberty',
    location: 'New York, USA',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Statue_of_Liberty_7.jpg',
  },
  {
    id: '4',
    name: 'Machu Picchu',
    location: 'Peru',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Machu_Picchu_%28Noon%29.jpg/1024px-Machu_Picchu_%28Noon%29.jpg',
  },
  {
    id: '5',
    name: 'Sydney Opera House',
    location: 'Sydney, Australia',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Sydney_Opera_House_Sails.jpg',
  },
  {
    id: '6',
    name: 'Colosseum',
    location: 'Rome, Italy',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg',
  },
  {
    id: '7',
    name: 'Taj Mahal',
    location: 'Agra, India',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Taj_Mahal%2C_Agra%2C_India.jpg',
  },
  {
    id: '8',
    name: 'Christ the Redeemer',
    location: 'Rio de Janeiro, Brazil',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Christ_the_Redeemer%2C_Rio_de_Janeiro%2C_Brazil.jpg',
  },
  {
    id: '9',
    name: 'Santorini',
    location: 'Greece',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Santorini_view%2C_Greece.jpg',
  },
  {
    id: '10',
    name: 'Angkor Wat',
    location: 'Siem Reap, Cambodia',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Angkor_Wat%2C_Cambodia.jpg',
  },
];

export default function Discover() {
  const [data, setData] = useState(attractions);
  const [loading, setLoading] = useState(false); // No need to fetch data for this example
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate data fetching
    setLoading(false);
  }, []);

  const handleItemPress = (item) => {
    console.log('Item pressed:', item);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
      {/* <Image source={{ uri: item.imageUrl }} style={styles.itemImage} /> */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemSubtitle}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top 10 Must-Visit Places in Your Lifetime</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#E8F5E9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {

    fontSize: 18,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});
