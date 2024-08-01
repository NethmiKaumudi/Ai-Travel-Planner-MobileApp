import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { db, collection, query, orderBy, limit, getDocs } from './../../config/FirebaseConfig';
import { getAuth } from 'firebase/auth';

const TripDetails = () => {
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestTripData = async () => {
      try {
        const tripsRef = collection(db, 'usersTrips');
        const q = query(tripsRef, orderBy('date', 'desc'), limit(1)); // Fetch latest trip
        const querySnapshot = await getDocs(q);
        const latestTrip = querySnapshot.docs[0]?.data();
        setTripData(latestTrip || {});
      } catch (error) {
        console.error("Error fetching trip data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTripData();
  }, []);

  // User Authentication Check
  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) throw new Error("User not authenticated");
    const email = user.email;
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!tripData) {
    return <Text>No trip data available</Text>;
  }

  const {
    aiResponse: {
      flightDetails,
      imageUrl: destinationImage,
      destination,
      restaurants = [],
      placesToVisit = [],
      dailyPlan = [],
      hotels = [],
      duration,
      budget,
    },
    tripData: {
      selectedPlace = {},
      travelDates = {},
      travelers = '',
    }
  } = tripData;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Trip to {destination}</Text>
      <Image 
        source={{ uri: destinationImage }} 
        style={styles.image} 
      />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flight Details</Text>
        <Text><Text style={styles.bold}>Departure City:</Text> {flightDetails?.departureCity || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Arrival City:</Text> {flightDetails?.arrivalCity || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Flight:</Text> {flightDetails?.flight || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Departure Date:</Text> {flightDetails?.departureDate || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Flight Number:</Text> {flightDetails?.flightNumber || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Departure Time:</Text> {flightDetails?.departureTime || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Arrival Date:</Text> {flightDetails?.arrivalDate || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Arrival Time:</Text> {flightDetails?.arrivalTime || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Price:</Text> {flightDetails?.price || 'N/A'}</Text>
        {flightDetails?.bookingUrl && 
          <Text style={styles.link} onPress={() => Linking.openURL(flightDetails.bookingUrl)}>Book Flight</Text>
        }
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hotels</Text>
        {hotels.length > 0 ? hotels.map((hotel, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.bold}>{hotel.name}</Text>
            <Image 
              source={{ uri: hotel.imageUrl }} 
              style={styles.image} 
            />
            <Text><Text style={styles.bold}>Price:</Text> {hotel.price}</Text>
            <Text><Text style={styles.bold}>Description:</Text> {hotel.description}</Text>
            <Text><Text style={styles.bold}>Address:</Text> {hotel.address}</Text>
            <Text><Text style={styles.bold}>Rating:</Text> {hotel.rating}</Text>
            <Text><Text style={styles.bold}>Check-in Date:</Text> {hotel.checkInDate || 'N/A'}</Text>
            <Text><Text style={styles.bold}>Check-out Date:</Text> {hotel.checkOutDate || 'N/A'}</Text>
            {hotel.bookingUrl && 
              <Text style={styles.link} onPress={() => Linking.openURL(hotel.bookingUrl)}>Book Hotel</Text>
            }
          </View>
        )) : <Text>No hotels available</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Restaurants</Text>
        {restaurants.length > 0 ? restaurants.map((restaurant, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.bold}>{restaurant.name}</Text>
            <Image 
              source={{ uri: restaurant.imageUrl }} 
              style={styles.image} 
            />
            <Text><Text style={styles.bold}>Description:</Text> {restaurant.description}</Text>
            <Text><Text style={styles.bold}>Ratings:</Text> {restaurant.ratings}</Text>
            <Text><Text style={styles.bold}>Menu:</Text></Text>
            <Text><Text style={styles.bold}>Main Courses:</Text> {restaurant.menu["main courses"]?.join(', ') || 'N/A'}</Text>
            <Text><Text style={styles.bold}>Desserts:</Text> {restaurant.menu.desserts?.join(', ') || 'N/A'}</Text>
            <Text><Text style={styles.bold}>Appetizers:</Text> {restaurant.menu.appetizers?.join(', ') || 'N/A'}</Text>
            <Text><Text style={styles.bold}>Opening Hours:</Text> {restaurant.openingHours || 'N/A'}</Text>
            <Text><Text style={styles.bold}>Address:</Text> {restaurant.address || 'N/A'}</Text>
            {restaurant.bookingUrl && 
              <Text style={styles.link} onPress={() => Linking.openURL(restaurant.bookingUrl)}>Book Restaurant</Text>
            }
          </View>
        )) : <Text>No restaurants available</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Places to Visit</Text>
        {placesToVisit.length > 0 ? placesToVisit.map((place, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.bold}>{place.name}</Text>
            <Image 
              source={{ uri: place.imageUrl }} 
              style={styles.image} 
            />
            <Text><Text style={styles.bold}>Details:</Text> {place.details}</Text>
            <Text><Text style={styles.bold}>Ticket Pricing:</Text> {place.ticketPricing}</Text>
            <Text><Text style={styles.bold}>Time to Travel:</Text> {place.timeToTravel}</Text>
            <Text><Text style={styles.bold}>Opening Hours:</Text> {place.openingHours || 'N/A'}</Text>
            <Text><Text style={styles.bold}>Address:</Text> {place.address || 'N/A'}</Text>
            {place.bookingUrl && 
              <Text style={styles.link} onPress={() => Linking.openURL(place.bookingUrl)}>Book Place</Text>
            }
          </View>
        )) : <Text>No places to visit available</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Plan</Text>
        {dailyPlan.length > 0 ? dailyPlan.map((plan, index) => (
          <View key={index} style={styles.item}>
            <Text><Text style={styles.bold}>Day:</Text> {plan.day}</Text>
            <Text><Text style={styles.bold}>Activity:</Text> {plan.activity}</Text>
            <Text><Text style={styles.bold}>Best Time:</Text> {plan.bestTime}</Text>
            <Text><Text style={styles.bold}>Details:</Text> {plan.details || 'N/A'}</Text>
          </View>
        )) : <Text>No daily plan available</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trip Data</Text>
        <Text><Text style={styles.bold}>Selected Place:</Text> {selectedPlace.place_name || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Language:</Text> {selectedPlace.language_en || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Coordinates:</Text> {selectedPlace.geometry?.coordinates?.join(', ') || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Bounding Box:</Text> {selectedPlace.bbox?.join(', ') || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Travel Details</Text>
        <Text><Text style={styles.bold}>Start Date:</Text> {travelDates?.startDate || 'N/A'}</Text>
        <Text><Text style={styles.bold}>End Date:</Text> {travelDates?.endDate || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Number of Travelers:</Text> {travelers || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Duration:</Text> {duration || 'N/A'}</Text>
        <Text><Text style={styles.bold}>Estimated Budget:</Text> {budget || 'N/A'}</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  item: {
    marginBottom: 15,
  },
});

export default TripDetails;
