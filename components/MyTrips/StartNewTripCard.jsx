import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; 
import { Colors } from './../../constants/Colors'; 
import { useRouter } from 'expo-router'; // Import useRouter

const { width } = Dimensions.get('window');

export default function StartNewTripCard({ onClose }) {
  const router = useRouter(); // Initialize router

  const handlePress = () => {
    router.push('/create-trip/search-place');
    onClose(); // Hide card on navigation
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
        <MaterialIcons name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <MaterialIcons name="flight-takeoff" size={width * 0.2} color={Colors.light.primary} />
      <Text style={styles.heading}>No trips Planned Yet</Text>
      <Text style={styles.subtext}>Looks like it's time to plan a new travel experience! Get started below.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress} // Handle press with navigation and close
      >
        <LinearGradient
          colors={[Colors.light.greenTint, Colors.dark.greenTint]}
          style={styles.gradient}
          start={[0, 0]}
          end={[1, 1]}
        >
          <Text style={styles.buttonText}>Start a New Trip</Text>
          <MaterialIcons name="arrow-forward" size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: width * 0.9,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: Colors.dark.greenTint,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    position: 'relative', // Ensure relative positioning for close icon
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10, // Adjust position as needed
    backgroundColor: Colors.light.greenTint,
    borderRadius: 20, // Adjust to make it round
    padding: 5, // Adjust to control the size of the circle
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  heading: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    textAlign: "center",
  },
  subtext: {
    fontSize: width * 0.05,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
  },
});
