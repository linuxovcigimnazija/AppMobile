import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AppText from '../components/AppText';
import Constants from '../constants/Constants';
import {
  MaterialCommunityIcon,
  MaterialIcon,
  FeatherIcon,
  FontAwesome5Icon,
  FontAwesomeIcon,
  EntypoIcon,
  unixToString,
} from '../utils/Functions';
import InputTypeColors from '../constants/InputTypeColors';
import LinearGradient from 'react-native-linear-gradient';

const selectedType = 'maintainance';

export default function Maintainance({item, currency}) {
  return (
    <View style={styles.renderContainer}>
      <LinearGradient
        colors={[
          InputTypeColors[selectedType],
          InputTypeColors[selectedType + 'Accent'],
        ]}
        style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcon
            name="miscellaneous-services"
            size={Constants.height * 0.07}
            color={InputTypeColors[selectedType + 'Accent']}
          />
        </View>
        <View style={styles.textContainer}>
          <AppText bold color={Constants.white} size={14}>
            Servis:{'\n'}
            <AppText size={16} bold color={Constants.white}>
              {item.price + ' ' + currency}
            </AppText>
          </AppText>

          <Text>
            <AppText color={Constants.white} size={13}>
              Sljedeći za:{'\n'}
            </AppText>
            <AppText color={Constants.white} size={13}>
              {item.reminder}km
            </AppText>
          </Text>
        </View>

        <View
          style={[
            styles.textContainer,
            {
              flex: 1,
              marginStart: 0,
            },
          ]}>
          <View
            style={[
              styles.type,
              {backgroundColor: InputTypeColors[selectedType]},
            ]}>
            <AppText
              style={{textAlign: 'center'}}
              size={14}
              color={Constants.white}>
              {item.big ? 'Veliki Servis' : 'Mali Servis'}
            </AppText>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.dateContainer}>
        <AppText
          style={{textAlign: 'left'}}
          color={Constants.gray}
          bold
          size={14}>
          {unixToString(item.date)}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  renderContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    marginEnd: '2%',
    flexDirection: 'row',
    height: Constants.height * 0.13,
    width: '80%',
    maxHeight: 100,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: InputTypeColors[selectedType],
    elevation: 2,
    padding: 13,
  },
  iconContainer: {
    backgroundColor: Constants.background,
    borderRadius: 10,
    aspectRatio: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginStart: 10,
    borderRadius: 10,
    justifyContent: 'space-evenly',
  },
  type: {
    backgroundColor: Constants.red,
    borderRadius: 10,
    padding: 5,
    height: Constants.height > 800 ? '65%' : '80%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
