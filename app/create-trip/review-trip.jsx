import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors';
import { CreateTripContext } from './../../context/CreateTripContext';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function ReviewTrip() {
  const router = useRouter();
  const { tripData } = useContext(CreateTripContext);

  const handleBuildTrip = () => {
    router.push('/create-trip/genarete-trip'); // Update with the actual screen path
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Review Your Trip</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Trip Summary</Text>
        </View>
        <View style={styles.boxContainer}>
          <View style={styles.box}>
            <View style={styles.detailsContainer}>
              <DetailItem 
                icon="location-outline" 
                label="Destination" 
                value={tripData.selectedPlace?.place_name || 'N/A'} 
              />
              <DetailItem 
                icon="people-outline" 
                label="Travelers" 
                value={tripData.travelers || 'N/A'} 
              />
              <DetailItem 
                icon="calendar-outline" 
                label="Dates" 
                value={`${tripData.travelDates?.startDate || 'N/A'} to ${tripData.travelDates?.endDate || 'N/A'}`} 
              />
              <DetailItem 
                icon="wallet-outline" 
                label="Budget" 
                value={tripData.budget || 'N/A'} 
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Text style={styles.infoText}>
          Please review your trip details carefully before generating your trip.
        </Text>
        <TouchableOpacity onPress={handleBuildTrip} style={styles.button}>
          <Text style={styles.buttonText}>Build My Trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const DetailItem = ({ icon, label, value }) => (
  <View style={styles.detailItem}>
    <Ionicons name={icon} size={30} color={Colors.primary} style={styles.icon} />
    <View style={styles.detailTextContainer}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue} numberOfLines={0}>
        {value}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  iconButton: {
    marginRight: 20,
  },
  title: {
    fontSize: width * 0.08,
    marginTop: 30,
    marginLeft: -30,

    fontWeight: 'bold',
    color: Colors.primary,
    flex: 1,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  subtitleContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
  },
  boxContainer: {
    flex: 1,
    marginTop: 20, // Added margin-top here
    marginBottom: 30,
  },
  box: {
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  detailTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: width * 0.050,
    color: Colors.light.text,
    flexShrink: 0, // Ensures the label doesn't break
    marginRight: 10,
  },
  detailValue: {
    fontSize: width * 0.046,
    color: Colors.primary,
    fontWeight: 'bold',
    flexShrink: 1,
    textAlign: 'right',
  },
  buttonContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: Colors.light.background,
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: width * 0.045,
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 15,
    marginHorizontal: 10,
  },
});
