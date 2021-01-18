import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../constants/Constants';
import AppText from './AppText';
import Ionicon from 'react-native-vector-icons/Ionicons';

const Header = ({navigation, backButtonVisible = false, fade = false}) => {
  const onBackPressed = () => {
    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.header}>
        {backButtonVisible && (
          <Ionicon.Button
            backgroundColor={Constants.primaryDark}
            color={Constants.white}
            activeOpacity={1}
            name="chevron-back-outline"
            size={25}
            style={styles.backButton}
            onPress={() => onBackPressed()}
          />
        )}
        <AppText size={24} color={Constants.white} bold>
          AppMobil
        </AppText>
      </View>
      <LinearGradient
        colors={[Constants.primaryDark, Constants.primaryDark + '00']}
        style={[
          styles.fade,
          {height: fade ? Constants.windowHeight * 0.005 : 0},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: Constants.windowHeight * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Constants.primaryDark,
    paddingLeft: 30,
    zIndex: 800,
  },
  fade: {
    width: '100%',
    maxHeight: 10,
  },
  backButton: {
    paddingEnd: 5,
  },
});

export default Header;
