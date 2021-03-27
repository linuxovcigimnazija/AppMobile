import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AppText from './AppText';
import {themes} from '../constants/colors';
import Pie from 'react-native-pie';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../constants/Constants';
import InputTypeColors from '../constants/InputTypeColors';
import {
  MaterialCommunityIcon,
  MaterialIcon,
  FontAwesome5Icon,
  FontAwesomeIcon,
  EntypoIcon,
  FeatherIcon,
} from '../utils/Functions';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import CategoryCard from './CategoryCard';
import Colors from '../constants/InputTypeColors';

function calcPercent(item, total) {
  return (item / total) * 100;
}

var dateObj = new Date();
var year = dateObj.getUTCFullYear();
var month = dateObj.getUTCMonth();

var q = [];
var years = [];
var quarterLabels = [];

if (month < 3) {
  q = [1, 2, 3, 4];
  years = [year - 3, year - 2, year - 1];
} else if (month < 6) {
  q = [2, 3, 4, 1];
  years = [year - 2, year - 1, year];
} else if (month < 9) {
  q = [3, 4, 1, 2];
  years = [year - 2, year - 1, year];
} else {
  q = [4, 1, 2, 3];
  years = [year - 2, year - 1, year];
}

for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 4; j++) {
    quarterLabels.push(years[i] + 'Q' + q[j]);
  }
}

pieNumbers = [55, 10, 15, 10, 10];
pieColors = ['#C70039', '#44CD40', '#404FCD', '#EBD22F', '#EB55DF'];
for (i = 1; i < 5; i++) {
  if (pieNumbers[i] == 0) pieColors[i] = pieColors[i - 1];
}

