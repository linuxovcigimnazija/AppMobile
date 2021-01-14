import React from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from '../constants/Constants';
import {StyleSheet} from 'react-native';

export const getLogo = (brand) => {
  switch (brand) {
    case 'Volkswagen':
      return require('../assets/carLogos/volkswagen.png');
    case 'Renault':
      return require('../assets/carLogos/renault.png');
    case 'Tesla':
      return require('../assets/carLogos/tesla.png');
    case 'Peugeot':
      return require('../assets/carLogos/peugeot.png');
  }
};

export const getFuelIcon = (fuelType, style) => {
  return fuelType === 'benzin' ? (
    <MaterialCommunityIcon
      name="fuel"
      color={Constants.fuelOrange}
      style={[styles.fuelIcon, style]}
    />
  ) : fuelType === 'dizel' ? (
    <MaterialCommunityIcon
      name="gas-station"
      color={Constants.fuelGreen}
      style={[styles.fuelIcon, style]}
    />
  ) : fuelType === 'struja' ? (
    <MaterialCommunityIcon
      name="lightning-bolt"
      color={Constants.fuelYellow}
      style={[styles.fuelIcon, style]}
    />
  ) : (
    <MaterialCommunityIcon
      name="gas-cylinder"
      color={Constants.fuelBlue}
      style={[styles.fuelIcon, style]}
    />
  );
};

const styles = StyleSheet.create({
  fuelIcon: {
    fontSize: 40,
    alignSelf: 'center',
  },
});
