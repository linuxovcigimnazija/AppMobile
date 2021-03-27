import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import Constants from '../constants/Constants';
import DashboardColors from '../constants/DashboardColors';
import Header from '../components/Header';
import AppText from '../components/AppText';

import DashboardInput from '../components/DashboardInput';
import DropDownPicker from 'react-native-dropdown-picker';
import Countries from '../constants/Countries';
import Hyperlink from 'react-native-hyperlink';

import Toast from 'react-native-simple-toast';
import {useForm, Controller} from 'react-hook-form';
import {onSingUp} from '../utils/firebaseUtils';

const mirrorBottom = 10.7;

const downScale = 0.8;

const RegisterScreen = ({navigation, route}) => {
  const {control, handleSubmit, errors, watch} = useForm();

  const [countryPicker, setCountryPicker] = useState({
    value: Countries.defValue,
    label: Countries.defLabel,
    id: Countries.defId,
  });

  const goToHome = () => {
    navigation.navigate('TabNavigation');
  };

  const userPassword = useRef({});
  userPassword.current = watch('userPassword', '');

  const onNextStepHandler = (d) => {
    const user = {
      name: d.userName,
      email: d.userMail,
      password: d.userPassword,
      date: Date.now(),
      country: {
        label: d.userCountry.label,
        valute: d.userCountry.value,
        id: d.userCountry.id,
      },
      data: [],
    };

    onSingUp(
      user.email,
      user.password,
      user,
      route.params.reRender,
      route.params.render,
    );
  };

  return (
    <TouchableWithoutFeedback
      style={styles.screenContainer}
      onPress={() => Keyboard.dismiss()}>
      <View style={styles.screenContainer}>
        <View style={styles.body}>
          <View style={styles.background}>
            <Image
              source={require('../assets/images/backgroundphoto.jpg')}
              resizeMode="stretch"
              style={{
                height: Constants.height,
                width: Constants.width,
              }}
            />
          </View>

          <View style={styles.dashboardContainer}>
            <View style={styles.displayPadding}>
              <View style={styles.display}>
                <AppText
                  size={38}
                  bold
                  style={({marginLeft: 10}, {color: Constants.white})}>
                  AppMobile
                </AppText>
              </View>

              <View style={styles.textInputFields}>
                <Controller
                  control={control}
                  defaultValue=""
                  name="userName"
                  render={({onChange, value}) => (
                    <DashboardInput
                      placeholder="Ime i prezime"
                      maxLength={25}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      error={errors.userName}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: 'Ime je obavezno.',
                    },
                  }}
                />

                <Controller
                  control={control}
                  defaultValue=""
                  name="userMail"
                  render={({onChange, value}) => (
                    <DashboardInput
                      placeholder="E-mail"
                      keyboardType="email-address"
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      error={errors.userMail}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: 'Email je obavezan.',
                    },
                    pattern: {
                      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Nije validna emial adresa',
                    },
                  }}
                />

                <Controller
                  control={control}
                  defaultValue=""
                  name="userPassword"
                  render={({onChange, value}) => (
                    <DashboardInput
                      placeholder="Šifra"
                      textContentType={'oneTimeCode'}
                      secureTextEntry={true}
                      maxLength={16}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      error={errors.userName}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: 'Šifra je obavezna.',
                    },
                    minLength: {
                      value: 8,
                      message: 'Šifra nije dovoljno dugačka.',
                    },
                  }}
                />

                <Controller
                  control={control}
                  defaultValue=""
                  name="userPasswordConfrim"
                  render={({onChange, value}) => (
                    <DashboardInput
                      text="Šifra"
                      textContentType={'oneTimeCode'}
                      placeholder="Unesite ponovo Šifru"
                      secureTextEntry={true}
                      maxLength={16}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      error={errors.userPasswordConfrim}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: 'Potvrda šifre je obavezna.',
                    },

                    validate: (value) =>
                      value === userPassword.current ||
                      'Šifre se ne poklapaju.',
                  }}
                />
              </View>
              <View
                style={
                  Constants.OS === 'ios'
                    ? {zIndex: 22, width: '100%'}
                    : {width: '100%'}
                }>
                <Controller
                  control={control}
                  defaultValue={countryPicker.value}
                  name="userCountry"
                  render={({onChange, value}) => (
                    <DropDownPicker
                      items={Countries.countriesList}
                      placeholder={countryPicker.label}
                      showArrow={false}
                      style={styles.dropDownPickerStyle}
                      containerStyle={styles.dropDownPickerContainerStyle}
                      dropDownStyle={styles.dropDownStyle}
                      placeholderStyle={styles.dropDownPickerPlaceholder}
                      labelStyle={styles.dropDownPickerLabel}
                      selectedLabelStyle={styles.dropDownPickerSelectedLabel}
                      value={value}
                      onChangeItem={(item, value) => {
                        setCountryPicker({
                          label: item.label,
                          value: item.value,
                          id: item.id,
                        });
                        onChange(Countries.countriesList[value]);
                      }}
                    />
                  )}
                  rules={{
                    validate: (value) =>
                      value !== null || 'Odabir dražve je obavezan',
                  }}
                />
                {(errors.userName &&
                  Toast.showWithGravity(
                    errors.userName.message,
                    Toast.LONG,
                    Toast.TOP,
                  )) ||
                  (errors.userMail &&
                    !errors.userName &&
                    Toast.showWithGravity(
                      errors.userMail.message,
                      Toast.LONG,
                      Toast.TOP,
                    )) ||
                  (errors.userPassword &&
                    !errors.userName &&
                    !errors.userMail &&
                    Toast.showWithGravity(
                      errors.userPassword.message,
                      Toast.LONG,
                      Toast.TOP,
                    )) ||
                  (errors.userPasswordConfrim &&
                    !errors.userName &&
                    !errors.userMail &&
                    !errors.userPassword &&
                    Toast.showWithGravity(
                      errors.userPasswordConfrim.message,
                      Toast.LONG,
                      Toast.TOP,
                    )) ||
                  (errors.userCountry &&
                    !errors.userName &&
                    !errors.userMail &&
                    !errors.userPassword &&
                    !errors.userPasswordConfrim &&
                    Toast.showWithGravity(
                      errors.userCountry.message,
                      Toast.LONG,
                      Toast.TOP,
                    ))}

                <Hyperlink
                  onPress={() => navigation.navigate('Login')}
                  linkText={(url) =>
                    url === 'https://link.com' ? 'Prijavi se!' : url
                  }
                  linkStyle={styles.loginText}>
                  <AppText
                    style={{
                      textAlign: 'center',
                      marginVertical: '2%',
                      color: DashboardColors.white,
                    }}>
                    Već ste registrovan?{'\n'}https://link.com
                  </AppText>
                </Hyperlink>

                <TouchableOpacity
                  style={styles.loginButton}
                  activeOpacity={0.9}
                  onPress={handleSubmit(onNextStepHandler)}>
                  <AppText bold={true} style={styles.loginbuttonText}>
                    Registrujte se
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#353545',
  },
  mirror: {
    width: '100%',
    bottom:
      Constants.screenHeight > 850
        ? mirrorBottom + '%'
        : mirrorBottom * downScale + '%',
    opacity: 0.67,
  },
  dashboardContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  rightDecoration: {
    flex: 1,
    paddingVertical: '25%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screw: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: DashboardColors.grayLines,
    borderRadius: 100, //round
  },
  displayPadding: {
    width: '100%',
    paddingHorizontal: 45,
  },
  display: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 3,
    marginVertical: 50,
  },
  textInputFields: {
    height: '35%',
    width: '100%',
    justifyContent: 'space-between',
  },
  loginText: {
    fontSize: 14,
    color: DashboardColors.loginColor,
    fontFamily: 'Ubuntu-Bold',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: DashboardColors.loginColor,
    height: 50,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginbuttonText: {
    fontSize: 25,
    color: Constants.primaryDark,
  },
  dropDownPickerContainerStyle: {
    width: '70%',
    height: 40,
    alignSelf: 'center',
    marginBottom: '1%',
    marginTop: 12,
  },
  dropDownPickerStyle: {
    backgroundColor: Constants.primaryDark,
    borderWidth: 2,
    borderColor: DashboardColors.loginColor,
    borderTopLeftRadius: 7.5,
    borderBottomLeftRadius: 7.5,
    borderTopRightRadius: 7.5,
    borderBottomRightRadius: 7.5,
    paddingStart: 0,
    marginTop: 5,
  },
  dropDownStyle: {
    backgroundColor: Constants.primaryDark,
    borderTopWidth: 0,
    borderColor: Constants.primaryDark,
  },
  dropDownPickerPlaceholder: {
    fontFamily: 'Ubuntu-Bold',
    color: Constants.white,
    fontSize: 14,
    textAlign: 'center',
  },
  dropDownPickerLabel: {
    fontFamily: 'Ubuntu-Regular',
    color: Constants.white,
    fontSize: 14,
    textAlign: 'center',
  },
  dropDownPickerSelectedLabel: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 14,
    color: Constants.white,
  },
});

export default RegisterScreen;
