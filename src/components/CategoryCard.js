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
import {
  MaterialCommunityIcon,
  MaterialIcon,
  FontAwesome5Icon,
  FontAwesomeIcon,
  EntypoIcon,
  FeatherIcon,
} from '../utils/Functions';
import IconFA from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../constants/Constants';
import App from '../../App';
import Colors from '../constants/InputTypeColors';

const CategoryCard = (props) => {
  const Icon = props.classIcon;

  return (
    <View style={styles.smallBoxCategory}>
      <LinearGradient
        colors={[props.lightColor, props.darkColor]}
        style={styles.categoryboxGradient}>
        <View style={styles.categoryHolder}>
          <AppText bold="true" style={styles.categoryboxbigText}>
            {props.categoryName}
          </AppText>
          <View
            style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.iconHolder}>
              <Icon
                name={props.iconName}
                color={props.darkColor}
                style={styles.categoryIcon}
              />
            </View>
            <AppText style={styles.categoryboxsmallText}>
              {props.amount + ' ' + props.currency}
            </AppText>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};
export default CategoryCard;

const styles = StyleSheet.create({
  categoryboxGradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: 15,
    paddingHorizontal: 6,
  },
  iconHolder: {
    backgroundColor: Constants.background,
    borderRadius: 10,
    marginRight: 5,
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  categoryboxbigText: {
    fontSize: 20,
    color: Constants.white,
  },
  categoryboxsmallText: {
    fontSize: 18,
    color: Constants.white,
  },
  categoryHolder: {
    paddingVertical: '10%',
    height: '100%',
    justifyContent: 'space-between',
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
    backgroundColor: Constants.background,
    borderRadius: 15,
    height: 110,
    margin: 4,
    width: '47%',
  },
});
