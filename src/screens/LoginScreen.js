import React, {useState} from 'react';
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
import Hyperlink from 'react-native-hyperlink';

import Toast from 'react-native-simple-toast';
import {useForm, Controller} from 'react-hook-form';
import {onLogIn} from '../utils/firebaseUtils';

const mirrorBottom = 10.7;

const downScale = 0.8;

const LoginScreen = ({navigation, route}) => {
  const {control, handleSubmit, errors} = useForm();

  const goToHome = () => {
    navigation.navigate('TabNavigation');
  };

  const onNextStepHandler = (d) => {
    onLogIn(
      d.userMail,
      d.userPassword,
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
              style={{width: Constants.width, height: Constants.height}}
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

              <View
                style={{
                  height: Constants.height * 0.6,
                  justifyContent: 'center',
                }}>
                <View style={styles.textInputFields}>
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
                        message: 'E-mail adresa je obavezna.',
                      },
                      pattern: {
                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'E-mail adresa nije validna',
                      },
                    }}
                  />

                  <Controller
                    control={control}
                    defaultValue=""
                    name="userPassword"
                    render={({onChange, value}) => (
                      <DashboardInput
                        textContentType={'oneTimeCode'}
                        placeholder="Šifra"
                        secureTextEntry={true}
                        maxLength={16}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        error={errors.userPassword}
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: 'Šifra je obavezna',
                      },
                      minLength: {
                        value: 8,
                        message: 'Šifra nije dovoljno dugačka.',
                      },
                    }}
                  />
                  {(errors.userMail &&
                    Toast.showWithGravity(
                      errors.userMail.message,
                      Toast.LONG,
                      Toast.TOP,
                    )) ||
                    (errors.userPassword &&
                      !errors.userMail &&
                      Toast.showWithGravity(
                        errors.userPassword.message,
                        Toast.LONG,
                        Toast.TOP,
                      ))}
                </View>

                <Hyperlink
                  onPress={() => navigation.navigate('Register')}
                  linkText={(url) =>
                    url === 'https://link.com' ? 'Registruj se!' : url
                  }
                  linkStyle={styles.loginText}>
                  <AppText
                    style={{
                      textAlign: 'center',
                      marginVertical: '2%',
                      color: DashboardColors.white,
                    }}>
                    Nemate profil?{'\n'}https://link.com
                  </AppText>
                </Hyperlink>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.loginButton}
                  onPress={handleSubmit(onNextStepHandler)}>
                  <AppText bold={true} style={styles.loginbuttonText}>
                    Prijavite se
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
    width: '100%',
    height: '23%',
    justifyContent: 'space-between',
  },
  loginText: {
    fontSize: 14,
    color: DashboardColors.loginColor,
    fontFamily: 'Ubuntu-Bold',
    textDecorationLine: 'underline',
    marginBottom: 20,
    marginTop: 5,
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
});

export default LoginScreen;
