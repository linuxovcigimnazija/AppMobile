import React from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import AppText from '../components/AppText'
import Constants from '../constants/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Pie from 'react-native-pie'

var name, email, numberOfCars, online;
var fuelConsumption, moneySpent;
var pieFuel, pieRegistration, pieServis, pieDamage, pieOther;
function data_function()
  {
    name='Petar Petrović'
    email='petarpetrovic@gmail.com'
    numberOfCars= 3
    online='8.10.2020.'
    fuelConsumption='280 litara'
    moneySpent='880 KM'

    pieFuel=45
    pieRegistration=15
    pieServis=20
    pieDamage=15
    pieOther=5
  }



const MyProfileScreen = () => {

  data_function();

  return (
    <View style={styles.wholescreen}>
      <LinearGradient colors={[Constants.primaryDark, Constants.primaryLight]}
        style={styles.linearGradient}>
      <View style={styles.upperContainer}>

        <Icon name='account-circle' size={140} color= {Constants.primaryDark} />
        <View style={styles.upperrightContainer}>
          <View style={styles.nameContainer}>
          <AppText style={styles.firstText}>{name}</AppText>
          <AppText style={styles.secondText}>{email}</AppText>
          </View>
          <AppText style={styles.thirdText}>{numberOfCars + ' vozila'}</AppText>
          <AppText style={styles.fourthText}>{'registrovan od ' + online}</AppText>
          <View style={styles.spacing}></View>
          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.syncButton}>
              <AppText style={styles.syncbuttonText}>sinhronizuj{'\n'}podatke</AppText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton}>
              <AppText  style={styles.logoutbuttonText}>odjavi se</AppText>
            </TouchableOpacity>

          </View>
        </View>
      </View>
      
        <ScrollView contentContainerStyle={styles.scrollView} >
          
        
        <View style={{flex: 1}}>

          <TouchableOpacity style={styles.themeButton}>
            <LinearGradient style={styles.linearGradient} colors={['#00ee22', '#00ff88']}
            >
            <AppText style={styles.themebuttonText}>Promijeni temu</AppText>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.twoboxContainer}>
            <View style={styles.smallBox}>
              <Icon name='fuel' size={30} color= {Constants.primaryDark} />
              <AppText>Ukupno nasuto</AppText>
              <AppText style={styles.boxText}>{fuelConsumption}</AppText>
            </View>
            <View style={styles.smallBox}>
              <Icon name='cash' size={30} color= {Constants.primaryDark} />
              <AppText>Ukupno potrošeno</AppText>
              <AppText style={styles.boxText}>{moneySpent}</AppText>
            </View>
          </View>

          <View style={styles.bigBox}>
          <Pie
              radius={70}
              innerRadius={50}
              sections={[{
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
              }
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
  );
};

const styles = StyleSheet.create({
  wholescreen: {
    width: '100%',
    height: '92%',
    backgroundColor: Constants.primaryDark,
    alignItems: 'center'
  },
  upperContainer: {
    width: '100%',
    height: '32%',
    flexDirection: 'row',
    backgroundColor: "white",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  upperrightContainer: {
    width: '50%',
    justifyContent: 'space-evenly'
  },
  nameContainer: {
    width: '100%',
    justifyContent: 'flex-start'
  },
  firstText: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  secondText: {
    fontSize: 11,
    textAlignVertical: 'top'
  },
  thirdText: {
    fontSize: 14
  },
  fourthText: {
    fontSize: 14
  },
  eightSpacing: {
    height: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  syncButton: {
    justifyContent: 'center'
  },
  logoutButton: {
    justifyContent: 'center'
  },
  syncbuttonText: {
    color: '#00e920',
    textAlign: 'center'
  },
  logoutbuttonText: {
    color: 'red',
    textAlign: 'center'
  },
  themeButton: {
    margin: 18,
    marginBottom: 8,
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 3,
    width: '80%',
    height: '8%',
    backgroundColor: 'green'
  },
  linearGradient: {
    flexGrow: 1,
    borderRadius: 3,
    height: '100%',
    width: '100%'
  },
  themebuttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlignVertical: 'center',
    flex: 1
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
    width: '90%'
  },
  smallBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 130,
    width: '47%'
  },
  twoboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    margin: 10,
    padding: 0,
    width: '90%'
  },
  boxText: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  scrollView: {
    flexGrow: 1,
    minHeight: '80%'
  },
  scrollContainer: {
    width: '100%',
    height: '68%'
  },
  pietextContainer: {
    justifyContent: 'space-evenly',
    paddingLeft: 6
  }
  
  
  }
);

export default MyProfileScreen;
