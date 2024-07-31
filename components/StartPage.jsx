import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors'; // Ensure this path is correct
import { useRouter } from 'expo-router';

export default function StartPage() {
  const router = useRouter();

  const handlePress = () => {
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
            activeOpacity={0.8}
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
    backgroundColor:Colors.light.greenTint, // Lighter background for a modern look
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height * 0.55, // Increased height for more visual impact
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
  },
  overlay: {
    position: 'absolute',

    bottom: 30,
    left: 5,
    right: 5,
    backgroundColor: Colors.light.greenTint, // Semi-transparent white for better contrast
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    padding: width * 0.05,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  textContainer: {
    alignItems: 'center',
    width: '90%',
    maxWidth: 350,
    backgroundColor: Colors.dark.greenTint, // Darker green for text background
    borderRadius: 25,
    padding: width * 0.05,
    elevation: 10, // Increased elevation for a more pronounced shadow
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontSize: width * 0.08,
    fontFamily: 'outfit-bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  description: {
    fontSize: width * 0.045,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: height * 0.03,
    paddingHorizontal: width * 0.05,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 30,
    marginBottom: height * 0.02,
    width: '100%',
    alignItems: 'center',
    elevation: 3, // Slight shadow for depth
  },
  buttonText: {
    fontSize: width * 0.05, // Slightly larger for better visibility
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'outfit-bold',
  },
});
