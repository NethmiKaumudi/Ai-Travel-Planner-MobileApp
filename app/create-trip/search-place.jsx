import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import MapboxConfig from './../../config/MapBoxConfig'; // Adjust the path if necessary
import { Colors } from './../../constants/Colors'; // Adjust the path if necessary
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { CreateTripContext } from "./../../context/CreateTripContext"; // Updated import

const { width, height } = Dimensions.get('window');

const SearchPlace = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null); // State to hold a single selected place

  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    const handleSearch = async () => {
      if (!query.trim()) {
        setPlaces([]); // Clear the list if query is empty
        return;
      }

      setLoading(true);
      setError(''); // Clear previous errors
      try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`, {
          params: {
            access_token: MapboxConfig.accessToken, // Use the access token from the config
            limit: 5, // Limit the number of results
            language: 'en', // Language of the results
          },
        });
        setPlaces(response.data.features); // Set places from API response
      } catch (error) {
        console.error('Error searching places:', error.response || error.message);
        setError('Failed to fetch places. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [query]); // Trigger search when query changes

  const handleSelectPlace = (place) => {
    // Set the selected place and update the context
    setSelectedPlace(place);

    setQuery(''); // Clear the search query
    setPlaces([]); // Clear the search results

    // Update the tripData context with the selected place
    setTripData(prevTripData => ({
      ...prevTripData,
      selectedPlace: place // Set the selected place in tripData
    }));

    // Navigate to the SelectTraveler page
    router.push('/create-trip/select-traveler');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.heading}>Search for a Place</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="location-outline" size={100} color={Colors.primary} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter location or place"
          placeholderTextColor={Colors.light.text}
          value={query}
          onChangeText={setQuery}
        />
      </View>
      {loading && <ActivityIndicator size="large" color={Colors.primary} style={styles.loading} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {selectedPlace && (
        <View style={styles.selectedPlace}>
          <Ionicons name="location" size={24} color={Colors.primary} style={styles.selectedPlaceIcon} />
          <View style={styles.selectedPlaceTextContainer}>
            <Text style={styles.selectedPlaceLabel}>Selected Place:</Text>
            <Text style={styles.selectedPlaceText}>{selectedPlace.place_name || selectedPlace.text}</Text>
          </View>
        </View>
      )}
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectPlace(item)} style={styles.item}>
            <Text style={styles.itemText}>{item.place_name || item.text}</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} style={styles.chevronIcon} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No results found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50, // Space for header
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    marginRight: 20, // Space between the icon and the title
  },
  heading: {
    fontSize: width * 0.05, // Adjust font size to fit header space
    fontWeight: 'bold',
    color: Colors.primary,
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20, // Space between icon and search field
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.light.background,
  },
  input: {
    fontSize: width * 0.04,
    color: Colors.light.text,
    padding: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: width * 0.04,
    color: Colors.light.text,
    flex: 1,
  },
  chevronIcon: {
    marginLeft: 10,
  },
  error: {
    color: Colors.dark.text,
    marginVertical: 10,
    fontSize: width * 0.04,
  },
  empty: {
    color: Colors.dark.text,
    fontSize: width * 0.04,
  },
  loading: {
    marginVertical: 20,
  },
  selectedPlace: {
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    backgroundColor: Colors.light.background,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: width - 40, // Set a maximum width for the selected place container
  },
  selectedPlaceIcon: {
    marginRight: 10,
  },
  selectedPlaceLabel: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  selectedPlaceTextContainer: {
    flexShrink: 1, // Allow the text container to shrink
    flexDirection: 'column', // Arrange label and text vertically
    flex: 1, // Allow it to take remaining space
  },
  selectedPlaceText: {
    fontSize: width * 0.04,
    color: Colors.light.text,
    flexShrink: 1, // Allow text to shrink but still show fully
  },
});

export default SearchPlace;
