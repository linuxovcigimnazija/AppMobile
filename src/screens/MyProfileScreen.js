import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import AppText from '../components/AppText';
import Constants from '../constants/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Pie from 'react-native-pie';
import {themes} from '../constants/colors';
import Header from '../components/Header';
import {onLogOut} from '../utils/firebaseUtils';

var name, email, numberOfCars, online;
var fuelConsumption, moneySpent;
var pieFuel, pieRegistration, pieServis, pieDamage, pieOther;
function data_function() {
  name = 'Petar Petrović';
  email = 'petarpetrovic@gmail.com';
  numberOfCars = 3;
  online = '8.10.2020.';
  fuelConsumption = '280 litara';
  moneySpent = '880 KM';

  pieFuel = 45;
  pieRegistration = 15;
  pieServis = 20;
  pieDamage = 15;
  pieOther = 5;
}

const MyProfileScreen = ({route, navigation}) => {
  const [color, setColor] = useState(themes.seaship);

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  function changeTheme() {
    if (color == themes.seaship) {
      setColor(themes.watermellon);
    } else {
      setColor(themes.seaship);
    }
    // appTheme = color;
  }

  data_function();

  return (
    <View style={styles.wholescreen}>
      <Header route={route} />
      <View style={styles.body}>
        <LinearGradient
          colors={[color.primaryDark, color.primaryLight]}
          style={styles.biglinearGradient}>
          <View style={styles.upperContainer}>
            <Icon name="account-circle" size={140} color={color.primaryDark} />
            <View style={styles.upperrightContainer}>
              <View style={styles.nameContainer}>
                <AppText style={styles.firstText}>{name}</AppText>
                <AppText style={styles.secondText}>{email}</AppText>
              </View>
              <AppText style={styles.thirdText}>
                {numberOfCars + ' vozila'}
              </AppText>
              <AppText style={styles.fourthText}>
                {'registrovan od ' + online}
              </AppText>
              <View style={styles.spacing}></View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.syncButton}>
                  <AppText style={styles.syncbuttonText}>
                    sinhronizuj{'\n'}podatke
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={() => {
                    onLogOut(goToLogin);
                  }}>
                  <AppText style={styles.logoutbuttonText}>odjavi se</AppText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.twoboxContainer}>
              <View style={styles.smallBox}></View>
              <View style={styles.smallBox}></View>
            </View>
            <View style={styles.bigBox} />
          </View>

          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.themeButton}
                onPress={() => {
                  changeTheme();
                }}>
                <LinearGradient
                  style={styles.linearGradient}
                  colors={['#00ee22', '#00ff88']}>
                  <AppText style={styles.themebuttonText}>
                    Promijeni temu
                  </AppText>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.twoboxContainer}>
                <View style={styles.smallBox}>
                  <Icon name="fuel" size={30} color={color.primaryDark} />
                  <AppText>Ukupno nasuto</AppText>
                  <AppText style={styles.boxText}>{fuelConsumption}</AppText>
                </View>
                <View style={styles.smallBox}>
                  <Icon name="cash" size={30} color={color.primaryDark} />
                  <AppText>Ukupno potrošeno</AppText>
                  <AppText style={styles.boxText}>{moneySpent}</AppText>
                </View>
              </View>

              <View style={styles.bigBox}>
                <Pie
                  radius={70}
                  innerRadius={50}
                  sections={[
                    {
                      percentage: pieFuel,
                      color: '#C70039',
                    },
                    {
                      percentage: pieRegistration,
                      color: '#44CD40',
                    },
                    {
                      percentage: pieServis,
                      color: '#404FCD',
                    },
                    {
                      percentage: pieDamage,
                      color: '#EBD22F',
                    },
                    {
                      percentage: pieOther,
                      color: '#EB55DF',
                    },
                  ]}
                  dividerSize={2}
                  strokeCap={'butt'}
                />
                <View style={styles.pietextContainer}>
                  <AppText>Gorivo</AppText>
                  <AppText>Troškovi registracije</AppText>
                  <AppText>Servis i održavanje</AppText>
                  <AppText>Oštećenja</AppText>
                  <AppText>Oprema i ostalo</AppText>
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wholescreen: {
    width: '100%',
    height: '100%',
    backgroundColor: Constants.primaryDark,
  },
  body: {
    flex: 1,
  },
  upperContainer: {
    width: '100%',
    height: '32%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  upperrightContainer: {
    width: '50%',
    justifyContent: 'space-evenly',
  },
  nameContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  firstText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  secondText: {
    fontSize: 12,
    textAlignVertical: 'top',
  },
  thirdText: {
    fontSize: 15,
  },
  fourthText: {
    fontSize: 15,
  },
  eightSpacing: {
    height: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  syncButton: {
    justifyContent: 'center',
  },
  logoutButton: {
    justifyContent: 'center',
  },
  syncbuttonText: {
    color: 'green',
    textAlign: 'center',
  },
  logoutbuttonText: {
    color: 'red',
    textAlign: 'center',
  },
  themeButton: {
    margin: 18,
    marginBottom: 8,
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 12,
    width: '80%',
    height: '12%',
    backgroundColor: 'green',
  },
  themebuttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
  biglinearGradient: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
  },
  linearGradient: {
    flexGrow: 1,
    borderRadius: 12,
    height: '100%',
    width: '100%',
  },
  bigBox: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 15,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    height: '50%',
    width: '90%',
  },
  smallBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 130,
    width: '47%',
  },
  twoboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    margin: 10,
    padding: 0,
    width: '90%',
  },
  boxText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  scrollView: {
    flexGrow: 1,
    minHeight: '80%',
  },
  scrollContainer: {
    width: '100%',
    height: '68%',
  },
  pietextContainer: {
    justifyContent: 'space-evenly',
    paddingLeft: 6,
  },
});

export default MyProfileScreen;
