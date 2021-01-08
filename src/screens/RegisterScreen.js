import React from 'react';
import {View, StyleSheet} from 'react-native';
import Constants from '../constants/Constants';
import Header from '../components/Header';
import AppText from '../components/AppText';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import DashboardInput from '../components/DashboardInput';

const RegisterScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Header />
      <View style={styles.body}>
        <View style={styles.background}>
          <View style={styles.upper} />
          <View style={styles.lower} />
        </View>

        <View style={styles.dashboardContainer}>
          <View style={styles.dashboard}>
            <View style={styles.topDecoration}>
              <View style={styles.line1} />
              <View style={styles.line2} />
            </View>
            <View style={styles.dashboardMain}>
              <View style={styles.leftDecoration}>
                <View style={styles.screw} />
                <View style={styles.screw} />
              </View>
              <View style={styles.dataContainer}>
                <View style={styles.displayPadding}>
                  <View style={styles.display}>
                    <FontAwesome5Icon
                      name="route"
                      size={21}
                      color={Constants.black}
                    />
                    <AppText size={24} bold style={{marginLeft: 10}}>
                      Registruj se
                    </AppText>
                  </View>
                </View>

                <View style={styles.textInputFields}>
                  <DashboardInput text="Ime" />
                </View>
              </View>
              <View style={styles.rightDecoration}>
                <View style={styles.screw} />
                <View style={styles.screw} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
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
  },
  upper: {
    width: '100%',
    flex: 30,
    backgroundColor: '#8e9ddf',
    borderTopWidth: 7.5,
    borderTopColor: Constants.redDark,
  },
  lower: {
    width: '100%',
    flex: 60,
    backgroundColor: '#575757',
  },

  dashboardContainer: {
    flexDirection: 'column-reverse',
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  dashboard: {
    width: '85%',
    height: '75%',
    backgroundColor: Constants.gray,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    alignItems: 'center',
  },
  topDecoration: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  line1: {
    width: '40%',
    height: '20%',
    backgroundColor: '#666666', //HDKSAKHDJSA
    borderRadius: 200, //elipse
  },
  line2: {
    width: '50%',
    height: '20%',
    backgroundColor: '#666666',
    borderRadius: 200, //elipse
  },
  dashboardMain: {
    flex: 10,
    width: '100%',
    flexDirection: 'row',
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: '#999999',
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
    backgroundColor: '#666666',
    borderRadius: 100, //round
  },

  displayPadding: {
    width: '100%',
    paddingHorizontal: 30,
  },
  display: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 15,
    backgroundColor: '#68AEB8',
    borderRadius: 3,
  },
  textInputFields: {
    padding: 30,
    width: '100%',
  },
});

export default RegisterScreen;
