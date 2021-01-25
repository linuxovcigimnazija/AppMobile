import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AppText from '../components/AppText';
import Tab from '../components/Tab';
import {themes} from '../constants/colors';
import Constants from '../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';

const AnalyticsScreen = ({navigation, route}) => {
  const [tab, setTab] = useState('month');

  return (
    <View style={styles.wholescreen}>
      <Header
        navigation={navigation}
        route={route}
        backButtonVisible
        analyticsWatermark
      />
      <AppText style={styles.titleText}>Analitika</AppText>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.singleTab}
          onPress={() => {
            setTab('month');
          }}>
          <LinearGradient
            colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
            style={styles.smallboxGradient}>
            <AppText style={styles.tabText}>30 dana</AppText>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.singleTab}
          onPress={() => {
            setTab('year');
          }}>
          <LinearGradient
            colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
            style={styles.smallboxGradient}>
            <AppText style={styles.tabText}>godinu dana</AppText>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.singleTab}
          onPress={() => {
            setTab('all');
          }}>
          <LinearGradient
            colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
            style={styles.smallboxGradient}>
            <AppText style={styles.tabText}>svi podaci</AppText>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Tab style={styles.tabStyle} page={tab}></Tab>
    </View>
  );
};

const styles = StyleSheet.create({
  wholescreen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  titleText: {
    fontSize: 48,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 10,
    marginBottom: -5,
  },
  tabContainer: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  singleTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.primaryDark,
    height: '50%',
    borderRadius: 10,
    margin: 3,
  },
  tabText: {
    color: 'white',
  },
  tabStyle: {
    width: '100%',
    height: '82%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  smallboxGradient: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnalyticsScreen;
