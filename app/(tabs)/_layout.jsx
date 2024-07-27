import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors'; // Ensure this path is correct

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.white, // Background color for the tab bar
        },
        tabBarLabelStyle: {
          color: Colors.dark.greenTint, // Text color for the labels
          fontFamily: 'outfit-bold', // Apply bold font style
        },
        tabBarActiveTintColor: Colors.dark.greenTint, // Color for active tab icon and label
        tabBarInactiveTintColor: Colors.light.tabIconDefault, // Color for inactive tab icons and labels
      }}
    >
      <Tabs.Screen
        name="mytrip"
        options={{
          tabBarLabel: 'My Trip',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="location-on" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="explore" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
