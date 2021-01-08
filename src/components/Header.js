import React from 'react';
import {View, StyleSheet} from 'react-native';
import Constants from '../constants/Constants';
import AppText from './AppText';

const Header = () => {
  return (
    <View style={styles.header}>
      <AppText size={24} color={Constants.white} bold>
        AppMobil
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '8%',
    maxHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Constants.red,
    paddingLeft: 30,
    zIndex: 800,
  },
});

export default Header;
