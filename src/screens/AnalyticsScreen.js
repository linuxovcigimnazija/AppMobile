import React from 'react';
import {View} from 'react-native';
import AppText from '../components/AppText';
import Header from '../components/Header';

const AnalyticsScreen = ({navigation, route}) => {
  return (
    <View>
      <Header
        navigation={navigation}
        route={route}
        backButtonVisible
        analyticsWatermark
      />
      <AppText>test</AppText>
    </View>
  );
};

export default AnalyticsScreen;
