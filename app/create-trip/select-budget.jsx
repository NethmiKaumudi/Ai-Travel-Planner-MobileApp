// src/screens/Budget.js

import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors'; // Ensure the path is correct
import { CreateTripContext } from './../../context/CreateTripContext'; // Ensure the path is correct
import { useRouter } from 'expo-router'; // Import useRouter
import { BUDGET_OPTIONS } from './../../constants/Options'; // Import budget options

const { width } = Dimensions.get('window');

export default function Budget() {
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [selectedBudget, setSelectedBudget] = useState('');

  const handleSelectBudget = (budget) => {
    setSelectedBudget(budget);
    setTripData(prevTripData => ({
      ...prevTripData,
      budget: budget // Update tripData context with selected budget
    }));
    // Navigate to the next screen
    router.push('/create-trip/review-trip'); // Update with the actual screen path
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Budget</Text>
      </View>
      <Text style={styles.subtitle}>Choose Spending Habits for your trip</Text>
      <View style={styles.optionsContainer}>
        {BUDGET_OPTIONS.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            icon={option.icon}
            isSelected={selectedBudget === option.value}
            onPress={() => handleSelectBudget(option.value)}
          />
        ))}
      </View>
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
    width: '100%',
    marginBottom: 20,
    marginTop: 30,
  },
  iconButton: {
    marginRight: 20,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: Colors.primary,
    flex: 1,
    textAlign: 'center',
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
    flexDirection: 'row',
  },
  optionButtonSelected: {
    backgroundColor: Colors.primary,
  },
  optionText: {
    fontSize: width * 0.04,
    color: Colors.primary,
    marginLeft: 10,
  },
  optionTextSelected: {
    color: Colors.light.background,
  },
  icon: {
    color: Colors.primary,
  },
});
