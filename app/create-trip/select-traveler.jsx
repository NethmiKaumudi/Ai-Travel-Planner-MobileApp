import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import { Colors } from './../../constants/Colors'; // Ensure the path is correct
import { CreateTripContext } from './../../context/CreateTripContext'; // Ensure the path is correct
import { useRouter } from 'expo-router'; // Import useRouter

const { width } = Dimensions.get('window');

export default function SelectTraveler() {
  const router = useRouter(); // Initialize router
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setTripData(prevTripData => ({
      ...prevTripData,
      travelers: option // Update tripData context with selected option
    }));
    // Navigate to the next screen
    router.push('/create-trip/select-travel-dates'); // Update with the actual screen path
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Who's Going?</Text>
      </View>
      <Text style={styles.subtitle}>Choose Your Travelers</Text>
      <ScrollView contentContainerStyle={styles.optionsContainer}>
        <OptionButton
          label="Just Me"
          icon="person-outline"
          isSelected={selectedOption === 'Just Me'}
          onPress={() => handleSelectOption('Just Me')}
        />
        <OptionButton
          label="A Couple"
          icon="heart-outline"
          isSelected={selectedOption === 'A Couple'}
          onPress={() => handleSelectOption('A Couple')}
        />
        <OptionButton
          label="Family (2 to 5 People)"
          icon="people-outline"
          isSelected={selectedOption === 'Family (2 to 5 People)'}
          onPress={() => handleSelectOption('Family (2 to 5 People)')}
        />
        <OptionButton
          label="Friends"
          icon="beer-outline"
          isSelected={selectedOption === 'Friends'}
          onPress={() => handleSelectOption('Friends')}
        />
      </ScrollView>
    </View>
  );
}

const OptionButton = ({ label, icon, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
    onPress={onPress}
  >
    <Ionicons name={icon} size={24} color={isSelected ? Colors.light.background : Colors.primary} style={styles.icon} />
    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30, // Space for top area
  },
  iconButton: {
    marginRight: 20,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: Colors.primary,
    flex: 1,
  },
  subtitle: {
    fontSize: width * 0.05,
    color: Colors.light.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    width: '90%',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.light.background,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row', // Align icon and text horizontally
  },
  optionButtonSelected: {
    backgroundColor: Colors.primary, // Change background color when selected
  },
  optionText: {
    fontSize: width * 0.04,
    color: Colors.primary,
    marginLeft: 10, // Space between icon and text
  },
  optionTextSelected: {
    color: Colors.light.background,
  },
  icon: {
    color: Colors.primary,
  },
});
