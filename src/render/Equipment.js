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

const selectedType = 'equipment';

export default function Equipment({item, currency}) {
  return (
    <View style={styles.renderContainer}>
      <LinearGradient
        colors={[
          InputTypeColors[selectedType],
          InputTypeColors[selectedType + 'Accent'],
        ]}
        style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <FeatherIcon
            name="shopping-cart"
            size={Constants.height * 0.06}
            color={InputTypeColors[selectedType + 'Accent']}
          />
        </View>
        <View style={styles.textContainer}>
          <AppText bold color={Constants.white} size={18}>
            Oprema:
          </AppText>

          <AppText color={Constants.white} size={16}>
            {item.comment}
          </AppText>

          <View style={styles.priceHolder}>
            <AppText
              style={{
                backgroundColor: InputTypeColors[selectedType],
                padding: 3,
                paddingHorizontal: 5,
                borderRadius: 100,
                alignSelf: 'flex-end',
              }}
              color={Constants.white}
              size={14}>
              {item.price + ' ' + currency}
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
    flex: 1,
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
  priceHolder: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    borderRadius: 100,
    overflow: 'hidden',
  },
});
