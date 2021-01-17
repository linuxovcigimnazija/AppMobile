import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

// SCREENS
import HomeScreen from './src/screens/HomeScreen';
import TravelInfoScreen from './src/screens/TravelInfoScreen';
import MyProfileScreen from './src/screens/MyProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const App = () => {
  // ovdje samo postavite koji screen radite i to ce se renderovati
  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <HomeScreen />
      </SafeAreaView>
    </View>
=======
    /*<View style={styles.container}>*/
    /*<SafeAreaView style={styles.safeArea}>*/
    <TravelInfoScreen />
    /*</SafeAreaView>*/
    /* </View>*/
>>>>>>> 3481875b123b13774ae959eda8d469f65165dc1b
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // svrha ovog je da se postavi boja notification bara u slucaju notch-a
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
  },
});

export default App;
