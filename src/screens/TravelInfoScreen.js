import React, {useState} from 'react';
import {Text, View, StyleSheet, Linking} from 'react-native';
import Header from '../components/Header';
import Constants from '../constants/Constants';
import {Picker} from '@react-native-picker/picker';
import {TravellInfoData} from '../constants/TravellInfoData';
import Hyperlink from 'react-native-hyperlink';
import AppText from '../components/AppText';
import LinearGradient from 'react-native-linear-gradient';

const TravelInfoScreen = () => {
  const list = TravellInfoData;
  const [number, setNumber] = useState(list[0].value);
  const [link, setLink] = useState(
    'http://www.mvp.gov.ba/konzularne_informacije/sta_konzul_moze_uciniti_za_vas/?id=17675',
  );

  const numberChange = (index) => {
    list.map((obj, i) => {
      if (index === i) {
        setNumber(list[i].value);
      }
    });
  };

  const linkChange = (index) => {
    list.map((obj, i) => {
      if (index === i) {
        setLink(list[i].putovanje);
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: Constants.background}}>
      <Header />
      <LinearGradient
        colors={[
          Constants.primaryLight,
          Constants.primary,
          Constants.primaryDark,
        ]}
        style={styles.lowerView}>
        <View style={styles.numbersView}>
          <AppText style={styles.titleText}>POMOĆ NA PUTU ZA...</AppText>
          <View
            style={[
              {
                borderWidth: 2,
                borderColor: Constants.primary,
              },
              styles.dropDownPickerViewStyle,
            ]}>
            <Picker
              selectedValue={number}
              style={styles.dropDownPickerViewStyle}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => numberChange(itemIndex)}>
              <Picker.Item label={list[0].label} value={list[0].value} />
              <Picker.Item label={list[1].label} value={list[1].value} />
              <Picker.Item label={list[2].label} value={list[2].value} />
            </Picker>
          </View>

          <View style={styles.numberStyles}>
            <AppText>Policija:</AppText>
            <AppText color={Constants.red}>{number.milicija}</AppText>
          </View>
          <View style={styles.numberStyles}>
            <AppText>Vatrogasci:</AppText>
            <AppText color={Constants.red}>{number.vatrogasci}</AppText>
          </View>
          <View style={styles.numberStyles}>
            <AppText>Hitna pomoć:</AppText>
            <AppText color={Constants.red}>{number.hitna}</AppText>
          </View>
          <View style={styles.numberStyles}>
            <AppText>Pomoć na putu:</AppText>
            <AppText color={Constants.red}>{number.ams}</AppText>
          </View>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={[
          Constants.primaryLight,
          Constants.primary,
          Constants.primaryDark,
        ]}
        style={styles.lowerView}>
        <View style={styles.numbersView}>
          <AppText style={styles.titleText}>ŽELITE DA PUTUJETE?</AppText>
          <AppText style={styles.textStyle}>
            NAJNOVIJE INFORMACIJE VEZANE{'\n'}ZA PUTOVANJE U PANDEMIJI
          </AppText>
          <View
            style={[
              styles.dropDownPickerViewStyle,
              {borderWidth: 2, borderColor: Constants.primary, marginTop: 15},
            ]}>
            <Picker
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => linkChange(itemIndex)}
              selectedValue={link}>
              <Picker.Item
                label={list[0].label}
                value="http://www.mvp.gov.ba/konzularne_informacije/sta_konzul_moze_uciniti_za_vas/?id=17675"
              />
              <Picker.Item
                label={list[1].label}
                value="http://www.mfa.gov.rs/sr/index.php/konzularni-poslovi/putovanja-u-inostranstvo/vesti-za-putovanja-u-inostranstvo/22669-----------covid-19?lang=cyr"
              />
              <Picker.Item
                label={list[2].label}
                value="https://www.gov.me/en/homepage"
              />
            </Picker>
          </View>
          <View>
            <Hyperlink
              linkDefault={true}
              linkStyle={{color: Constants.black, fontSize: 14}}
              linkText={(url) => (url === link ? 'link' : url)}>
              <AppText
                style={{
                  alignSelf: 'center',
                  textDecorationLine: 'underline',
                  marginVertical: 20,
                  justifyContent: 'flex-end',
                  alignSelf: 'center',
                }}>
                Više informacija na ovaj {link}
              </AppText>
            </Hyperlink>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  lowerView: {
    //flex: 1,
    width: Constants.screenWidth * 0.9,
    height: Constants.screenHeight * 0.35,
    borderRadius: 15,
    alignSelf: 'center',
    margin: 15,
    padding: 10,
    justifyContent: 'center',
  },
  numbersView: {
    flex: 1,
    width: Constants.screenWidth * 0.8,
    height: Constants.screenHeight * 0.3,
    alignSelf: 'center',
    backgroundColor: Constants.background,
    padding: 10,
    margin: 5,
    borderRadius: 15,
    alignContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: Constants.black,
    alignSelf: 'center',
    margin: 15,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 16,
    color: Constants.black,
    textAlign: 'center',
  },
  dropDownPickerViewStyle: {
    width: Constants.screenWidth * 0.7,
    height: 40,
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 25,
    justifyContent: 'center',
  },
  numberStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});

export default TravelInfoScreen;
