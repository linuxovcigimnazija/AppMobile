import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Constants from './src/constants/Constants';

// SCREENS
import HomeScreen from './src/screens/HomeScreen';
import TravelInfoScreen from './src/screens/TravelInfoScreen';
import MyProfileScreen from './src/screens/MyProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AutoScreen from './src/screens/AutoScreen';
import InputScreen from './src/screens/InputScreen';

const App = () => {
  // ovdje samo postavite koji screen radite i to ce se renderovati
  return (
    <View style={styles.container}>
      <View style={styles.notch} />
      <SafeAreaView style={styles.safeArea}>
        <InputScreen />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // background color sets the color of screen
    // out of safeareaview on the bottom half
    backgroundColor: Constants.black,
  },
  notch: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    // background color sets the color of screen
    // out of safeareaview on the upper half
    backgroundColor: Constants.primaryDark,
  },

  safeArea: {
    flex: 1,
  },
});

export default App;
