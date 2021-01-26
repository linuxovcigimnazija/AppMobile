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

const selectedType = 'carWash';

export default function CarWash({item, currency}) {
  return (
    <View style={styles.renderContainer}>
      <View
        // colors={[
        //   InputTypeColors[selectedType],
        //   InputTypeColors[selectedType + 'Accent'],
        // ]}
        style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcon
            name="car-wash"
            size={Constants.height * 0.05}
            color={InputTypeColors[selectedType + 'Accent']}
          />
        </View>
        <View style={styles.textContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <AppText color={Constants.primary} size={20}>
              Pranje vozila:{' '}
            </AppText>
            <View style={{flex: 1, alignItems: 'center'}}>
              <AppText bold color={Constants.lightBlue} size={22}>
                {item.price + ' ' + currency}
              </AppText>
            </View>
          </View>
        </View>
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
    width: '100%',
    marginEnd: '2%',
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: InputTypeColors[selectedType],
    borderColor: Constants.lightBlue,
    borderWidth: 2.5,

    elevation: 2,
    padding: 13,
  },
  iconContainer: {
    backgroundColor: Constants.background,
    borderRadius: 10,
    aspectRatio: 1,
    height: Constants.height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginStart: 10,
    borderRadius: 10,
    flex: 1,
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
