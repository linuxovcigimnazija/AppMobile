import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  Alert,
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
import InputCategories from '../constants/InputCategories';
import {useLinkProps} from '@react-navigation/native';

const AutoScreen = ({navigation, route}) => {
  var averageFuelPrice = 0;
  var totalFuel = 0,
    totalConsumption = 0;

  const car = route.params.GDATA.data[route.params.carId];

  for (var item in car.data.fuel) {
    if (car.data.fuel[item].date > Date.now() - 2668760000) {
      totalFuel += car.data.fuel[item].price;
      totalConsumption += car.data.fuel[item].volume;
    }
  }
  if (totalFuel != 0) {
    averageFuelPrice = Number(totalFuel / totalConsumption).toFixed(2);
  }
  const currency = route.params.GDATA.country.valute;

  let scrollViewRef;

  const onArrowPressHandler = (way = 'down') => {
    way === 'down'
      ? scrollViewRef.scrollToEnd()
      : scrollViewRef.scrollTo({x: 0, y: 0, animated: true});
  };

  const goToAnalytics = () => {
    navigation.navigate('Analytics', {
      carId: route.params.carId,
    });
  };

  const getParam = (categoryName) => {
    for (let i = 0; i < 6; i++) {
      if (InputCategories[i].value === categoryName) {
        return i;
      }
    }
  };

  const goToCategory = (categoryName) => {
    const param = getParam(categoryName.toLowerCase());
    navigation.navigate('Input', {
      category: param,
      carId: route.params.carId,
    });
  };

  const Button =
    Constants.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.screenContainer}>
      <Header navigation={navigation} backButtonVisible route={route} />
      <View style={styles.autoHeader}>
        <View style={styles.imageContainer}>
          <FastImage source={getLogo(car.brand)} style={styles.image} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            height: '100%',
          }}>
          <View style={styles.headerTextContainer}>
            <AppText color={Constants.white} size={26} bold>
              {car.name}
            </AppText>
            <AppText
              style={{marginTop: 3}}
              color={Constants.primaryLight}
              size={18}>
              {car.brand}
            </AppText>
            <View
              style={[
                styles.flexRow,
                {
                  width: undefined,
                  paddingBottom: 5,
                  flex: 1,
                  alignItems: 'flex-end',
                },
              ]}>
              <View style={[styles.flexRow, {width: undefined}]}>
                <AppText color={Constants.primaryLight} size={16}>
                  {car.fuel.toUpperCase()}
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
                Kilometri:
              </AppText>
              <AppText
                color={Constants.white}
                size={14}
                bold
                style={{textAlign: 'right'}}>
                {car.mileage}km
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
      </View>

      <></>

      <View
        style={{
          flex: 10,
          backgroundColor: Constants.primaryDark,
        }}>
        <View
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: Constants.background,
            overflow: 'hidden',
          }}>
          <ScrollView
            ref={(ref) => (scrollViewRef = ref)}
            scrollEnabled={true}
            contentContainerStyle={styles.scrollView}>
            <View style={styles.bodyFade} />
            <View style={styles.bodyContainer}>
              <View style={styles.body}>
                <View style={[styles.shadow, {bottom: '2%'}]}>
                  <View style={[styles.overflow, {bottom: '2%'}]}>
                    <Button
                      activeOpacity={0.8}
                      style={[styles.flexRow, styles.center, styles.bigButton]}
                      onPress={() => goToCategory('Fuel')}>
                      <View
                        style={[
                          styles.flexRow,
                          styles.center,
                          styles.bigButton,
                        ]}>
                        <AppText bold size={32}>
                          Unesite Gorivo
                        </AppText>
                        <MaterialCommunityIcon
                          style={[{marginLeft: 10}, styles.icon]}
                          name="fuel"
                          color={Constants.black}
                          size={Constants.height * 0.8 * 0.1}
                        />
                      </View>
                    </Button>
                  </View>
                </View>

                <View
                  style={[styles.flexRow, {justifyContent: 'space-between'}]}>
                  <View style={styles.shadow}>
                    <View style={styles.overflow}>
                      <Button
                        activeOpacity={0.8}
                        style={[
                          styles.smallButton,
                          {backgroundColor: InputTypeColors.registration},
                        ]}
                        onPress={() => goToCategory('Registration')}>
                        <View
                          style={[
                            styles.smallButton,
                            {backgroundColor: InputTypeColors.registration},
                          ]}>
                          <Ionicon
                            name="documents"
                            color={Constants.white}
                            size={Constants.height * 0.8 * 0.1}
                            style={styles.icon}
                          />
                          <AppText
                            style={styles.buttonText}
                            bold
                            color={Constants.white}
                            size={16}>
                            Registracija i Osiguranje
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
                        ]}
                        onPress={() => goToCategory('Maintainance')}>
                        <View
                          style={[
                            styles.smallButton,
                            {backgroundColor: InputTypeColors.maintainance},
                          ]}>
                          <MaterialCommunityIcon
                            name="hammer-wrench"
                            color={Constants.white}
                            size={Constants.height * 0.8 * 0.1}
                            style={styles.icon}
                          />
                          <AppText
                            style={styles.buttonText}
                            bold
                            color={Constants.white}
                            size={16}>
                            Održavanje i Popravke
                          </AppText>
                        </View>
                      </Button>
                    </View>
                  </View>
                </View>

                <View
                  style={[
                    styles.flexRow,
                    {
                      justifyContent: 'space-between',
                      marginTop: '3%',
                    },
                  ]}>
                  <View style={styles.shadow}>
                    <View style={styles.overflow}>
                      <Button
                        activeOpacity={0.8}
                        style={[
                          styles.smallButton,
                          {backgroundColor: InputTypeColors.crashes},
                        ]}
                        onPress={() => goToCategory('Crashes')}>
                        <View
                          style={[
                            styles.smallButton,
                            {backgroundColor: InputTypeColors.crashes},
                          ]}>
                          <FontAwesome5Icon
                            name="car-crash"
                            color={Constants.white}
                            size={Constants.height * 0.8 * 0.095}
                            style={styles.icon}
                          />
                          <AppText
                            style={styles.buttonText}
                            bold
                            color={Constants.white}
                            size={18}>
                            Oštećenja
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
                        ]}
                        onPress={() => goToCategory('Equipment')}>
                        <View
                          style={[
                            styles.smallButton,
                            {backgroundColor: InputTypeColors.equipment},
                          ]}>
                          <FontAwesome5Icon
                            name="luggage-cart"
                            color={Constants.white}
                            size={Constants.height * 0.8 * 0.09}
                            style={styles.icon}
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
                    onPress={() => onArrowPressHandler('down')}
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

              <View style={styles.body2}>
                <TouchableWithoutFeedback onPress={() => goToAnalytics()}>
                  <View style={styles.preview}>
                    <MaterialCommunityIcon
                      style={{position: 'absolute', right: 20, top: 20}}
                      name="google-analytics"
                      color={Constants.white}
                      size={40}
                    />

                    <AppText
                      style={{marginBottom: 5}}
                      size={42}
                      bold
                      color={Constants.white}>
                      Analitika
                    </AppText>

                    <View
                      style={{
                        justifyContent: 'space-evenly',
                        flex: 1,
                        marginBottom: '10%',
                      }}>
                      <View>
                        <AppText color={Constants.white} size={20}>
                          Prosječna cijena po litru:
                        </AppText>
                        <View
                          style={{
                            marginLeft: 15,
                            flexDirection: 'row',
                          }}>
                          <Text>
                            <AppText
                              color={Constants.background}
                              bold
                              size={26}>
                              {averageFuelPrice + ' '}
                            </AppText>
                            <AppText color={Constants.background} size={20}>
                              {currency}
                            </AppText>
                          </Text>
                        </View>
                      </View>

                      <View>
                        <AppText color={Constants.white} size={20}>
                          Ukupno nasuto litara:
                        </AppText>
                        <View
                          style={{
                            marginLeft: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text>
                            <AppText
                              color={Constants.background}
                              bold
                              size={26}>
                              {totalConsumption + ' '}
                            </AppText>
                            <AppText color={Constants.background} size={20}>
                              litara
                            </AppText>
                          </Text>
                        </View>
                      </View>

                      <View>
                        <AppText color={Constants.white} size={20}>
                          Novca potrošeno posljednjih 30 dana:
                        </AppText>
                        <View
                          style={{
                            marginLeft: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <AppText color={Constants.background} size={26}>
                            {totalFuel + ' ' + currency}
                          </AppText>
                        </View>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.flexRow,
                        {
                          // justifyContent: 'space-between',
                          width: '100%', //25
                          alignSelf: 'center',
                          justifyContent: 'center',
                          position: 'absolute',
                          bottom: '10%',
                        },
                      ]}>
                      <AppText size={18} bold color={Constants.white}>
                        Pogledajte još...
                      </AppText>

                      {/* <View style={styles.dot} />
                      <View style={styles.dot} />
                      <View style={styles.dot} /> */}
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                <View style={styles.arrowButtonContainer2}>
                  <TouchableOpacity
                    onPress={() => onArrowPressHandler('up')}
                    activeOpacity={0.7}
                    style={styles.arrowButton}>
                    <FontAwesome5Icon
                      name="arrow-up"
                      size={50}
                      color={Constants.black}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* <LinearGradient
            colors={[Constants.background, Constants.background + '00']}
            style={[styles.bodyFade, {position: 'absolute'}]}
          /> */}
        </View>
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
    backgroundColor: Constants.background,
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
    paddingLeft: 15,
  },
  headerTextContainer2: {
    justifyContent: 'space-between',
    paddingBottom: 5,
    alignItems: 'flex-end',
  },
  marginTop: {
    marginTop: 10,
  },

  bodyContainer: {
    flex: 10,
    backgroundColor: Constants.background,
    alignItems: 'center',
  },
  body: {
    width: '100%',
    height: Constants.height * 0.73 - 20 - Constants.height * 0.06,
    padding: 20,
    paddingBottom: 0,
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
    height: Constants.height * 0.8 * 0.2,
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
    height: Constants.height * 0.721 * 0.18,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButton: {
    width: '60%',
    height: '100%',
    // borderWidth: 7,
    borderColor: Constants.black,
    borderRadius: 10,
    // borderStyle: 'dashed',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollView: {
    flexGrow: 1,
  },
  bodyFade: {
    width: '100%',
    height: Constants.height * 0.015,
  },

  body2: {
    width: '100%',
    height: Constants.height * 0.7,
    alignItems: 'center',
    padding: 20,
    paddingTop:
      Constants.height > 800
        ? Constants.height * 0.12
        : Constants.height * 0.07,
  },
  preview: {
    width: '100%',
    backgroundColor: Constants.primaryDark,
    borderRadius: 25,
    flex: 2,
    padding: 30,
    paddingTop: 20,

    elevation: 5,
    shadowColor: Constants.primaryDark,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  dot: {
    backgroundColor: Constants.white,
    aspectRatio: 1,
    borderRadius: 100,
    width: 13,
  },

  arrowButtonContainer2: {
    flex: 0.7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AutoScreen;
