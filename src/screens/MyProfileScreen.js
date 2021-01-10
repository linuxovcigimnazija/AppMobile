import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import AppText from '../components/AppText'
import Constants from '../constants/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyProfileScreen = () => {
  
  return (
    <View style={styles.wholescreen}>
      <View style={styles.upperContainer}>

      <Icon name="account-circle-outline" size={150} color= {Constants.primaryDark} />
      <View style={styles.upperrightContainer}>
        <Text>knjf</Text>
        <Text>mklvxm</Text>
        <Text>kvlx</Text>
        <Text>mklgx</Text>
        <View style={styles.buttonContainer}>
          <Button title="button1"/>
          <Button title="button2"/>
        </View>
      </View>
      </View>
      <View style={styles.twoboxContainer}>
        <View style={styles.smallBox}></View>
        <View style={styles.smallBox}></View>
      </View>
      <View style={styles.bigBox}/>
    </View>
  );
};

const styles = StyleSheet.create({
  wholescreen:{
    width: '100%',
    height: '92%',
    backgroundColor: Constants.primaryDark,
    alignItems: 'center'
  },
  upperContainer: {
    width: '100%',
    height: '32%',
    flexDirection: 'row',
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  upperrightContainer: {
    width: '50%',
    justifyContent: 'space-evenly'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  bigBox: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    height: 190,
    width: '90%'
  },
  smallBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 130,
    width: '47%'
  },
  twoboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 0,
    width: '90%'
  }
  }
);

export default MyProfileScreen;
