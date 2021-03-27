import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import AppText from '../components/AppText';
import Tab from '../components/Tab';
import {themes} from '../constants/colors';
import Constants from '../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';

const AnalyticsScreen = ({navigation, route}) => {
  const [tab, setTab] = useState('month');

  var currency = route.params.GDATA.country.valute;

  return (
    <View style={styles.wholescreen}>
      <Header
        navigation={navigation}
        route={route}
        backButtonVisible
        analyticsWatermark
      />
      <AppText style={styles.titleText}>Vaša Statistika</AppText>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.singleTab,
            tab === 'month'
              ? {backgroundColor: Constants.primaryDark}
              : {backgroundColor: Constants.boxcolorLight},
          ]}
          onPress={() => {
            setTab('month');
          }}>
          <View
            // colors={[Constants.boxcolorLight, Constants.boxcolorDark]}

            style={[styles.smallBoxGradient]}>
            <AppText style={styles.tabText}>30 dana</AppText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.singleTab,
            tab === 'year'
              ? {backgroundColor: Constants.primaryDark}
              : {backgroundColor: Constants.boxcolorLight},
          ]}
          onPress={() => {
            setTab('year');
          }}>
          <View
            // colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
            style={[styles.smallBoxGradient]}>
            <AppText style={styles.tabText}>Godinu dana</AppText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.singleTab,
            tab === 'all'
              ? {backgroundColor: Constants.primaryDark}
              : {backgroundColor: Constants.boxcolorLight},
          ]}
          onPress={() => {
            setTab('all');
          }}>
          <View
            // colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
            style={[styles.smallBoxGradient]}>
            <AppText style={styles.tabText}>Svi podaci</AppText>
          </View>
        </TouchableOpacity>
      </View>

      <Tab
        currency={currency}
        data={route.params.GDATA.data[route.params.carId]}
        style={styles.tabStyle}
        page={tab}></Tab>
    </View>
  );
};

const styles = StyleSheet.create({
  wholescreen: {
    width: '100%',
    height: '100%',
    backgroundColor: Constants.background,
  },
  titleText: {
    fontSize: 36,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 10,
    marginBottom: -5,
    fontWeight: 'bold',
    color: Constants.primaryDark,
  },
  tabContainer: {
    marginTop: 10,
    width: Constants.width - 40,
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  singleTab: {
    width: '32%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    borderRadius: 10,
  },
  tabText: {
    color: 'white',
    fontSize: 16,
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
