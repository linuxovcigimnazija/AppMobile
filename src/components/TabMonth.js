import React, { Component, useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native';
import AppText from './AppText';
import { themes } from '../constants/colors';
import Pie from 'react-native-pie';
import {
    MaterialCommunityIcon,
    MaterialIcon,
    FontAwesome5Icon,
    FontAwesomeIcon,
    EntypoIcon,
    FeatherIcon,
  } from '../utils/Functions'
import IconFA from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../constants/Constants';
import Colors from '../constants/InputTypeColors';
import App from '../../App';
import CategoryCard from './CategoryCard';
import File from './data.json'

var averageConsumption, kilometrage=0, totalConsumption=0, totalSpent=0;
var pieFuel, pieRegistration, pieServis, pieDamage, pieOther;
var totalFuel=0, totalRegistration, totalServis, totalDamage, totalOther=0;



for(var item in File.data){
  if(File.data[item].category=="fuel"){
    if((File.data[item].date)>((Date.now()/1000)-2668760)){
      totalConsumption+=File.data[item].liter
      kilometrage+=File.data[item].km
      totalFuel+=File.data[item].price
    }
  }
  else if(File.data[item].category =="other"){
    if((File.data[item].date)>((Date.now()/1000)-2668760)){
      totalOther+=File.data[item].price
      
  }
}
}


totalSpent=totalFuel+totalOther

kilometrage/=100    //remove
kilometrage=Number((kilometrage).toFixed(0)); //remove
averageConsumption=(totalConsumption/kilometrage)*100;
averageConsumption=Number((averageConsumption).toFixed(2));













function data_function(){
    //averageConsumption=6.7;
    //kilometrage=879;
    //totalConsumption=65;
    //totalSpent=200;

    pieNumbers=[70, 10, 10, 5, 5];
    pieColors=['#C70039', '#44CD40', '#404FCD', '#EBD22F', '#EB55DF']
    for (i = 1; i < 5; i++) {
      if(pieNumbers[i]==0) pieColors[i]=null
    }

    //totalFuel=160;
    totalRegistration=0;
    totalServis=20;
    totalDamage=10;
    //totalOther=10;
   
}

const TabMonth = (props) => {

    data_function();

  
    return (
      <View style={styles.wholeTab}>
      <ScrollView contentContainerStyle={styles.wholeTabScroll}>
         <View style={styles.upperContainer}>
            <View style={styles.twoboxContainer}>
              <View style={styles.smallBox}>
                  <LinearGradient colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
                  style={styles.smallboxGradient}>
                      <AppText style={styles.boxsmallText}>Prosječna potrošnja</AppText>
                      <View style={styles.averageConsumptionContainer}>
                          <AppText style={styles.boxbigText}>{averageConsumption}</AppText>
                          <AppText style={styles.averageconsumptionText}>l/100km</AppText>
                      </View>
                  </LinearGradient>
              </View>
              <View style={styles.smallBox}>
                  <LinearGradient colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
                  style={styles.smallboxGradient}>
                      <AppText style={styles.boxsmallText}>Ukupno nasuto goriva</AppText>
                      <AppText style={styles.boxbigText}>{totalConsumption} l</AppText>
                  </LinearGradient>
              </View>
            </View>
          <View style={styles.twoboxContainer}>
              <View style={styles.smallBox}>
                  <LinearGradient colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
                  style={styles.smallboxGradient}>
                      <AppText style={styles.boxsmallText}>Ukupno pređeno</AppText>
                      <AppText style={styles.boxbigText}>{kilometrage} km</AppText>
                  </LinearGradient>
              </View>
              <View style={styles.smallBox}>
                  <LinearGradient colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
                  style={styles.smallboxGradient}>
                      <AppText style={styles.boxsmallText}>Potrošeno novca</AppText>
                      <AppText style={styles.boxbigText}>{totalSpent} KM</AppText>
                  </LinearGradient>
              </View>
            </View>
          </View>
         <View style={styles.pieContainer}>
             <AppText bold={true} style={styles.pieTitle}>Raspored ukupnih troškova</AppText>
             <View style={styles.piemainContainer}>
            <Pie
              radius={75}
              innerRadius={55}
              sections={[{
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
              }
              ]}
              dividerSize={1}
              strokeCap={'round'}
            />
            <View style={styles.pieDescription}>
                <View style={styles.pieItem}>
                    <View style={styles.firstsquareColor}></View>
                    <AppText> Gorivo</AppText>
                </View>
                <View style={styles.pieItem}>
                    <View style={styles.secondsquareColor}></View>
                    <AppText> Troškovi registracije</AppText>
                </View>
                <View style={styles.pieItem}>
                    <View style={styles.thirdsquareColor}></View>
                    <AppText> Servis i održavanje</AppText>
                </View>
                <View style={styles.pieItem}>
                    <View style={styles.fourthsquareColor}></View>
                    <AppText> Oštećenja</AppText>
                </View>
                <View style={styles.pieItem}>
                    <View style={styles.fifthsquareColor}/>
                    <AppText> Oprema i ostalo</AppText>
                </View>
            </View>
            </View>
          </View>

         <View style={styles.categoriesContainer}>
            <AppText bold='true' style={styles.categoriesTitle}>Pogledajmo malo bolje...</AppText>
            <View style={styles.twoboxContainerCategory}>
                <CategoryCard lightColor={Colors.fuel} darkColor={Colors.fuelAccent} iconName='gas-pump'
                categoryName='Gorivo' amount={totalFuel} classIcon={FontAwesome5Icon}/>
                <CategoryCard lightColor={Colors.insurance} darkColor={Colors.insuranceAccent} iconName='hands-helping'
                categoryName='Osiguranje' amount='300' classIcon={FontAwesome5Icon}/>
            </View>

            <View style={styles.twoboxContainerCategory}>
                <CategoryCard lightColor={Colors.registration} darkColor={Colors.registrationAccent} iconName='clipboard'
                categoryName='Registracija' amount='300' classIcon={EntypoIcon}/>
                <CategoryCard lightColor={Colors.maintainance} darkColor={Colors.maintainanceAccent} iconName='miscellaneous-services'
                categoryName='Servis' amount='300' classIcon={MaterialIcon}/>
            </View>

            <View style={styles.twoboxContainerCategory}>
                <CategoryCard lightColor={Colors.repair} darkColor={Colors.repairAccent} iconName='car-repair'
                categoryName='Popravke' amount='300' classIcon={MaterialIcon}/>
                <CategoryCard lightColor={Colors.crashes} darkColor={Colors.crashesAccent} iconName='close'
                categoryName='Oštećenja' amount='300' classIcon={FontAwesomeIcon}/>
            </View>

            <View style={styles.twoboxContainerCategory}>
                <CategoryCard lightColor={Colors.equipment} darkColor={Colors.equipmentAccent} iconName='shopping-cart'
                categoryName='Oprema' amount='300' classIcon={FeatherIcon}/>
                <CategoryCard lightColor={Colors.tickets} darkColor={Colors.ticketsAccent} iconName='mail'
                categoryName='Kazne' amount='300' classIcon={EntypoIcon}/>
            </View>

            <View style={styles.twoboxContainerCategory}>
                <CategoryCard lightColor={Colors.carWash} darkColor={Colors.carWashAccent} iconName='local-car-wash'
                categoryName='Pranje' amount='300' classIcon={MaterialIcon}/>
                <CategoryCard lightColor={Colors.other} darkColor={Colors.otherAccent} iconName='dots-horizontal'
                categoryName='Ostalo' amount={totalOther} classIcon={MaterialCommunityIcon}/>
            </View>
          </View>
      </ScrollView>
      </View>
    );

}

export default TabMonth;


const styles = StyleSheet.create({
  wholeTab: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: Constants.white
    },  
  wholeTabScroll: {
    minHeight: Constants.screenHeight* 1.7,
    flexGrow: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  upperContainer: {
    marginTop: 12,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  twoboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  smallBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.primaryDark,
    borderRadius: 15,
    height: 80,
    width: '47%',
    margin: 4
  },
  smallboxGradient: {
    flex: 1,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  averageConsumptionContainer: {
    flexDirection: 'row'
  },
  averageconsumptionText: {
    fontSize: 15,
    textAlignVertical: 'bottom',
    color: 'white'
  },
  boxsmallText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white'
  },
  boxbigText: {
      fontSize: 28,
      color: 'white'
  },
  pieContainer: {
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    height: 200,
    marginVertical: 20,
    padding: 10
  },
  pieTitle: {
    fontSize: 18,
    marginBottom: 8
  },
  piemainContainer: {
    flexDirection: 'row'
  },
  pieDescription: { 
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    marginLeft: 12
  },
  pieItem: {
    flexDirection: 'row'
  },
  firstsquareColor: {
    height: 16,
    width: 16,
    backgroundColor: '#C70039'
  },
  secondsquareColor: {
    height: 16,
    width: 16,
    backgroundColor: '#44CD40'
  },
  thirdsquareColor: {
    height: 16,
    width: 16,
    backgroundColor: '#404FCD'
  },
  fourthsquareColor: {
    height: 16,
    width: 16,
    backgroundColor: '#EBD22F'
  },
  fifthsquareColor: {
    height: 16,
    width: 16,
    backgroundColor: '#EB55DF'
  },
  categoriesTitle: {
    fontSize: 24,
    marginBottom: 5
  },
  categoryboxGradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 8
  },
  iconHolder: {
    backgroundColor: Constants.background,
    borderRadius: 10
  },
  categoryIcon: {
    fontSize: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  categoryboxbigText: {
    fontSize: 25,
    color: 'black'
  },
  categoryboxsmallText: {
    fontSize: 18,
    color: '#555555'
  },
  categoryHolder: {
    height: '100%',
    justifyContent: 'center',
    marginLeft: 3
  },
  categoriesContainer: {
    minHeight: 300,
    padding: 10
  },
  smallBoxCategory: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    height: 110,
    margin: 4,
    width: '47%'
  },
  twoboxContainerCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    margin: 2,
    padding: 0,
    width: '100%'
  }
});


