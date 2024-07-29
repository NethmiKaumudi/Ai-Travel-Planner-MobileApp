import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "./../../constants/Colors"; // Ensure this path is correct
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";

export default function MyTripScreen() {
  const [showStartNewTripCard, setShowStartNewTripCard] = useState(false);

  const handleAddButtonPress = () => {
    setShowStartNewTripCard(true);
  };

  const handleCloseCard = () => {
    setShowStartNewTripCard(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
          <MaterialIcons name="add" size={28} color={Colors.light.background} />
        </TouchableOpacity>
      </View>
      {showStartNewTripCard && <StartNewTripCard onClose={handleCloseCard} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 40, 
  },
  title: {
    fontSize: 28,
    fontFamily: "outfit-bold", 
    color: Colors.light.text,
    letterSpacing: 1.2,
  },
  addButton: {
    backgroundColor: Colors.light.greenTint,
    borderRadius: 24,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.light.greenTint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});
