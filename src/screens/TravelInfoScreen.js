import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../components/Header';
import Constants from '../constants/Constants';
import {TravellInfoData} from '../constants/TravellInfoData';
import Hyperlink from 'react-native-hyperlink';
import AppText from '../components/AppText';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';

const TravelInfoScreen = () => {
  const list = TravellInfoData;
  const [number, setNumber] = useState({
    label: 'Bosnu i Hercegovinu',
    value: {
      milicija: 122,
      vatrogasci: 123,
      hitna: 124,
      ams: 1288,
    },
  });
  const [link, setLink] = useState({
    label: 'Bosnu i Hercegovinu',
    putovanje:
      'http://www.mvp.gov.ba/konzularne_informacije/sta_konzul_moze_uciniti_za_vas/?id=17675',
  });

  return (
    <View style={{flex: 1, backgroundColor: Constants.background}}>
      <Header />
      <LinearGradient
        colors={[Constants.primaryLight, Constants.primaryDark]}
        style={styles.lowerView}>
        <View style={styles.numbersView}>
          <AppText style={styles.titleText}>Pomoc na putu za...</AppText>

          <DropDownPicker
            items={list}
            containerStyle={styles.dropContainer}
            style={styles.dropDownPickerViewStyle}
            placeholder={number.label}
            dropDownStyle={styles.dropDownStyle}
            placeholderStyle={styles.selectedLabelStyle}
            labelStyle={styles.labelStyle}
            selectedLabelStyle={styles.selectedLabelStyle}
            onChangeItem={(item) => {
              setNumber(item);
            }}
          />

          <View style={styles.numberStyles}>
            <AppText>Policija:</AppText>
            <AppText color={Constants.red} size={18} bold>
              {number.value.milicija}
            </AppText>
          </View>
          <View style={styles.numberStyles}>
            <AppText>Vatrogasci:</AppText>
            <AppText color={Constants.red} size={18} bold>
              {number.value.vatrogasci}
            </AppText>
          </View>
          <View style={styles.numberStyles}>
            <AppText>Hitna pomoć:</AppText>
            <AppText color={Constants.red} size={18} bold>
              {number.value.hitna}
            </AppText>
          </View>
          <View style={styles.numberStyles}>
            <AppText>Pomoć na putu:</AppText>
            <AppText color={Constants.red} size={18} bold>
              {number.value.ams}
            </AppText>
          </View>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={[Constants.primary, Constants.primaryDark]}
        style={styles.lowerView}>
        <View style={styles.numbersView}>
          <AppText style={styles.titleText}>Želite da putujete?</AppText>
          <AppText style={styles.textStyle}>
            NAJNOVIJE informacije vezane za Putovanje u Pandemiji za...
          </AppText>
          <DropDownPicker
            items={list}
            containerStyle={styles.dropContainer}
            arrowColor={Constants.primaryDark}
            style={styles.dropDownPickerViewStyle}
            placeholder={link.label}
            dropDownStyle={styles.dropDownStyle}
            placeholderStyle={styles.selectedLabelStyle}
            labelStyle={styles.labelStyle}
            selectedLabelStyle={styles.selectedLabelStyle}
            onChangeItem={(item) => {
              setLink(item);
            }}
          />
          <View>
            <Hyperlink
              linkDefault={true}
              linkStyle={{
                color: Constants.black,
                fontSize: 16,
                fontFamily: 'Ubuntu-Bold',
              }}
              linkText={(url) =>
                url === link.putovanje ? 'Više informacija na ovaj link' : url
              }>
              <AppText
                style={{
                  alignSelf: 'center',
                  textDecorationLine: 'underline',
                  marginVertical: 20,
                  justifyContent: 'flex-end',
                }}>
                {link.putovanje}
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
    width: '90%',
    borderRadius: 15,
    alignSelf: 'center',
    margin: 15,
    padding: 5,
    justifyContent: 'center',
  },
  numbersView: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Constants.background,
    padding: 10,
    borderRadius: 10,
    alignContent: 'center',
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Constants.primaryDark,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 16,
    color: Constants.black,
    textAlign: 'center',
    marginBottom: 5,
  },
  dropDownPickerViewStyle: {
    //flex: 1,
    width: Constants.screenWidth * 0.7,
    height: 40,
    marginVertical: 5,
    alignSelf: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    backgroundColor: Constants.background,
    borderWidth: 1,
    borderColor: Constants.primary,
  },
  dropContainer: {
    width: Constants.screenWidth * 0.7,
    height: 45,
    alignSelf: 'center',
  },
  dropDownStyle: {
    backgroundColor: Constants.background, //+ '80',
    alignContent: 'center',
    fontFamily: 'Ubuntu-Regular',
  },
  labelStyle: {
    fontFamily: 'Ubuntu-Regular',
    color: Constants.primary,
    fontSize: 14,
  },
  selectedLabelStyle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 16,
    color: Constants.primary,
  },
  numberStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});

export default TravelInfoScreen;
