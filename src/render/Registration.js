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

const selectedType = 'registration2';

export default function Registration({item, currency}) {
  return (
    <View style={styles.renderContainer}>
      <View
        colors={[
          InputTypeColors[selectedType],
          InputTypeColors[selectedType + 'Accent'],
        ]}
        style={styles.itemContainer}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingEnd: 20,
            alignItems: 'center',
          }}>
          <View style={styles.iconContainer}>
            <EntypoIcon
              name="clipboard"
              size={Constants.height * 0.07}
              color={InputTypeColors[selectedType + 'Accent']}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <AppText bold size={32} color={Constants.white}>
              Registracija
            </AppText>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text>
            <AppText color={Constants.lightBlue} size={22} bold>
              Cijena:
            </AppText>
            <AppText color={Constants.white} bold size={26}>
              {'  ' + item.price + ' ' + currency}
            </AppText>
          </Text>

          <View style={{width: '100%'}}>
            <AppText color={Constants.lightBlue} size={22} bold>
              Datum registrovanja:
            </AppText>
            <AppText
              style={{marginLeft: '0%'}}
              color={Constants.white}
              bold
              size={26}>
              {unixToString(item.date, 0, '')}
            </AppText>
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
    height: Constants.height * 0.3,
    maxHeight: 250,
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
    height: Constants.height * 0.1,
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
  detailsContainer: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    justifyContent: 'space-evenly',
  },
});
