import React from 'react';
import Constants from '../constants/Constants';
import {StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';

export {
  MaterialCommunityIcon,
  MaterialIcon,
  FontAwesome5Icon,
  FontAwesomeIcon,
  EntypoIcon,
  FeatherIcon,
};

export const invertDate = (date) => {
  let newdate = date.split('-').reverse().join('-');
  return newdate;
};

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
    case 'Kia':
      return require('../assets/carLogos/kia.png');
    case 'Mini':
      return require('../assets/carLogos/mini.png');
    case 'Porsche':
      return require('../assets/carLogos/porsche.png');
    case 'Yamaha':
      return require('../assets/carLogos/yamaha.png');
    case 'Ducati':
      return require('../assets/carLogos/ducati.png');
    case 'Citroen':
      return require('../assets/carLogos/citroen.png');
    case 'Suzuki':
      return require('../assets/carLogos/suzuki.png');
    case 'Hyundai':
      return require('../assets/carLogos/hyundai.png');
    case 'Lexus':
      return require('../assets/carLogos/lexus.png');
    case 'Opel':
      return require('../assets/carLogos/opel.png');
    case 'Audi':
      return require('../assets/carLogos/audi.png');
    case 'Volvo':
      return require('../assets/carLogos/volvo.png');
    case 'Toyota':
      return require('../assets/carLogos/toyota.png');
    case 'Mazda':
      return require('../assets/carLogos/mazda.png');
    case 'Fiat':
      return require('../assets/carLogos/fiat.png');
    case 'Ford':
      return require('../assets/carLogos/ford.png');
    case 'Vespa':
      return require('../assets/carLogos/vespa.png');
    case 'BMW':
      return require('../assets/carLogos/bmw.png');
    case 'Honda':
      return require('../assets/carLogos/honda.png');
    case 'Mercedes':
      return require('../assets/carLogos/mercedes.png');
    case 'Chevrolet':
      return require('../assets/carLogos/chevrolet.png');
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
      // name="gas-station"
      name="fuel"
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

export const getCategoryIcon = (
  categoryName,
  color,
  size = Constants.width * 0.1,
) => {
  switch (categoryName) {
    case 'fuel':
      return <MaterialCommunityIcon name="fuel" size={size} color={color} />;
    case 'registration':
      return <Ionicon name="documents" size={size} color={color} />;
    case 'maintainance':
      return (
        <MaterialCommunityIcon name="hammer-wrench" size={size} color={color} />
      );
    case 'crashes':
      return <FontAwesome5Icon name="car-crash" size={size} color={color} />;
    case 'equipment':
      return (
        <FontAwesome5Icon name="luggage-cart" size={size * 0.9} color={color} />
      );
  }
};

export const unixToString = (dateUnix, addTime = 0, breakVal = '\n') => {
  const date = new Date(dateUnix);
  let returnString =
    date.getDate() +
    '.' +
    (parseInt(date.getMonth(), 10) + 1).toString() +
    '.' +
    breakVal +
    (parseInt(date.getFullYear(), 10) + addTime).toString() +
    '.';

  return returnString;
};

export function sortResults(data, prop, asc) {
  data.sort(function (a, b) {
    if (asc) {
      return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
    } else {
      return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
    }
  });

  return data;
}

const styles = StyleSheet.create({
  fuelIcon: {
    fontSize: 40,
    alignSelf: 'center',
  },
});
