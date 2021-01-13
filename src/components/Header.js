import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../constants/Constants';
import AppText from './AppText';

const Header = () => {
  return (
    <View>
      <View style={styles.header}>
        <AppText size={24} color={Constants.white} bold>
          AppMobil
        </AppText>
      </View>
      <LinearGradient
        colors={[Constants.primaryDark, Constants.primaryDark + '00']}
        style={styles.fade}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: Constants.windowHeight * 0.08,
    maxHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Constants.primaryDark,
    paddingLeft: 30,
    zIndex: 800,
  },
  fade: {
    width: '100%',
    height: Constants.windowHeight * 0.005,
    maxHeight: 10,
  },
});

export default Header;
