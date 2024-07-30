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

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(144, 238, 144, 0.9)', // Light green with slight opacity
    justifyContent: 'space-between', // Ensure footer is at the bottom
  },
  image: {
    width: '100%',
    height: height * 0.55, // Adjust height to 55% of the screen height
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
    padding: width * 0.05, // 5% of screen width
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  textContainer: {
    alignItems: 'center',
    width: '90%', // Make text container responsive
    maxWidth: 350,
    backgroundColor: Colors.dark.greenTint,
    borderRadius: 20,
    padding: width * 0.05, // 5% of screen width
    elevation: 5,
  },
  title: {
    fontSize: width * 0.08, // 8% of screen width
    fontFamily: 'outfit-bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: height * 0.02, // 2% of screen height
  },
  description: {
    fontSize: width * 0.04, // 5% of screen width
    color: Colors.white,
    textAlign: 'center',
    marginBottom: height * 0.03, // 3% of screen height
    paddingHorizontal: width * 0.05, // 5% of screen width
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: height * 0.02, // 2% of screen height
    paddingHorizontal: width * 0.1, // 10% of screen width
    borderRadius: 25,
    marginBottom: height * 0.02, // 2% of screen height
    width: '100%', // Make button fit the width of its container
    alignItems: 'center',
  },
  buttonText: {
    fontSize: width * 0.04, // 4% of screen width
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'outfit-bold',
  },
});
