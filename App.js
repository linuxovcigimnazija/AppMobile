import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

// SCREENS
import HomeScreen from './src/screens/HomeScreen';
import TravelInfoScreen from './src/screens/TravelInfoScreen';
import MyProfileScreen from './src/screens/MyProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import Header from './src/components/Header'
import AppText from './src/components/AppText'

const App = () => {
  // ovdje samo postavite koji screen radite i to ce se renderovati
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
      <Header/>
      <MyProfileScreen />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // svrha ovog je da se postavi boja notification bara u slucaju notch-a
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
  },
});

export default App;
