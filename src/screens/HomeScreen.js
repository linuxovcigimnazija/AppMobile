import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AppText from '../components/AppText';
import Constants from '../constants/Constants';

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <AppText size={18} bold color={Constants.primary} style={styles.testText}>
        Home Screen
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  testText: {
    marginLeft: 40,
  },
});

export default HomeScreen;
