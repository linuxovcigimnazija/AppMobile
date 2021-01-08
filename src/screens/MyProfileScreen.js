import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AppText from '../components/AppText'
import Constants from '../constants/Constants';

const MyProfileScreen = () => {
  return (
    <View style={styles.wholescreen}>
      <View style={styles.upperContainer}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wholescreen:{
    width: '100%',
    height: '92%'
  },
  upperContainer: {
    width: '100%',
    height: '32%',
    backgroundColor: Constants.primaryDark,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  }
});

export default MyProfileScreen;
