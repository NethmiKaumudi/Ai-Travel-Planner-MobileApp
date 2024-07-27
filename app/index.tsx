import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StartPage from './../components/StartPage';
import { auth } from './../config/FirebaseConfig';
import { useRouter } from 'expo-router';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/mytrip');
    }
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      {!isLoggedIn && <StartPage />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
