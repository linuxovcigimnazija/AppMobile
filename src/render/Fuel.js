import React from 'react';
import {View, StyleSheet} from 'react-native';
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

const selectedType = 'fuel';

export default function Fuel({item, currency}) {
  return (
    <View style={styles.renderContainer}>
      <LinearGradient
        colors={[
          InputTypeColors[selectedType],
          InputTypeColors[selectedType + 'Accent'],
        ]}
        style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome5Icon
            name="gas-pump"
            size={Constants.height * 0.07}
            color={InputTypeColors[selectedType + 'Accent']}
          />
        </View>
        <View style={styles.textContainer}>
          <AppText bold color={Constants.white} size={16}>
            Uneseno gorivo:
          </AppText>

          <AppText bold color={Constants.white} size={17}>
            {item.price + ' ' + currency}
          </AppText>

          <View
            style={[
              styles.discount,
              item.discount
                ? {}
                : {backgroundColor: InputTypeColors[selectedType]},
            ]}>
            <AppText
              style={{textAlign: 'center'}}
              size={12}
              bold
              color={Constants.white}>
              {item.discount
                ? item.pricePerLiter + ' ' + currency + '/l' + ' Popust'
                : item.pricePerLiter + ' ' + currency + '/l'}
            </AppText>
          </View>

          <AppText color={Constants.white} size={16}>
            {item.volume} l
          </AppText>
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
    width: '80%',
    maxHeight: 100,
    marginEnd: '2%',
    flexDirection: 'row',
    height: Constants.height * 0.13,
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
    flex: 1,
  },
  discount: {
    width: '50%',
    backgroundColor: Constants.red,
    borderRadius: 10,
    padding: 2,
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
