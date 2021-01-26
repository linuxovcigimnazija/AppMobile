import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../constants/Constants';
import AppText from './AppText';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {MaterialCommunityIcon} from '../utils/Functions';

const Header = ({
  navigation,
  route,
  backButtonVisible = false,
  fade = false,
  analyticsWatermark = false,
}) => {
  const onBackPressed = () => {
    navigation.goBack();
  };

  const headerText =
    route.name === 'Auto' || route.name === 'Input'
      ? 'Vaše Vozilo'
      : route.name === 'Analytics'
      ? 'Analitika'
      : 'AppMobile';

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
          {headerText}
        </AppText>

        {analyticsWatermark && (
          <MaterialCommunityIcon
            name="google-analytics"
            size={24}
            color={Constants.white}
            style={{position: 'absolute', right: 30}}
          />
        )}
      </View>
      {/* <LinearGradient
        colors={[Constants.primaryDark, Constants.primaryDark + '00']}
        style={[
          styles.fade,
          {height: fade ? Constants.windowHeight * 0.005 : 0},
        ]}
      /> */}
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
    // elevation: 3,
    // shadowColor: Constants.gray,
    // shadowRadius: 2,
    // shadowOpacity: 0.5,
    // shadowOffset: {
    //   width: 4,
    //   height: 4,
    // },
    // overflow: 'hidden',
  },
  fade: {
    width: '100%',
    maxHeight: 10,
  },
  backButton: {
    paddingEnd: 5,
  },
  text: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
});

export default Header;
