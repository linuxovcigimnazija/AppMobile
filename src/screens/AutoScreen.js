import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import AppText from '../components/AppText';
import Header from '../components/Header';
import Constants from '../constants/Constants';
import {getLogo, getFuelIcon} from '../utils/Functions';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import InputTypeColors from '../constants/InputTypeColors';

const AutoScreen = ({navigation}) => {
  const car = {
    brand: 'Volkswagen',
    name: 'Golf 8',
    fuel: 'dizel',
    horsepower: 150,
    sizeInLiters: 1.5,
    km: 15429,
    id: 0,
  };

  const Button =
    Constants.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.screenContainer}>
      <Header navigation={navigation} backButtonVisible fade={false} />
      <View style={styles.autoHeader}>
        <View style={styles.imageContainer}>
          <FastImage source={getLogo(car.brand)} style={styles.image} />
        </View>
        <View style={styles.headerTextContainer}>
          <AppText color={Constants.white} size={26} bold>
            {car.name}
          </AppText>
          <AppText color={Constants.primaryLight} size={20} bold>
            {car.brand}
          </AppText>
          <View
            style={[
              styles.flexRow,
              {paddingBottom: 5, flex: 1, alignItems: 'flex-end'},
            ]}>
            <View style={styles.flexRow}>
              <AppText color={Constants.primaryLight} size={18} bold>
                {car.fuel}
              </AppText>
              {getFuelIcon(car.fuel, {fontSize: 20, marginLeft: 10})}
            </View>
          </View>
        </View>

        <View style={styles.headerTextContainer2}>
          <View>
            <AppText
              color={Constants.white}
              size={16}
              style={{textAlign: 'right'}}>
              Presao:
            </AppText>
            <AppText
              color={Constants.white}
              size={14}
              bold
              style={{textAlign: 'right'}}>
              {car.km}km
            </AppText>
          </View>
          <View>
            <AppText
              style={[styles.marginTop, {textAlign: 'right'}]}
              color={Constants.background}
              size={14}>
              {car.horsepower} KS
            </AppText>
            <AppText
              color={Constants.background}
              size={14}
              style={{textAlign: 'right'}}>
              {car.sizeInLiters}L
            </AppText>
          </View>
        </View>
      </View>

      <></>

      <View style={styles.bodyRadius} />
      <View style={styles.bodyContainer}>
        {/* <ScrollView contentContainerStyle={styles.scrollView}> */}
        <View style={styles.body}>
          <View style={[styles.shadow, {bottom: '2%'}]}>
            <View style={[styles.overflow, {bottom: '2%'}]}>
              <Button
                activeOpacity={0.8}
                style={[styles.flexRow, styles.center, styles.bigButton]}>
                <View style={[styles.flexRow, styles.center, styles.bigButton]}>
                  <AppText bold size={38}>
                    Unesi Gorivo
                  </AppText>
                  <Ionicon
                    style={{marginLeft: 10}}
                    name="color-fill"
                    color={Constants.black}
                    size={Constants.height * 0.8 * 0.1}
                  />
                </View>
              </Button>
            </View>
          </View>

          <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
            <View style={styles.shadow}>
              <View style={styles.overflow}>
                <Button
                  activeOpacity={0.8}
                  style={[
                    styles.smallButton,
                    {backgroundColor: InputTypeColors.registration},
                  ]}>
                  <View
                    style={[
                      styles.smallButton,
                      {backgroundColor: InputTypeColors.registration},
                    ]}>
                    <Ionicon
                      name="documents"
                      color={Constants.white}
                      size={Constants.height * 0.8 * 0.1}
                    />
                    <AppText
                      style={styles.buttonText}
                      bold
                      color={Constants.white}
                      size={16}>
                      Troskovi Registracije
                    </AppText>
                  </View>
                </Button>
              </View>
            </View>

            <View style={styles.shadow}>
              <View style={styles.overflow}>
                <Button
                  activeOpacity={0.8}
                  style={[
                    styles.smallButton,
                    {backgroundColor: InputTypeColors.maintainance},
                  ]}>
                  <View
                    style={[
                      styles.smallButton,
                      {backgroundColor: InputTypeColors.maintainance},
                    ]}>
                    <MaterialCommunityIcon
                      name="hammer-wrench"
                      color={Constants.white}
                      size={Constants.height * 0.8 * 0.1}
                    />
                    <AppText
                      style={styles.buttonText}
                      bold
                      color={Constants.white}
                      size={16}>
                      Odrzavanje i Popravke
                    </AppText>
                  </View>
                </Button>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.flexRow,
              {justifyContent: 'space-between', marginTop: '3%'},
            ]}>
            <View style={styles.shadow}>
              <View style={styles.overflow}>
                <Button
                  activeOpacity={0.8}
                  style={[
                    styles.smallButton,
                    {backgroundColor: InputTypeColors.crashes},
                  ]}>
                  <View
                    style={[
                      styles.smallButton,
                      {backgroundColor: InputTypeColors.crashes},
                    ]}>
                    <FontAwesome5Icon
                      name="car-crash"
                      color={Constants.white}
                      size={Constants.height * 0.8 * 0.095}
                    />
                    <AppText
                      style={styles.buttonText}
                      bold
                      color={Constants.white}
                      size={18}>
                      Ostecenja
                    </AppText>
                  </View>
                </Button>
              </View>
            </View>

            <View style={styles.shadow}>
              <View style={styles.overflow}>
                <Button
                  activeOpacity={0.8}
                  style={[
                    styles.smallButton,
                    {backgroundColor: InputTypeColors.equipment},
                  ]}>
                  <View
                    style={[
                      styles.smallButton,
                      {backgroundColor: InputTypeColors.equipment},
                    ]}>
                    <FontAwesome5Icon
                      name="luggage-cart"
                      color={Constants.white}
                      size={Constants.height * 0.8 * 0.09}
                    />
                    <AppText
                      style={styles.buttonText}
                      bold
                      color={Constants.white}
                      size={16}>
                      Oprema i Ostalo
                    </AppText>
                  </View>
                </Button>
              </View>
            </View>
          </View>

          <View style={styles.arrowButtonContainer}>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.7}
              style={styles.arrowButton}>
              <FontAwesome5Icon
                name="arrow-down"
                size={50}
                color={Constants.black}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  screenContainer: {
    flex: 1,
    backgroundColor: Constants.primaryDark,
  },
  autoHeader: {
    backgroundColor: Constants.primaryDark,
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  imageContainer: {
    padding: 15,
    backgroundColor: Constants.white,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Constants.primaryLight,
  },
  image: {
    aspectRatio: 1,
    width: Constants.width * 0.15,
    borderRadius: 10, // maybe this could look good
  },
  headerTextContainer: {
    flex: 2,
    height: '100%',
    paddingLeft: 15,
  },
  headerTextContainer2: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 5,
    alignItems: 'flex-end',
  },
  marginTop: {
    marginTop: 10,
  },

  bodyRadius: {
    width: '100%',
    flex: 0.4,
    borderTopLeftRadius: 10000,
    borderTopRightRadius: 10000,
    backgroundColor: Constants.background,
  },
  bodyContainer: {
    flex: 10,
    backgroundColor: Constants.background,
    alignItems: 'center',
    padding: 20,
  },
  body: {
    width: '100%',
    height: '100%',
  },
  bigButton: {
    width: Constants.width - 40,
    justifyContent: 'center',
    backgroundColor: InputTypeColors.fuel,
    borderRadius: 10,
    paddingVertical: 10,
    height: Constants.height * 0.8 * 0.16,
  },
  smallButton: {
    width: Constants.width * 0.535 - 40,
    height: Constants.height * 0.8 * 0.22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
  },

  overflow: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  shadow: {
    shadowColor: Constants.gray,
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowRadius: 2,
    shadowOpacity: 0.3,
  },

  buttonText: {
    paddingHorizontal: 25,
    textAlign: 'center',
    marginTop: 3,
  },
  arrowButtonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButton: {
    width: '60%',
    borderWidth: 7,
    borderColor: Constants.black,
    borderRadius: 10,
    borderStyle: 'dashed',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  body2: {
    width: '100%',
    height: '100%',
    backgroundColor: 'teal',
  },

  scrollView: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'teal',
    padding: 20,
  },
});

export default AutoScreen;
