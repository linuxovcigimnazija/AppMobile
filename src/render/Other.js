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

const selectedType = 'other';

export default function Other({item, currency}) {
  return (
    <View style={styles.renderContainer}>
      <LinearGradient
        colors={[
          InputTypeColors[selectedType],
          InputTypeColors[selectedType + 'Accent'],
        ]}
        style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcon
            name="dots-horizontal"
            size={Constants.height * 0.07}
            color={InputTypeColors[selectedType + 'Accent']}
          />
        </View>
        <View style={styles.textContainer}>
          <AppText bold color={Constants.white} size={18}>
            {item.comment}
          </AppText>

          <AppText color={Constants.white} bold size={16}>
            {item.price + ' ' + currency}
          </AppText>
        </View>
      </LinearGradient>
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
    maxHeight: 100,
    marginEnd: '2%',
    flexDirection: 'row',
    height: Constants.height * 0.13,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: InputTypeColors[selectedType],
    elevation: 2,
    shadowColor: Constants.gray,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
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
