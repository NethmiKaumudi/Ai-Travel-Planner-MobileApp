import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DailyPlan = ({ bestTime, day, plan }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.bestTime}>{bestTime}</Text>
      {plan.map((activity, index) => (
        <View key={index} style={styles.activityContainer}>
          <View style={styles.activityBox}>
            <Text style={styles.activity}>{activity.activity}</Text>
            <Text style={styles.time}>{activity.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  bestTime: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  activityContainer: {
    marginBottom: 10,
  },
  activityBox: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  activity: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
});

export default DailyPlan;
