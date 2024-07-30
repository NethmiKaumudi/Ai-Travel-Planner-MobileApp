import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors';
import { CreateTripContext } from './../../context/CreateTripContext';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

export default function TravelDates() {
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Determine minimum date for the end date picker based on selected start date
  const minimumStartDate = new Date();
  const minimumEndDate = new Date(startDate);
  minimumEndDate.setDate(minimumEndDate.getDate() + 1);

  const handleSelectDates = () => {
    if (endDate < startDate) {
      Alert.alert('Invalid Dates', 'End date must be after start date.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    setTripData(prevTripData => ({
      ...prevTripData,
      travelDates: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        duration
      }
    }));
    router.push('/create-trip/select-budget');
  };

  const onStartDateChange = (event, selectedDate) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
      // Ensure end date is not earlier than new start date
      if (endDate < selectedDate) {
        setEndDate(selectedDate);
      }
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const calculateDuration = () => {
    if (endDate >= startDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return `${duration} days`;
    }
    return '0 days';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Select your travel dates</Text>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.datePickerButton}>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Start Date:</Text>
            <Text style={styles.dateText}>{startDate.toDateString()}</Text>
          </View>
          <Ionicons name="calendar" size={20} color={Colors.light.greenTint} />
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
            minimumDate={minimumStartDate}
            textColor={Colors.light.greenTint}
          />
        )}
        <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.datePickerButton}>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>End Date:</Text>
            <Text style={styles.dateText}>{endDate.toDateString()}</Text>
          </View>
          <Ionicons name="calendar" size={20} color={Colors.light.greenTint} />
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
            minimumDate={minimumEndDate}
            textColor={Colors.light.greenTint}
          />
        )}
      </View>
      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>Total Duration:</Text>
        <Text style={styles.durationValue}>{calculateDuration()}</Text>
      </View>
      <TouchableOpacity onPress={handleSelectDates} style={styles.button}>
        <Text style={styles.buttonText}>Confirm Dates</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
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
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: Colors.light.greenTint,
    marginBottom: 20,
    textAlign: 'center',
  },
  datePickerContainer: {
    marginBottom: 30,
  },
  datePickerButton: {
    padding: 15,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: Colors.light.greenTint,
    marginBottom: 15,
    backgroundColor: Colors.light.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateBox: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  dateLabel: {
    fontSize: width * 0.04,
    color: Colors.light.greenTint,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: width * 0.05,
    color: Colors.light.greenTint,
  },
  durationContainer: {
    padding: 15,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: Colors.light.greenTint,
    marginBottom: 15,
    backgroundColor: Colors.light.secondary,
    alignItems: 'center',
  },
  durationText: {
    fontSize: width * 0.05,
    color: Colors.light.greenTint,
    fontWeight: 'bold',
  },
  durationValue: {
    fontSize: width * 0.06,
    color: Colors.light.greenTint,
    fontWeight: 'bold',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: Colors.light.greenTint,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.light.background,
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});
