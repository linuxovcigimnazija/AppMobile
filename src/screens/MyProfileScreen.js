import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AppText from '../components/AppText';
import Constants from '../constants/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Pie from 'react-native-pie';
import {themes} from '../constants/colors';
import Header from '../components/Header';
import InputTypeColors from '../constants/InputTypeColors';
import {onLogOut, updateBase} from '../utils/firebaseUtils';
import {unixToString} from '../utils/Functions';

var name, email, numberOfCars, online;
var fuelConsumption, moneySpent, currency;
var pieFuel, pieRegistration, pieServis, pieDamage, pieOther;

function calcPercent(item, total) {
  return (item / total) * 100;
}

const MyProfileScreen = ({route, navigation}) => {
  const [color, setColor] = useState(themes.seaship);
  const [data, setData] = useState(route.params.GDATA);
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  var totalConsumption = 0,
    totalSpent = 0;
  var totalFuel = 0,
    totalRegistration = 0,
    totalServis = 0,
    totalDamage = 0,
    totalOther = 0;

  console.log('RUNNING PIE ANALYTICS');
  for (var item in data.data) {
    for (var note in data.data[item].data.fuel) {
      totalConsumption += data.data[item].data.fuel[note].volume;
      totalFuel += data.data[item].data.fuel[note].price;
    }
    for (var note in data.data[item].data.carWash) {
      totalOther += data.data[item].data.carWash[note].price;
    }
    for (var note in data.data[item].data.equipment) {
      totalOther += data.data[item].data.equipment[note].price;
    }
    for (var note in data.data[item].data.tickets) {
      totalOther += data.data[item].data.tickets[note].price;
    }
    for (var note in data.data[item].data.other) {
      totalOther += data.data[item].data.other[note].price;
    }
    for (var note in data.data[item].data.maintainance) {
      totalServis += data.data[item].data.maintainance[note].price;
    }
    for (var note in data.data[item].data.repair) {
      totalServis += data.data[item].data.repair[note].price;
    }
    for (var note in data.data[item].data.crashes) {
      totalDamage += data.data[item].data.crashes[note].price;
    }
    for (var note in data.data[item].data.insurance) {
      totalRegistration += data.data[item].data.insurance[note].price;
    }
    for (var note in data.data[item].data.registration) {
      totalRegistration += data.data[item].data.registration[note].price;
    }
  }

  totalSpent =
    totalFuel + totalRegistration + totalServis + totalDamage + totalOther;

  var pieNumbers = [
    calcPercent(totalFuel, totalSpent),
    calcPercent(totalRegistration, totalSpent),
    calcPercent(totalServis, totalSpent),
    calcPercent(totalDamage, totalSpent),
    calcPercent(totalOther, totalSpent),
  ];
  var pieColors = [
    InputTypeColors.fuel,
    InputTypeColors.registration,
    InputTypeColors.maintainance,
    InputTypeColors.crashes,
    InputTypeColors.equipment,
  ];
  for (var i = 0; i < 5; i += 1) {
    if (isNaN(pieNumbers[i])) pieNumbers[i] = 0;
  }

  const logOut = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  function changeTheme() {
    // not used in this version of the app
    if (color === themes.seaship) {
      setColor(themes.watermellon);
    } else {
      setColor(themes.seaship);
    }
    // appTheme = color;
  }

  function data_function() {
    name = data.name;
    email = data.email;
    numberOfCars = data.data.length;
    online = unixToString(data.date, 0, '');
    fuelConsumption = '280 litara';
    moneySpent = '880';
    currency = route.params.GDATA.country.valute;

    pieFuel = 45;
    pieRegistration = 15;
    pieServis = 20;
    pieDamage = 15;
    pieOther = 5;
  }

  data_function();

  for (var i = 0; i < 5; i += 1) {
    if (isNaN(pieNumbers[i])) pieNumbers[i] = 0;
  }

  return (
    <View style={styles.wholescreen}>
      <Header route={route} />
      <View style={styles.body}>
        <View style={styles.biglinearGradient}>
          <View style={styles.upperContainer}>
            <View style={styles.imageContainer}>
              <FontAwesomeIcon
                name="user"
                size={
                  Constants.height * 0.12 > 90 ? 90 : Constants.height * 0.12
                }
                color={Constants.black}
              />
            </View>
            <View style={styles.upperrightContainer}>
              <View style={styles.nameContainer}>
                <AppText style={styles.firstText}>{name}</AppText>
                <AppText style={styles.secondText}>{email}</AppText>
              </View>
              <AppText style={styles.thirdText}>
                Broj vozila: {numberOfCars}
              </AppText>
              <AppText style={styles.fourthText}>
                {'Registrovan od: ' + online}
              </AppText>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.syncButton}
                  onPress={() =>
                    updateBase(route.params.reRender, route.params.render)
                  }>
                  <AppText style={styles.syncbuttonText}>Cloud</AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.logoutButton}
                  onPress={() => {
                    onLogOut(logOut);
                  }}>
                  <AppText style={styles.logoutbuttonText}>Izađi</AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={{flex: 1, marginHorizontal: 20}}>
              {/* <View style={styles.shadow}>
                <LinearGradient
                  style={styles.linearGradient}
                  colors={[Constants.black, '#575757']}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.themeButton}
                    onPress={() => {
                      changeTheme();
                    }}>
                    <AppText style={styles.themebuttonText}>
                      Promijeni temu
                    </AppText>
                    <Ionicons
                      size={40}
                      color={Constants.white}
                      name="color-fill"
                    />
                  </TouchableOpacity>
                </LinearGradient>
              </View> */}
              <AppText
                style={{
                  marginTop: 20,
                  marginBottom: 15,
                  marginLeft: 0,
                  textAlign: 'center',
                }}
                bold
                size={28}
                color={Constants.primaryDark}>
                Ukupna statistika svih vozila
              </AppText>

              <View style={styles.twoboxContainer}>
                <View style={[styles.smallBox, {marginRight: 10}]}>
                  <Icon name="fuel" size={38} color={Constants.white} />
                  <AppText color={Constants.white}>Ukupno nasuto</AppText>
                  <AppText style={styles.boxText}>
                    {totalConsumption}
                    <AppText
                      style={{fontWeight: '300'}}
                      color={Constants.white}
                      size={22}>
                      {' '}
                      l
                    </AppText>
                  </AppText>
                </View>
                <View style={styles.smallBox}>
                  <Icon name="cash" size={40} color={Constants.white} />
                  <AppText color={Constants.white}>Ukupno potrošeno</AppText>
                  <AppText style={[styles.boxText, {textAlign: 'center'}]}>
                    {totalSpent + ' ' + currency}
                  </AppText>
                </View>
              </View>

              <View style={styles.bigBox}>
                <AppText color={Constants.white} size={24} bold>
                  Raspodjela potrošnje
                </AppText>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    flex: 1,
                    marginTop: 15,
                  }}>
                  <View style={styles.pieContainer}>
                    <Pie
                      radius={70}
                      innerRadius={30}
                      sections={[
                        {
                          percentage: pieNumbers[0],
                          color: pieColors[0],
                        },
                        {
                          percentage: pieNumbers[1],
                          color: pieColors[1],
                        },
                        {
                          percentage: pieNumbers[2],
                          color: pieColors[2],
                        },
                        {
                          percentage: pieNumbers[3],
                          color: pieColors[3],
                        },
                        {
                          percentage: pieNumbers[4],
                          color: pieColors[4],
                        },
                      ]}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        width: 150,
                        height: 150,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: 'teal',
                      }}>
                      <Icon
                        name="google-analytics"
                        size={20}
                        color={Constants.primaryDark}
                      />
                    </View>
                  </View>
                  <View style={styles.pietextContainer}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={[
                          styles.dot,
                          {backgroundColor: InputTypeColors.fuel},
                        ]}
                      />
                      <AppText color={Constants.white}>Gorivo</AppText>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={[
                          styles.dot,
                          {
                            backgroundColor: InputTypeColors.registration,
                          },
                        ]}
                      />
                      <AppText color={Constants.white}>
                        Troškovi registracije
                      </AppText>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={[
                          styles.dot,
                          {backgroundColor: InputTypeColors.maintainance},
                        ]}
                      />
                      <AppText color={Constants.white}>
                        Servis i održavanje
                      </AppText>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={[
                          styles.dot,
                          {backgroundColor: InputTypeColors.crashes},
                        ]}
                      />
                      <AppText color={Constants.white}>Oštećenja</AppText>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={[
                          styles.dot,
                          {backgroundColor: InputTypeColors.equipment},
                        ]}
                      />
                      <AppText color={Constants.white}>Oprema i ostalo</AppText>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wholescreen: {
    width: '100%',
    height: '100%',
    backgroundColor: Constants.background,
  },
  body: {
    flex: 1,
  },
  upperContainer: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Constants.primaryDark,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageContainer: {
    height: Constants.height * 0.15,
    maxHeight: 110,
    width: Constants.height * 0.15,
    maxWidth: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Constants.primaryLight,

    backgroundColor: Constants.white,
    borderRadius: 1000,
  },
  upperrightContainer: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-evenly',
  },
  nameContainer: {
    width: '100%',
    justifyContent: 'space-between',
  },
  firstText: {
    fontSize: 22,
    color: Constants.white,
    fontWeight: 'bold',
  },
  secondText: {
    marginTop: 3,
    fontSize: 16,
    color: Constants.white,
    textAlignVertical: 'top',
  },
  thirdText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Constants.white,
  },
  fourthText: {
    marginTop: 3,
    fontSize: 16,
    marginBottom: 10,
    color: Constants.white,
  },
  eightSpacing: {
    height: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  syncButton: {
    backgroundColor: Constants.background,
    borderRadius: 100,
    width: '40%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    marginRight: 15,
  },
  logoutButton: {
    width: '40%',
    justifyContent: 'center',
    backgroundColor: Constants.primaryLight,
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  syncbuttonText: {
    color: 'green',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutbuttonText: {
    color: Constants.primaryDark,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  themeButton: {
    padding: 20,
    flexDirection: 'row',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  themebuttonText: {
    color: Constants.white,
    fontWeight: 'bold',
    fontSize: 26,
  },
  biglinearGradient: {
    flexGrow: 1,
    backgroundColor: Constants.background,
    height: '100%',
    width: '100%',
  },
  linearGradient: {
    borderRadius: 12,
    margin: 10,
    marginTop: 20,
    alignSelf: 'center',
    width: '100%',
    // borderWidth: 5,
    // borderColor: Constants.black,
  },
  shadow: {
    elevation: 3,
    shadowColor: Constants.gray,
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowRadius: 2,
    shadowOpacity: 0.3,
  },
  bigBox: {
    width: '100%',
    backgroundColor: Constants.primaryDark,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    paddingVertical: 20,

    elevation: 3,
    shadowColor: Constants.gray,
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowRadius: 2,
    shadowOpacity: 0.3,
  },
  smallBox: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Constants.primaryDark,
    borderRadius: 15,
    flex: 1,
    paddingVertical: Constants.height > 800 ? 30 : 20,

    elevation: 3,
    shadowColor: Constants.gray,
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowRadius: 2,
    shadowOpacity: 0.3,
  },
  twoboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
  },
  boxText: {
    fontSize: 25,
    color: Constants.white,
    fontWeight: 'bold',
  },
  scrollView: {
    flexGrow: 1,
    minHeight: '80%',
    paddingBottom: 20,
  },
  scrollContainer: {
    width: '100%',
    height: '68%',
  },
  pieContainer: {
    padding: 5,
    backgroundColor: Constants.primaryLight,
    borderRadius: 1000,
  },
  pietextContainer: {
    flex: 1,
    height: '90%',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    marginRight: 5,
  },
});

export default MyProfileScreen;
