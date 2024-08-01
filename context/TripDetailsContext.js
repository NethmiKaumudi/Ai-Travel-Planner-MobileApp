// TripDetailContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from './../config/FirebaseConfig';

const TripDetailContext = createContext();

export const TripDetailProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const user = getAuth().currentUser;
        if (!user) throw new Error("User not authenticated");
        const email = user.email;

        const q = query(
          collection(db, "usersTrips"),
          where("email", "==", email),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);

        const fetchedTrips = [];
        querySnapshot.forEach((doc) => {
          fetchedTrips.push({ id: doc.id, ...doc.data() });
        });

        setTrips(fetchedTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
        if (error.code === "failed-precondition") {
          setError(
            "The query requires an index. You can create it here: [Index Creation Link]"
          );
        } else {
          setError("Error fetching trips. Please try again later.");
        }
      }
    };

    fetchTrips();
  }, []);

  return (
    <TripDetailContext.Provider value={{ trips, error }}>
      {children}
    </TripDetailContext.Provider>
  );
};

export const useTripDetails = () => useContext(TripDetailContext);
