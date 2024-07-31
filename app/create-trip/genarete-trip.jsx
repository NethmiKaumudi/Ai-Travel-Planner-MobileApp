import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { CreateTripContext } from "../../context/CreateTripContext";
import { AI_PROMPT } from "../../constants/Options"; // Import AI_PROMPT
import { chatSession } from "../../config/AiModel";
import { auth, db } from "../../config/FirebaseConfig"; // Import Firebase config
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; // Ensure correct imports
import { getAuth } from "firebase/auth";

export default function GenerateTrip() {
  const router = useRouter();
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateAiTrip = async () => {
      if (!tripData) return; // Guard clause if tripData is not available

      const {
        selectedPlace = { place_name: "N/A" },
        travelDates = { duration: 0 },
        travelers = "N/A",
        budget = "N/A"
      } = tripData;

      const days = travelDates.duration || "0";
      const nights = (travelDates.duration - 1) || "0"; // Assuming nights are days - 1

      // Simplified prompt construction
      const prompt = AI_PROMPT.replace("{location}", selectedPlace.place_name)
        .replace("{totalDays}", days)
        .replace("{totalNights}", nights)
        .replace("{traveler}", travelers)
        .replace("{budget}", budget)
        .replace("{totalDays}", days)
        .replace("{totalNights}", nights);
        

      console.log('Prompt:', prompt); // Debugging: Check the prompt being sent

      try {
        // Start timer
        const startTime = Date.now();

        // Generate AI response
        const result = await chatSession.sendMessage(prompt);
        const aiResponseText = await result.response.text();

        // Log time taken
        console.log('AI Response Time:', Date.now() - startTime, 'ms');

        // Parse AI response (assuming JSON format)
        let parsedResponse;
        try {
          parsedResponse = JSON.parse(aiResponseText);
        } catch (parseError) {
          console.error("Error parsing AI response:", parseError);
          parsedResponse = {}; // Fallback to empty object
        }

        // Get current user email
        const user = getAuth().currentUser;
        if (!user) throw new Error("User not authenticated");
        const email = user.email;

        // Save tripData to Firestore with auto-generated document ID
        const docId = Date.now().toString();
        await setDoc(doc(db, "usersTrips", docId), {
          tripData,
          aiResponse: parsedResponse,
          email, // Include email in the document data
          timestamp: new Date().toISOString(),
        });

        console.log("Trip data saved successfully!");

      } catch (error) {
        console.error("Error during AI trip generation or Firestore operation:", error);
      } finally {
        setLoading(false);
        router.push('/(tabs)/mytrip'); // Navigate after process completes
      }
    };

    generateAiTrip();
  }, [tripData]);

  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/images/travel-5360_256.gif")}
        style={styles.gif}
      />
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#388e3c" />
          <Text style={styles.textPleaseWait}>Please wait...</Text>
        </>
      ) : (
        <Text style={styles.textDreamTrip}>
          We are working to generate your dream trip.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  gif: {
    width: 400,
    height: 400,
  },
  textPleaseWait: {
    marginTop: 10,
    fontSize: 30,
    color: "#388e3c",
    fontWeight: "bold",
  },
  textDreamTrip: {
    marginTop: 10,
    fontSize: 18,
    color: "#666",
    fontWeight: "bold",
  },
});
