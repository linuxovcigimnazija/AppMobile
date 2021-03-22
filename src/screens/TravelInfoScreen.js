import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../components/Header';
import Constants from '../constants/Constants';
import {TravellInfoData} from '../constants/TravellInfoData';
import Hyperlink from 'react-native-hyperlink';
import AppText from '../components/AppText';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import {getUserData} from '../utils/firebaseUtils';

const TravelInfoScreen = ({navigation, route}) => {
  const [num, setNum] = useState(route.params.GDATA.country.id);

  const [number, setNumber] = useState(TravellInfoData[num]);
  const [link, setLink] = useState(TravellInfoData[num]);

  return (
    <View style={{flex: 1, backgroundColor: Constants.background}}>
      <Header route={route} />
      <View style={{flex: 1, justifyContent: 'space-evenly'}}>
        <View style={styles.lowerView}>
          <LinearGradient
            colors={[Constants.lightBlue, Constants.primaryDark]}
            style={{
              position: 'absolute',
              width: Constants.width * 0.9,
              height: '104%',
              borderRadius: 15,
            }}
          />
          <View style={styles.numbersView}>
            <AppText style={styles.titleText}>Pomoć na putu za...</AppText>

            <DropDownPicker
              items={TravellInfoData}
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
        </View>
        <View style={styles.lowerView}>
          <LinearGradient
            colors={[Constants.primaryDark, Constants.lightBlue]}
            style={{
              position: 'absolute',
              width: Constants.width * 0.9,
              height: '104%',
              borderRadius: 15,
            }}
          />
          <View style={styles.numbersView}>
            <FoundationIcon
              size={Constants.height > 800 ? 70 : 60}
              color={Constants.red}
              name="burst-new"
              style={{position: 'absolute', right: 5}}
            />
            <AppText style={styles.titleText}>Želite da putujete?</AppText>
            <AppText style={styles.textStyle}>
              NAJNOVIJE informacije vezane za putovanje u pandemiji za...
            </AppText>
            <DropDownPicker
              items={TravellInfoData}
              containerStyle={[
                styles.dropContainer,
                Constants.OS === 'ios' ? {zIndex: 100} : {},
              ]}
              arrowColor={Constants.primaryDark}
              style={[
                styles.dropDownPickerViewStyle,
                Constants.OS === 'ios' ? {zIndex: 100} : {},
              ]}
              placeholder={link.label}
              dropDownStyle={[
                styles.dropDownStyle,
                Constants.OS === 'ios' ? {zIndex: 100} : {},
              ]}
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
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lowerView: {
    width: '90%',
    height: '45%',
    borderRadius: 15,
    alignSelf: 'center',
    marginHorizontal: 15,
    padding: 5,
    justifyContent: 'center',
  },
  numbersView: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: Constants.background,
    padding: 20,
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
    textAlign: 'left',
    marginBottom: 5,
  },
  dropDownPickerViewStyle: {
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
    borderColor: Constants.gray,
    borderTopWidth: 0.5,
    marginTop: 5,
    paddingVertical: 0,
    height: Constants.OS === 'android' ? Constants.height * 0.12 : undefined,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default TravelInfoScreen;
