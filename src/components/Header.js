import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Constants from '../constants/Constants';
import AppText from '../components/AppText'

const Header = () => {
  return (
    <View style={styles.header}>
      <AppText style={styles.text}>AppMobile</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Constants.primaryDark,
  },
  text: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center'
  }
});

export default Header;
