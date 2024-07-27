import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function StartPage() {
  const router = useRouter();

  const handlePress = () => {
    // Navigate to the sign-in page
    router.push('/auth/sign-in');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/images/travelappImg.png')}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>TripMate</Text>
          <Text style={styles.description}>
            Discover the best travel experiences and explore new destinations with TripMate. 
            Your journey starts here!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.8} // Change opacity when pressed
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(144, 238, 144, 0.9)', // Light green with slight opacity
    justifyContent: 'space-between', // Ensure footer is at the bottom
  },
  image: {
    width: '100%',
    height: 520, // Adjust height as needed
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: '55%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(144, 238, 144, 0.9)', // Light green with slight opacity
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    backgroundColor: Colors.dark.greenTint,
    borderRadius: 20,
    padding: 40,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 34,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 15,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'outfit-bold',
  },
});
