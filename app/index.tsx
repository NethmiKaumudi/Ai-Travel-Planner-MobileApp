import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import StartPage from './../components/StartPage';

export default function Index() {
  return (
    <View style={styles.container}>
      <StartPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
