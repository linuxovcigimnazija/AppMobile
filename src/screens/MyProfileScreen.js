import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import AppText from '../components/AppText';
import Constants from '../constants/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';

const MyProfileScreen = ({route}) => {
  return (
    <View style={styles.wholescreen}>
      <Header route={route} />
      <View style={styles.body}>
        <View style={styles.upperContainer}>
          <Icon
            name="account-circle-outline"
            size={150}
            color={Constants.primaryDark}
          />
          <View style={styles.upperrightContainer}>
            <AppText>knjf</AppText>
            <AppText>mklvxm</AppText>
            <AppText>kvlx</AppText>
            <AppText>mklgx</AppText>
            <View style={styles.buttonContainer}>
              <Button title="button1" />
              <Button title="button2" />
            </View>
          </View>
        </View>
        <View style={styles.twoboxContainer}>
          <View style={styles.smallBox}></View>
          <View style={styles.smallBox}></View>
        </View>
        <View style={styles.bigBox} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wholescreen: {
    flex: 1,
    backgroundColor: Constants.primaryDark,
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  upperContainer: {
    width: '100%',
    height: '32%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  upperrightContainer: {
    width: '50%',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  bigBox: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    height: 190,
    width: '90%',
  },
  smallBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 130,
    width: '47%',
  },
  twoboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 0,
    width: '90%',
  },
});

export default MyProfileScreen;
