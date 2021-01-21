import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import AppText from '../components/AppText';
import Header from '../components/Header';
import Constants from '../constants/Constants';
import FastImage from 'react-native-fast-image';
import {getLogo, getFuelIcon} from '../utils/Functions';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const dummyData = [
  {
    brand: 'Volkswagen',
    name: 'Golf 8',
    fuel: 'dizel',
    horsepower: 150,
    sizeInLiters: 1.5,
    id: 0,
  },
  {
    brand: 'Renault',
    name: 'Clio Plavi',
    fuel: 'benzin',
    horsepower: 80,
    sizeInLiters: 1.2,
    id: 1,
  },
  {
    brand: 'Renault',
    name: 'Clio Zuti',
    fuel: 'plin + benzin',
    horsepower: 80,
    sizeInLiters: 1.2,
    id: 2,
  },
  {
    brand: 'Tesla',
    name: 'Model S',
    fuel: 'struja',
    horsepower: 100,
    sizeInLiters: null,
    id: 3,
  },
  // {
  //   brand: 'Renault',
  //   name: 'Clio Zuti',
  //   fuel: 'plin + benzin',
  //   horsepower: 80,
  //   sizeInLiters: 1.2,
  //   id: 4,
  // },
  // {
  //   brand: 'Renault',
  //   name: 'Clio Zuti',
  //   fuel: 'plin + benzin',
  //   horsepower: 80,
  //   sizeInLiters: 1.2,
  //   id: 5,
  // },
  // {
  //   brand: 'Renault',
  //   name: 'Clio Zuti',
  //   fuel: 'plin + benzin',
  //   horsepower: 80,
  //   sizeInLiters: 1.2,
  //   id: 6,
  // },
];

const HomeScreen = ({navigation, route}) => {
  const [cars, setCars] = useState(dummyData);

  const addCarHandler = () => {};

  const goToCar = (car) => {
    navigation.navigate('Auto');
  };

  const renderCar = (car) => {
    const item = car.item;
    const fuelIcon = getFuelIcon(item.fuel);

    return (
      <TouchableHighlight
        style={[
          styles.carButton,
          {
            alignSelf: item.id % 2 === 0 ? 'flex-start' : 'flex-end',
            flexDirection: item.id % 2 === 0 ? 'row' : 'row-reverse',
            // backgroundColor: Constants.background,
          },
        ]}
        activeOpacity={0.75}
        underlayColor={Constants.red + '80'}
        onPress={() => goToCar(car)}>
        <View
          style={[
            styles.carContainer,
            {
              alignSelf: item.id % 2 === 0 ? 'flex-start' : 'flex-end',
              flexDirection: item.id % 2 === 0 ? 'row' : 'row-reverse',
            },
          ]}>
          <View style={styles.logoContainer}>
            <FastImage source={getLogo(item.brand)} style={styles.brandLogo} />
          </View>

          <View
            style={[
              styles.carTextContainer,
              {
                alignItems: item.id % 2 === 0 ? 'flex-start' : 'flex-end',
              },
            ]}>
            <AppText
              size={20}
              bold
              color={Constants.white}
              style={{
                textAlign: item.id % 2 === 0 ? 'left' : 'right',
              }}>
              {item.name}
            </AppText>
            <AppText size={16} color={Constants.background}>
              {item.brand}
            </AppText>
            <AppText size={14} color={Constants.primaryLight}>
              {item.fuel.toUpperCase()}
            </AppText>
          </View>

          {fuelIcon}
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <Header route={route} />
      <View style={styles.body}>
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id.toString()}
          style={styles.carList}
          renderItem={(item) => renderCar(item)}
          ListFooterComponent={
            <TouchableOpacity
              onPress={() => {
                addCarHandler();
              }}
              activeOpacity={0.7}
              style={styles.addCarButton}>
              <MaterialCommunityIcon
                name="plus"
                size={70}
                color={Constants.black}
              />
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Constants.background,
  },
  body: {
    flex: 1,
  },
  carList: {
    width: '100%',
    flexGrow: 0,
    paddingTop: 15,
    paddingBottom: 20,
  },

  carButton: {
    width: Constants.width * 0.8 - 20,
    borderRadius: 10,
    marginBottom: 15,
    marginStart: 20,
  },
  carContainer: {
    width: Constants.width * 0.8 - 20,
    padding: 10,
    paddingEnd: 20,
    borderRadius: 10,
    backgroundColor: Constants.primary,

    elevation: 4,
    shadowColor: Constants.gray,
    shadowRadius: 3,
    shadowOpacity: 0.75,
    shadowOffset: {width: 2, height: 3},
  },
  logoContainer: {
    backgroundColor: Constants.white,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },
  brandLogo: {
    width: 60,
    aspectRatio: 1,
  },
  carTextContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  addCarButton: {
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 7,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: Constants.black,
    width: Constants.width * 0.75 - 40, // -40 just so it matches the padding of flatlist
    marginTop: 15,
    marginBottom: Constants.height * 0.08,
  },
});

export default HomeScreen;
