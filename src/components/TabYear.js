import React, { Component, useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import AppText from './AppText';
import { themes } from '../constants/colors';
import Pie from 'react-native-pie';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../constants/Constants';
import App from '../../App';import {
    MaterialCommunityIcon,
    MaterialIcon,
    FontAwesome5Icon,
    FontAwesomeIcon,
    EntypoIcon,
    FeatherIcon,
} from '../utils/Functions'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import CategoryCard from './CategoryCard';
import Colors from '../constants/InputTypeColors';

var yearaverageConsumption, yearkilometrage, yeartotalConsumption, yeartotalSpent;
var yearpieFuel, yearpieRegistration, yearpieServis, yearpieDamage, yearpieOther;
var yeartotalFuel, yeartotalRegistration, yeartotalServis, yeartotalDamage, yeartotalOther;

function data_function(){
    yearaverageConsumption=6.1;
    yearkilometrage=10534;
    yeartotalConsumption=641;
    yeartotalSpent=1500;

    pieNumbers=[60, 15, 10, 5, 10];
    pieColors=['#C70039', '#44CD40', '#404FCD', '#EBD22F', '#EB55DF']
    for (i = 1; i < 5; i++) {
      if(pieNumbers[i]==0) pieColors[i]=pieColors[i-1]
    }

    yeartotalFuel=900;
    yeartotalRegistration=150;
    yeartotalServis=225;
    yeartotalDamage=150;
    yeartotalOther=75;
   
}

const TabYear = (props) => {

    data_function();

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            //color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            //strokeWidth: 2 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      };

      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        //useShadowColorFromDataset: false // optional
      };

  
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
                          <AppText style={styles.boxbigText}>{yearaverageConsumption}</AppText>
                          <AppText style={styles.averageconsumptionText}>l/100km</AppText>
                      </View>
                  </LinearGradient>
              </View>
              <View style={styles.smallBox}>
                  <LinearGradient colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
                  style={styles.smallboxGradient}>
                      <AppText style={styles.boxsmallText}>Ukupno nasuto goriva</AppText>
                      <AppText style={styles.boxbigText}>{yeartotalConsumption} l</AppText>
                  </LinearGradient>
              </View>
            </View>
          <View style={styles.twoboxContainer}>
              <View style={styles.smallBox}>
                  <LinearGradient colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
                  style={styles.smallboxGradient}>
                      <AppText style={styles.boxsmallText}>Ukupno pređeno</AppText>
                      <AppText style={styles.boxbigText}>{yearkilometrage} km</AppText>
                  </LinearGradient>
              </View>
              <View style={styles.smallBox}>
                  <LinearGradient colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
                  style={styles.smallboxGradient}>
                      <AppText style={styles.boxsmallText}>Potrošeno novca</AppText>
                      <AppText style={styles.boxbigText}>{yeartotalSpent} KM</AppText>
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
                categoryName='Gorivo' amount='300' classIcon={FontAwesome5Icon}/>
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
                categoryName='Ostalo' amount='300' classIcon={MaterialCommunityIcon}/>
            </View>
          </View>
          <View>
  <AppText style={styles.linechartText}>Pregled ukupne potrošnje po mjesecima</AppText>
  <LineChart
    data={{
      labels: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
      datasets: [
        {
          data: [
            100, 200, 300, 400, 300, 200, 100, 200, 300, 400, 300, 200
          ]
        }
      ]
    }}
    width={Constants.width*0.9} // from react-native
    height={Constants.height*0.3}
    verticalLabelRotation={0}
    yAxisLabel=""
    yAxisSuffix="KM"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundGradientFrom: Constants.primaryDark,
      backgroundGradientTo: Constants.primary,
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "4",
        strokeWidth: "2",
        stroke: Constants.primaryLight
      },
      propsForVerticalLabels: {
        fontSize: 10,
      },
      propsForHorizontalLabels: {
          fontSize: 11
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 1,
    }}
    
  />
            </View>

            <View>
  <AppText style={styles.linechartText}>Pregled potrošnje goriva po mjesecima</AppText>
  <LineChart
    data={{
      labels: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
      datasets: [
        {
          data: [
            80, 160, 200, 250, 220, 200, 190, 250, 300, 320, 300, 210
          ]
        }
      ]
    }}
    width={Constants.width*0.9} // from react-native
    height={Constants.height*0.3}
    verticalLabelRotation={0}
    yAxisLabel=""
    yAxisSuffix="KM"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundGradientFrom: Constants.primaryDark,
      backgroundGradientTo: Constants.primary,
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "4",
        strokeWidth: "2",
        stroke: Constants.primaryLight
      },
      propsForVerticalLabels: {
        fontSize: 10,
      },
      propsForHorizontalLabels: {
          fontSize: 11
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 1,
    }}
    
  />
            </View>
      
      </ScrollView>
      </View>
    );

}

export default TabYear;


const styles = StyleSheet.create({
    wholeTab: {
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      backgroundColor: Constants.white
      },  
    wholeTabScroll: {
      minHeight: Constants.screenHeight* 2.35,
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
    },
    linechartText: {
        marginLeft: Constants.width*0.05,
        fontSize: 18
    }
  });
  


