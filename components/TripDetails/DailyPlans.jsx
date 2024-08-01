import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from './../../constants/Colors'; // Adjust the path as needed

const DailyPlan = ({ dailyPlan }) => (
  <View style={styles.container}>
    {dailyPlan?.map((day, index) => (
      <View key={index} style={styles.dayBox}>
        <Text style={styles.dayTitle}>Day {index + 1}</Text>
        <Text style={styles.activityText}>Activity: {day.activity}</Text>
        <Text style={styles.timeText}>Time: {day.time}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.light.background,
  },
  dayBox: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 5,
  },
  activityText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  timeText: {
    fontSize: 16,
    color: Colors.dark.greenTint,
  },
});

export default DailyPlan;
