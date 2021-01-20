import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Constants from '../constants/Constants';
import DashboardColors from '../constants/DashboardColors';
import Header from '../components/Header';
import AppText from '../components/AppText';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import DashboardInput from '../components/DashboardInput';
import Hyperlink from 'react-native-hyperlink';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import {useForm, Controller} from 'react-hook-form';

const mirrorHeight = 50;
const mirrorBottom = 10.7;
const pineHeight = 30;
const pineBottom = 21.5;
const downScale = 0.8;

const LoginScreen = () => {
  const {control, handleSubmit, errors} = useForm();
  const [data, setData] = useState('');

  const onNextStepHandler = (d) => {
    setData(d);
    //Ovdje ide Navigation funkcijaz
  };

  return (
    <TouchableWithoutFeedback
      style={styles.screenContainer}
      onPress={() => Keyboard.dismiss()}>
      <View style={styles.screenContainer}>
        <Header />
        <View style={styles.body}>
          <View style={styles.background}>
            <LinearGradient
              colors={[
                DashboardColors.nightSkyDarkBlue,
                DashboardColors.nightSkyBlue,
              ]}
              style={styles.upper}>
              <FastImage
                source={require('../assets/images/rearview-mirror.png')}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.mirror}
              />
              <FastImage
                source={require('../assets/images/pine.png')}
                resizeMode="contain"
                style={styles.airFreshener}
              />
            </LinearGradient>

            <LinearGradient
              colors={[DashboardColors.grayBackground, DashboardColors.black]}
              style={styles.lower}
            />
          </View>

          <View style={styles.dashboardContainer}>
            <View style={styles.dashboard}>
              <View style={styles.topDecoration}>
                <LinearGradient
                  colors={[
                    DashboardColors.black,
                    DashboardColors.grayBackground,
                  ]}
                  style={styles.line1}
                />
                <LinearGradient
                  colors={[
                    DashboardColors.black,
                    DashboardColors.grayBackground,
                  ]}
                  style={styles.line2}
                />
              </View>
              <View style={styles.dashboardMain}>
                <View style={styles.leftDecoration}>
                  <LinearGradient
                    colors={[
                      DashboardColors.black,
                      DashboardColors.grayBackground,
                    ]}
                    style={styles.screw}
                  />
                  <LinearGradient
                    colors={[
                      DashboardColors.black,
                      DashboardColors.grayBackground,
                    ]}
                    style={styles.screw}
                  />
                </View>
                <View style={styles.dataContainer}>
                  <View style={styles.displayPadding}>
                    <LinearGradient
                      colors={[
                        DashboardColors.nightSkyBlue,
                        DashboardColors.displayBlue,
                        DashboardColors.nightSkyBlue,
                      ]}
                      style={styles.displayGradient}>
                      <View style={styles.display}>
                        <FontAwesome5Icon
                          name="map-marker-alt"
                          size={21}
                          color={DashboardColors.black}
                        />
                        <AppText size={24} bold style={{marginLeft: 10}}>
                          Prijavi se
                        </AppText>
                      </View>
                    </LinearGradient>
                  </View>

                  <View style={styles.textInputFields}>
                    <Controller
                      control={control}
                      defaultValue=""
                      name="userName"
                      render={({onChange, value}) => (
                        <DashboardInput
                          text="Ime"
                          placeholder="Unesi Korisnicko Ime"
                          maxLength={12}
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          error={errors.userName}
                        />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: 'Ime je obavezno',
                        },
                      }}
                    />

                    <Controller
                      control={control}
                      defaultValue=""
                      name="userPassword"
                      render={({onChange, value}) => (
                        <DashboardInput
                          text="Sifra"
                          placeholder="Unesi Sifru"
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
                          message: 'Sifra je obavezna',
                        },
                        minLength: {
                          value: 8,
                          message: 'Sifra nije dovoljno dugacka',
                        },
                      }}
                    />
                    {(errors.userName &&
                      Toast.showWithGravity(
                        errors.userName.message,
                        Toast.LONG,
                        Toast.TOP,
                      )) ||
                      (errors.userPassword &&
                        Toast.showWithGravity(
                          errors.userPassword.message,
                          Toast.LONG,
                          Toast.TOP,
                        ))}
                  </View>

                  <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <FontAwesome5Icon name="info" size={18} />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.button}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={handleSubmit(onNextStepHandler)}>
                        <FontAwesome5Icon name="arrow-right" size={18} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.decorationContainer}>
                    <LinearGradient
                      colors={[
                        DashboardColors.grayBackground,
                        DashboardColors.black,
                      ]}
                      style={[
                        styles.line2,
                        styles.line2,
                        {height: 7, marginBottom: 0},
                      ]}
                    />
                    <LinearGradient
                      colors={[
                        DashboardColors.grayBackground,
                        DashboardColors.black,
                      ]}
                      style={[
                        styles.line1,
                        {height: 7, marginBottom: 0, marginTop: 7.5},
                      ]}
                    />
                  </View>

                  <Hyperlink
                    onPress={(url, text) => alert(url + ', ' + text)}
                    linkText={(url) =>
                      url === 'https://link.com' ? 'Registruj se!' : url
                    }
                    linkStyle={styles.loginText}>
                    <AppText
                      style={{textAlign: 'center', marginVertical: '2%'}}>
                      Nemas profil?{'\n'}https://link.com
                    </AppText>
                  </Hyperlink>
                </View>
                <View style={styles.rightDecoration}>
                  <LinearGradient
                    colors={[
                      DashboardColors.black,
                      DashboardColors.grayBackground,
                    ]}
                    style={styles.screw}
                  />
                  <LinearGradient
                    colors={[
                      DashboardColors.black,
                      DashboardColors.grayBackground,
                    ]}
                    style={styles.screw}
                  />
                </View>
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
  scrollViewContainer: {
    flexGrow: 1,
  },
  body: {
    flex: 1,
  },

  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  upper: {
    alignItems: 'center',
    width: '100%',
    flex: 30,
    backgroundColor: DashboardColors.nightSkyBlue,
    borderTopWidth: 7.5,
    borderTopColor: DashboardColors.redDark,
  },
  mirror: {
    height:
      Constants.screenHeight > 850
        ? mirrorHeight + '%'
        : mirrorHeight * downScale + '%',
    width: '50%',
    bottom:
      Constants.screenHeight > 850
        ? mirrorBottom + '%'
        : mirrorBottom * downScale + '%',
    opacity: 0.67,
  },
  airFreshener: {
    height:
      Constants.screenHeight > 850
        ? pineHeight + '%'
        : pineHeight * downScale + '%',
    width: '30%',
    bottom:
      Constants.screenHeight > 850
        ? pineBottom + '%'
        : pineBottom * downScale + '%',
  },
  lower: {
    width: '100%',
    flex: 60,
    backgroundColor: DashboardColors.grayBackground,
  },

  dashboardContainer: {
    flexDirection: 'column-reverse',
    flex: 1,
    alignItems: 'center',
  },
  dashboard: {
    width: '85%',
    minHeight: '72%',
    borderWidth: 3,
    borderColor: DashboardColors.grayLines,
    backgroundColor: DashboardColors.gray,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    alignItems: 'center',
  },
  topDecoration: {
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  line1: {
    width: '40%',
    height: 10,
    backgroundColor: DashboardColors.grayLines,
    borderRadius: 200, //elipse
    marginTop: 10,
    marginBottom: 10,
  },
  line2: {
    width: '50%',
    height: 10,
    backgroundColor: DashboardColors.grayLines,
    borderRadius: 200, //elipse
    marginBottom: 10,
  },
  dashboardMain: {
    // flex: 10,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  leftDecoration: {
    flex: 1,
    paddingVertical: '25%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataContainer: {
    flex: 7,
    marginBottom: 15,
    paddingBottom: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: DashboardColors.grayData,
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
    paddingHorizontal: 30,
  },
  displayGradient: {
    width: '100%',
    backgroundColor: 'pink',
    marginTop: 15,
    padding: 5,
    borderRadius: 8,
  },
  display: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: DashboardColors.displayBlue,
    borderRadius: 3,
  },
  textInputFields: {
    marginTop: '7.5%',
    paddingHorizontal: 20,
    width: '100%',
  },
  dropDownPickerContainerStyle: {
    width: '64%',
    height: 30,
    alignSelf: 'center',
    marginBottom: '1%',
  },
  dropDownPickerStyle: {
    backgroundColor: DashboardColors.gray,
    borderWidth: 2,
    borderColor: DashboardColors.dropDownGray,
    borderTopLeftRadius: 7.5,
    borderBottomLeftRadius: 7.5,
    borderTopRightRadius: 7.5,
    borderBottomRightRadius: 7.5,
  },
  dropDownStyle: {
    backgroundColor: DashboardColors.grayData,
    borderTopWidth: 0,
    borderColor: DashboardColors.dropDownBorder,
  },
  dropDownPickerPlaceholder: {
    fontFamily: 'Ubuntu-Bold',
    color: DashboardColors.black,
    fontSize: 14,
  },
  dropDownPickerLabel: {
    fontFamily: 'Ubuntu-Regular',
    color: DashboardColors.black,
    fontSize: 14,
    textAlign: 'center',
  },
  dropDownPickerSelectedLabel: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 14,
    color: DashboardColors.black,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '65%',
    marginTop: '4%',
    marginBottom: '2%',
  },
  button: {
    backgroundColor: DashboardColors.buttonGray,
    borderWidth: 4,
    borderColor: DashboardColors.black,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 55,
    borderRadius: 100, // round
  },
  decorationContainer: {
    marginVertical: '3%',
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: DashboardColors.red,
    fontFamily: 'Ubuntu-Bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
