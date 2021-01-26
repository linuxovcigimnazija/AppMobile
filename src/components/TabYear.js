import React, { Component, useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native';
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
import { min } from 'react-native-reanimated';


function calcPercent(item, total){
  return ((item/total)*100)
}


var dateObj = new Date();
var month = dateObj.getUTCMonth(); 

labels= ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"]

firstArray=labels.splice(month, 12)
secondArray=labels.splice(0, month)
yearLabels=firstArray.concat(secondArray)



const TabYear = (props) => {
  var start=(Date.now()/1000)-31622400
  var step=2668760
  var totalFuel=0
  var averageConsumption, kilometrage=0, totalConsumption=0, totalSpent=0;
  var totalRegistration=0, totalRepair=0, totalCrashes=0, totalOther=0, totalServis=0, totalDamage=0;
  var totalMaintenance=0, totalTickets=0, totalInsurance=0, totalEquipment=0, totalCarwash=0;
   
  var totalSpent=0
  var minKM=props.data.data.fuel[0].km, count=0;
  
    for(var item in props.data.data.fuel){
      totalFuel=0
      if((props.data.data.fuel[item].date)>((Date.now()-31622400000)/1000)){
        if(props.data.data.fuel[item].km<minKM) {
          minKM=props.data.data.fuel[item].km
        }
          totalFuel+=props.data.data.fuel[item].price
          totalSpent+=totalFuel
          totalConsumption+=props.data.data.fuel[item].volume
          kilometrage+=props.data.data.fuel[item].km
          count+=1
        }
               
    }
    kilometrage-=(count*minKM)
    averageConsumption=Number(((totalConsumption/kilometrage)*100).toFixed(1))

    for(var item in props.data.data.maintainance){
      if((props.data.data.maintainance[item].date)>((Date.now()/1000)-31622400)){
          totalMaintenance+=props.data.data.maintainance[item].price
          totalSpent+=totalMaintenance
        }
    }

    for(var item in props.data.data.registration){
      if((props.data.data.registration[item].date)>((Date.now()/1000)-31622400)){
          totalRegistration+=props.data.data.registration[item].price
          totalSpent+=totalRegistration
        }
    }

    for(var item in props.data.data.insurance){
      if((props.data.data.insurance[item].date)>((Date.now()/1000)-31622400)){
          totalInsurance+=props.data.data.insurance[item].price
          totalSpent+=totalInsurance
        }
    }

    for(var item in props.data.data.equipment){
      if((props.data.data.equipment[item].date)>((Date.now()/1000)-31622400)){
          totalEquipment+=props.data.data.equipment[item].price
          totalSpent+=totalEquipment
        }
    }

    for(var item in props.data.data.crashes){
      if((props.data.data.crashes[item].date)>((Date.now()/1000)-31622400)){
          totalCrashes+=props.data.data.crashes[item].price
          totalSpent+=totalCrashes
        }
    }

    for(var item in props.data.data.carWash){
      if((props.data.data.carWash[item].date)>((Date.now()/1000)-31622400)){
          totalCarwash+=props.data.data.carWash[item].price
          totalSpent+=totalCarwash
        }
    }

    for(var item in props.data.data.repair){
      if((props.data.data.repair[item].date)>((Date.now()/1000)-31622400)){
          totalRepair+=props.data.data.repair[item].price
          totalSpent+=totalRepair
        }
    }

    for(var item in props.data.data.tickets){
      if((props.data.data.tickets[item].date)>((Date.now()/1000)-31622400)){
          totalTickets+=props.data.data.tickets[item].price
          totalSpent+=totalTickets
        }
    }

    for(var item in props.data.data.other){
      if((props.data.data.other[item].date)>((Date.now()/1000)-31622400)){
          totalOther+=props.data.data.other[item].price
          totalSpent+=totalOther
        }
    }

    var pieFuel=totalFuel;
    var pieRegistration=totalRegistration+totalInsurance;
    var pieServis=totalServis+totalRepair;
    var pieDamage=totalCrashes;
    var pieOther=totalOther+totalCarwash+totalEquipment+totalTickets;

  
    pieNumbers=[calcPercent(pieFuel, totalSpent), calcPercent(pieRegistration, totalSpent), calcPercent(pieServis, totalSpent), calcPercent(pieDamage, totalSpent), 
    calcPercent(pieOther, totalSpent)];
    var pieColors=[InputTypeColors.fuel, InputTypeColors.registration, InputTypeColors.maintainance, InputTypeColors.crashes, InputTypeColors.equipment]
    for (var i = 1; i < 5; i++) {
      if(pieNumbers[i]==0) {
        pieColors[i]=null
        pieNumbers[0]-=0.5
      }
    }

      var chartArrayFuel=[];
      var sum=0;
      for(var i=start; i<(Date.now()/1000); i+=step){
      for(var item in props.data.data.fuel){
        if((((props.data.data.fuel[item].date)>start)) && ((props.data.data.fuel[item].date)<(start+step))){
          sum+=props.data.data.fuel[item].price;
      }
      chartArrayFuel.push(sum);
      }}

      var chartArrayAll=[];
      sum=0;
      for(var i=start; i<(Date.now()/1000); i+=step){
        for(var item in props.data.data.fuel){
          if((((props.data.data.fuel[item].date)>start)) && ((props.data.data.fuel[item].date)<(start+step))){
            sum+=props.data.data.fuel[item].price;
        }}
        for(var item in props.data.data.maintainance){
          if((((props.data.data.maintainance[item].date)>start)) && ((props.data.data.maintainance[item].date)<(start+step))){
            sum+=props.data.data.maintainance[item].price;
        }}
        for(var item in props.data.data.registration){
          if((((props.data.data.registration[item].date)>start)) && ((props.data.data.registration[item].date)<(start+step))){
            sum+=props.data.data.registration[item].price;
        }}
        for(var item in props.data.data.insurance){
          if((((props.data.data.insurance[item].date)>start)) && ((props.data.data.insurance[item].date)<(start+step))){
            sum+=props.data.data.insurance[item].price;
        }}
        for(var item in props.data.data.equipment){
          if((((props.data.data.equipment[item].date)>start)) && ((props.data.data.equipment[item].date)<(start+step))){
            sum+=props.data.data.equipment[item].price;
        }}
        for(var item in props.data.data.crashes){
          if((((props.data.data.crashes[item].date)>start)) && ((props.data.data.crashes[item].date)<(start+step))){
            sum+=props.data.data.crashes[item].price;
        }}
        for(var item in props.data.data.carWash){
          if((((props.data.data.carWash[item].date)>start)) && ((props.data.data.carWash[item].date)<(start+step))){
            sum+=props.data.data.carWash[item].price;
        }}
        for(var item in props.data.data.other){
          if((((props.data.data.other[item].date)>start)) && ((props.data.data.other[item].date)<(start+step))){
            sum+=props.data.data.other[item].price;
        }}
        chartArrayAll.push(sum);
        }
      
      
      

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
                      <AppText style={styles.boxbigText}>{totalSpent} {props.currency}</AppText>
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
                <CategoryCard currency={props.currency} lightColor={Colors.fuel} darkColor={Colors.fuelAccent} iconName='gas-pump'
                categoryName='Gorivo' amount={totalFuel} classIcon={FontAwesome5Icon}/>
                <CategoryCard currency={props.currency} lightColor={Colors.insurance} darkColor={Colors.insuranceAccent} iconName='hands-helping'
                categoryName='Osiguranje' amount={totalInsurance} classIcon={FontAwesome5Icon}/>
            </View>

            <View style={styles.twoboxContainerCategory}>
                <CategoryCard currency={props.currency} lightColor={Colors.registration} darkColor={Colors.registrationAccent} iconName='clipboard'
                categoryName='Registracija' amount={totalRegistration} classIcon={EntypoIcon}/>
                <CategoryCard currency={props.currency} lightColor={Colors.maintainance} darkColor={Colors.maintainanceAccent} iconName='miscellaneous-services'
                categoryName='Servis' amount={totalMaintenance} classIcon={MaterialIcon}/>
            </View>

            <View style={styles.twoboxContainerCategory}>
                <CategoryCard currency={props.currency} lightColor={Colors.repair} darkColor={Colors.repairAccent} iconName='car-repair'
                categoryName='Popravke' amount={totalRepair} classIcon={MaterialIcon}/>
                <CategoryCard currency={props.currency} lightColor={Colors.crashes} darkColor={Colors.crashesAccent} iconName='close'
                categoryName='Oštećenja' amount={totalCrashes} classIcon={FontAwesomeIcon}/>
            </View>

            <View style={styles.twoboxContainerCategory}>
                <CategoryCard currency={props.currency} lightColor={Colors.equipment} darkColor={Colors.equipmentAccent} iconName='shopping-cart'
                categoryName='Oprema' amount={totalEquipment} classIcon={FeatherIcon}/>
                <CategoryCard currency={props.currency} lightColor={Colors.tickets} darkColor={Colors.ticketsAccent} iconName='mail'
                categoryName='Kazne' amount={totalTickets} classIcon={EntypoIcon}/>
            </View>

            <View style={styles.twoboxContainerCategory}>
                <CategoryCard currency={props.currency} lightColor={Colors.carWash} darkColor={Colors.carWashAccent} iconName='local-car-wash'
                categoryName='Pranje' amount={totalCarwash} classIcon={MaterialIcon}/>
                <CategoryCard currency={props.currency} lightColor={Colors.other} darkColor={Colors.otherAccent} iconName='dots-horizontal'
                categoryName='Ostalo' amount={totalOther} classIcon={MaterialCommunityIcon}/>
            </View>
          </View>
          <View>
  <AppText style={styles.linechartText}>Pregled ukupne potrošnje po mjesecima</AppText>
  <LineChart
    data={{
      labels: yearLabels,
      datasets: [
        {
          data: chartArrayAll
        }
      ]
    }}
    width={Constants.width*0.9} // from react-native
    height={Constants.height*0.3}
    verticalLabelRotation={0}
    yAxisLabel=""
    yAxisSuffix={props.currency}
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
      labels: yearLabels,
      datasets: [
        {
          data:  chartArrayFuel
        }
      ]
    }}
    width={Constants.width*0.9} // from react-native
    height={Constants.height*0.3}
    verticalLabelRotation={0}
    yAxisLabel=""
    yAxisSuffix={props.currency}
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
  

  export default TabYear;
