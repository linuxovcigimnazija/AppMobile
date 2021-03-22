import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AppText from './AppText';
import {themes} from '../constants/colors';
import Pie from 'react-native-pie';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../constants/Constants';
import TabMonth from './TabMonth';
import TabYear from './TabYear';
import TabAll from './TabAll';

const Tab = (props) => {
  if (props.page == 'month') {
    return (
      <TabMonth
        currency={props.currency}
        data={props.data}
        style={styles.wholeTab}
      />
    );
  }

  if (props.page == 'year') {
    return (
      <TabYear
        currency={props.currency}
        data={props.data}
        style={styles.wholeTab}
      />
    );
  }

  if (props.page == 'all') {
    return (
      <TabAll
        currency={props.currency}
        data={props.data}
        style={styles.wholeTab}
      />
    );
  }
};

export default Tab;

const styles = StyleSheet.create({
  wholeTab: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  upperContainer: {},
  smallBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    width: '45%',
    margin: 8,
    marginVertical: 5,
  },
  twoboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pieContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    marginVertical: 10,
    padding: 10,
  },
  categoriesContainer: {
    minHeight: 300,
    padding: 10,
  },
  categoryBox: {
    backgroundColor: 'white',
    height: 150,
    margin: 5,
  },
});
