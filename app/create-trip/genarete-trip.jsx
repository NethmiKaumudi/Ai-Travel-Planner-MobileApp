import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function GenerateTrip() {
  const router = useRouter();

  useEffect(() => {
    const processTrip = async () => {
      try {
        // Simulate trip generation
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay for generating trip
        router.push('/my-trips'); // Navigate to My Trips screen
      } catch (error) {
        console.error("Error generating trip:", error);
        // Handle error (e.g., show a message to the user)
      }
    };

    processTrip();
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/travel-5360_256.gif')}
        style={styles.gif}
      />
      <Text style={styles.textGenerating}>Generating your trip.</Text>
      <Text style={styles.textPleaseWait}>Please wait...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional: set a background color
  },
  gif: {
    width: 400,  // Adjust the size of the GIF to be larger
    height: 400,
    // Remove the shadow and background color from the GIF
  },
  textGenerating: {
    marginTop: 20,
    fontSize: 26, // Increase font size for better visibility
    color: '#000', // Black color for the "Generating your trip" text
    fontWeight: 'bold', // Optional: make the text bold
  },
  textPleaseWait: {
    marginTop: 10,
    fontSize: 30, // Increase font size for better visibility
    color: '#388e3c', // Green color for the "Please wait..." text
    fontWeight: 'bold', // Optional: make the text bold
  },
});