const TabAll = (props) => {
  var start = Date.now() - 94867200000;
  var step = 8006280000;

  var totalFuel = 0;
  var averageConsumption = 0,
    kilometrage = 0,
    totalConsumption = 0,
    totalSpent = 0;
  var totalRegistration = 0,
    totalRepair = 0,
    totalCrashes = 0,
    totalOther = 0,
    totalServis = 0,
    totalDamage = 0;
  var totalMaintainance = 0,
    totalTickets = 0,
    totalInsurance = 0,
    totalEquipment = 0,
    totalCarwash = 0;

  var totalSpent = 0;
  var minKM = 100000000,
    count = 0;

  for (var item in props.data.data.fuel) {
    if (props.data.data.fuel[item].mileage < minKM) {
      minKM = props.data.data.fuel[item].mileage;
    }
    totalFuel += props.data.data.fuel[item].price;
    totalConsumption += props.data.data.fuel[item].volume;
    kilometrage += props.data.data.fuel[item].mileage;
    count += 1;
  }
  if (count == 0) {
    count = 1;
    kilometrage = 0;
    averageConsumption = 0;
  } else {
    kilometrage -= count * minKM;
    averageConsumption = Number(
      ((totalConsumption / kilometrage) * 100).toFixed(1),
    );
  }
  if (isNaN(kilometrage)) {
    kilometrage = 0;
  }

  if (kilometrage == 0) {
    averageConsumption = 0;
  }

  if (isNaN(averageConsumption)) {
    averageConsumption = 0;
  }

  totalSpent += totalFuel;

  for (var item in props.data.data.maintainance) {
    totalMaintainance += props.data.data.maintainance[item].price;
  }
  totalSpent += totalMaintainance;

  for (var item in props.data.data.registration) {
    totalRegistration += props.data.data.registration[item].price;
  }
  totalSpent += totalRegistration;

  for (var item in props.data.data.insurance) {
    totalInsurance += props.data.data.insurance[item].price;
  }
  totalSpent += totalInsurance;

  for (var item in props.data.data.equipment) {
    totalEquipment += props.data.data.equipment[item].price;
  }
  totalSpent += totalEquipment;

  for (var item in props.data.data.crashes) {
    totalCrashes += props.data.data.crashes[item].price;
  }
  totalSpent += totalCrashes;

  for (var item in props.data.data.carWash) {
    totalCarwash += props.data.data.carWash[item].price;
  }
  totalSpent += totalCarwash;

  for (var item in props.data.data.tickets) {
    totalTickets += props.data.data.tickets[item].price;
  }
  totalSpent += totalTickets;

  for (var item in props.data.data.repair) {
    totalRepair += props.data.data.repair[item].price;
  }
  totalSpent += totalRepair;

  for (var item in props.data.data.other) {
    totalOther += props.data.data.other[item].price;
  }
  totalSpent += totalOther;

  var pieFuel = totalFuel;
  var pieRegistration = totalRegistration + totalInsurance;
  var pieServis = totalServis + totalRepair;
  var pieDamage = totalCrashes;
  var pieOther = totalOther + totalCarwash + totalEquipment + totalTickets;

  pieNumbers = [
    calcPercent(pieFuel, totalSpent),
    calcPercent(pieRegistration, totalSpent),
    calcPercent(pieServis, totalSpent),
    calcPercent(pieDamage, totalSpent),
    calcPercent(pieOther, totalSpent),
  ];
  var pieColors = [
    InputTypeColors.fuel,
    InputTypeColors.registration,
    InputTypeColors.maintainance,
    InputTypeColors.crashes,
    InputTypeColors.equipment,
  ];

  var chartArrayFuel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var counting = 0;
  var sum = 0;
  for (var i = start; i < Date.now(); i += step) {
    for (var item in props.data.data.fuel) {
      if (
        props.data.data.fuel[item].date > start &&
        props.data.data.fuel[item].date < start + step
      ) {
        sum += props.data.data.fuel[item].price;
      }
      if (isNaN(sum) != true) {
        chartArrayFuel[counting] = sum;
        counting += 1;
      }
    }
  }

  var chartArrayAll = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var counting = 0;
  sum = 0;
  for (var i = start; i < Date.now(); i += step) {
    for (var item in props.data.data.fuel) {
      if (
        props.data.data.fuel[item].date > start &&
        props.data.data.fuel[item].date < start + step
      ) {
        sum += props.data.data.fuel[item].price;
      }
    }
    for (var item in props.data.data.maintainance) {
      if (
        props.data.data.maintainance[item].date > start &&
        props.data.data.maintainance[item].date < start + step
      ) {
        sum += props.data.data.maintainance[item].price;
      }
    }
    for (var item in props.data.data.registration) {
      if (
        props.data.data.registration[item].date > start &&
        props.data.data.registration[item].date < start + step
      ) {
        sum += props.data.data.registration[item].price;
      }
    }
    for (var item in props.data.data.insurance) {
      if (
        props.data.data.insurance[item].date > start &&
        props.data.data.insurance[item].date < start + step
      ) {
        sum += props.data.data.insurance[item].price;
      }
    }
    for (var item in props.data.data.equipment) {
      if (
        props.data.data.equipment[item].date > start &&
        props.data.data.equipment[item].date < start + step
      ) {
        sum += props.data.data.equipment[item].price;
      }
    }
    for (var item in props.data.data.crashes) {
      if (
        props.data.data.crashes[item].date > start &&
        props.data.data.crashes[item].date < start + step
      ) {
        sum += props.data.data.crashes[item].price;
      }
    }
    for (var item in props.data.data.carWash) {
      if (
        props.data.data.carWash[item].date > start &&
        props.data.data.carWash[item].date < start + step
      ) {
        sum += props.data.data.carWash[item].price;
      }
    }
    for (var item in props.data.data.other) {
      if (
        props.data.data.other[item].date > start &&
        props.data.data.other[item].date < start + step
      ) {
        sum += props.data.data.other[item].price;
      }
    }
    if (isNaN(sum) != true) {
      chartArrayFuel[counting] = sum;
      counting += 1;
    }
  }

  for (var i = 0; i < 5; i += 1) {
    if (isNaN(pieNumbers[i])) pieNumbers[i] = 0;
  }

  return (
    <View style={styles.wholeTab}>
      <ScrollView contentContainerStyle={styles.wholeTabScroll}>
        <View style={styles.upperContainer}>
          <View style={styles.twoboxContainer}>
            <View style={styles.smallBox}>
              <LinearGradient
                colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
                style={styles.smallboxGradient}>
                <AppText style={styles.boxsmallText}>
                  Prosječna potrošnja
                </AppText>
                <View style={styles.averageConsumptionContainer}>
                  <AppText>
                    <AppText style={styles.boxbigText}>
                      {averageConsumption}
                    </AppText>
                    <AppText style={styles.averageconsumptionText}>
                      l/100km
                    </AppText>
                  </AppText>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.smallBox}>
              <LinearGradient
                colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
                style={styles.smallboxGradient}>
                <AppText style={styles.boxsmallText}>
                  Ukupno nasuto goriva
                </AppText>
                <AppText style={styles.boxbigText}>
                  {totalConsumption} l
                </AppText>
              </LinearGradient>
            </View>
          </View>
        </View>
        <View style={styles.twoboxContainer}>
          <View style={styles.smallBox}>
            <LinearGradient
              colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
              style={styles.smallboxGradient}>
              <AppText style={styles.boxsmallText}>Ukupno pređeno</AppText>
              <AppText style={styles.boxbigText}>{kilometrage} km</AppText>
            </LinearGradient>
          </View>
          <View style={styles.smallBox}>
            <LinearGradient
              colors={[Constants.boxcolorLight, Constants.boxcolorDark]}
              style={styles.smallboxGradient}>
              <AppText style={styles.boxsmallText}>Potrošeno novca</AppText>
              <AppText style={styles.boxbigText}>
                {totalSpent} {props.currency}
              </AppText>
            </LinearGradient>
          </View>
        </View>
        <View style={styles.bigBox}>
          <AppText color={Constants.white} size={24} bold>
            Raspodjela troškova
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
                  style={[styles.dot, {backgroundColor: InputTypeColors.fuel}]}
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
                <AppText color={Constants.white}>Troškovi registracije</AppText>
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
                <AppText color={Constants.white}>Servis i održavanje</AppText>
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
        <View style={styles.categoriesContainer}>
          <AppText bold style={[styles.categoriesTitle, {marginTop: 30}]}>
            Pogledajmo malo bolje...
          </AppText>
          <View style={styles.twoboxContainerCategory}>
            <CategoryCard
              currency={props.currency}
              lightColor={Colors.fuel}
              darkColor={Colors.fuelAccent}
              iconName="gas-pump"
              categoryName="Gorivo"
              amount={totalFuel}
              classIcon={FontAwesome5Icon}
            />
            <CategoryCard
              currency={props.currency}
              lightColor={Colors.insurance}
              darkColor={Colors.insuranceAccent}
              iconName="hands-helping"
              categoryName="Osiguranje"
              amount={totalInsurance}
              classIcon={FontAwesome5Icon}
            />
          </View>

          <View style={styles.twoboxContainerCategory}>
            <CategoryCard
              currency={props.currency}
              lightColor={Colors.registration}
              darkColor={Colors.registrationAccent}
              iconName="clipboard"
              categoryName="Registracija"
              amount={totalRegistration}
              classIcon={EntypoIcon}
            />
            <CategoryCard
              currency={props.currency}
              lightColor={Colors.maintainance}
              darkColor={Colors.maintainanceAccent}
              iconName="miscellaneous-services"
              categoryName="Servis"
              amount={totalMaintainance}
              classIcon={MaterialIcon}
            />
          </View>

          <View style={styles.twoboxContainerCategory}>
            <CategoryCard
              currency={props.currency}
              lightColor={Colors.repair}
              darkColor={Colors.repairAccent}
              iconName="car-repair"
              categoryName="Popravke"
              amount={totalRepair}
              classIcon={MaterialIcon}
            />
            <CategoryCard
              currency={props.currency}
              lightColor={Colors.crashes}
              darkColor={Colors.crashesAccent}
              iconName="close"
              categoryName="Oštećenja"
              amount={totalDamage}
              classIcon={FontAwesomeIcon}
            />
          </View>

          <View style={styles.twoboxContainerCategory}>
            <CategoryCard
              currency={props.currency}
              lightColor={Colors.equipment}
              darkColor={Colors.equipmentAccent}
              iconName="shopping-cart"
              categoryName="Oprema"
              amount={totalEquipment}
              classIcon={FeatherIcon}
            />
            <CategoryCard
              currency={props.currency}
              lightColor={Colors.tickets}
              darkColor={Colors.ticketsAccent}
              iconName="mail"
              categoryName="Kazne"
              amount={totalTickets}
              classIcon={EntypoIcon}
            />
          </View>

          <View style={styles.twoboxContainerCategory}>
            <CategoryCard
              currency={props.currency}
              lightColor={Colors.carWashAccent}
              darkColor={Colors.carWashAccent}
              iconName="local-car-wash"
              categoryName="Pranje"
              amount={totalCarwash}
              classIcon={MaterialIcon}
            />
            <CategoryCard
              currency={props.currency}
              lightColor={Colors.other}
              darkColor={Colors.otherAccent}
              iconName="dots-horizontal"
              categoryName="Ostalo"
              amount={totalOther}
              classIcon={MaterialCommunityIcon}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TabAll;

const styles = StyleSheet.create({
  wholeTab: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: Constants.background,
  },
  wholeTabScroll: {
    flexGrow: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingBottom: Constants.height * 0.3,
  },
  upperContainer: {
    marginTop: 12,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  twoboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  smallBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.primaryDark,
    borderRadius: 15,
    width: '49%',
    marginVertical: 4,
  },
  smallboxGradient: {
    flex: 1,
    paddingVertical: 25,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  averageConsumptionContainer: {
    flexDirection: 'row',
  },
  averageconsumptionText: {
    fontSize: 18,
    textAlignVertical: 'bottom',
    color: Constants.white,
  },
  boxsmallText: {
    fontSize: 16,
    textAlign: 'center',
    color: Constants.white,
  },
  boxbigText: {
    fontSize: 28,
    color: Constants.white,
    textAlign: 'center',
  },
  pieTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  piemainContainer: {
    flexDirection: 'row',
  },
  pieDescription: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    marginLeft: 12,
  },
  pieItem: {
    flexDirection: 'row',
  },
  firstsquareColor: {
    height: 16,
    width: 16,
    backgroundColor: '#C70039',
  },
  secondsquareColor: {
    height: 16,
    width: 16,
    backgroundColor: '#44CD40',
  },
  thirdsquareColor: {
    height: 16,
    width: 16,
    backgroundColor: '#404FCD',
  },
  fourthsquareColor: {
    height: 16,
    width: 16,
    backgroundColor: '#EBD22F',
  },
  fifthsquareColor: {
    height: 16,
    width: 16,
    backgroundColor: '#EB55DF',
  },
  categoriesTitle: {
    fontSize: 24,
    marginHorizontal: 20,
    marginBottom: 5,
    color: Constants.primaryDark,
  },
  categoryboxGradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 8,
  },
  iconHolder: {
    backgroundColor: Constants.background,
    borderRadius: 10,
  },
  categoryIcon: {
    fontSize: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  categoryboxbigText: {
    fontSize: 25,
    color: 'black',
  },
  categoryboxsmallText: {
    fontSize: 18,
    color: '#555555',
  },
  categoryHolder: {
    height: '100%',
    justifyContent: 'center',
    marginLeft: 3,
  },
  categoriesContainer: {
    minHeight: 300,
    padding: 10,
  },
  smallBoxCategory: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Constants.white,
    borderRadius: 15,
    height: 110,
    margin: 4,
    width: '47%',
  },
  twoboxContainerCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },
  linechartText: {
    marginLeft: 30,
    fontSize: 18,
  },

  bigBox: {
    backgroundColor: Constants.primaryDark,
    paddingHorizontal: 20,
    marginHorizontal: 20,
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
