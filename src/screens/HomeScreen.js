import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import AppText from '../components/AppText';
import Header from '../components/Header';
import Constants from '../constants/Constants';
import FastImage from 'react-native-fast-image';
import {getLogo, getFuelIcon} from '../utils/Functions';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CarModal from '../render/modals/CarModal';
import {setUserData} from '../utils/firebaseUtils';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({navigation, route}) => {
  const [dataWarning, setDataWarning] = useState(
    route.params.GDATA ? getClosestRegNortifiaction(route.params.GDATA) : [],
  );
  const [warning, setWarning] = useState(
    dataWarning.length !== 0 ? true : false,
  );

  function dateDiff(datum_sl_reg_unix) {
    return (datum_sl_reg_unix + 31556926000 - Date.now()) / 86400000;
  }

  function getClosestRegNortifiaction(data) {
    let list = [];
    console.log('FUNCTION');
    for (let i = 0; i < data.data.length; i++) {
      console.log('CAR');
      for (let j = 0; j < data.data[i].data.registration.length; j++) {
        let ddif = Math.floor(dateDiff(data.data[i].data.registration[j].date));
        console.log(
          'TEST',
          ddif < 15 && ddif > -1 && ddif !== null && ddif !== undefined,
        );
        if (ddif < 15 && ddif > -1 && ddif !== null && ddif !== undefined) {
          list.push({
            value: ddif,
            vozilo: data.data[i].name,
            tag: 'registracije',
          });
        } else {
          console.log('ITS FALSE');
        }
      }

      for (let j = 0; j < data.data[i].data.insurance.length; j++) {
        console.log('INSURANCE STARTED');
        let ddif = Math.floor(dateDiff(data.data[i].data.insurance[j].date));
        if (ddif < 15 && ddif > -1 && (ddif !== null || ddif !== undefined)) {
          list.push({
            value: ddif,
            vozilo: data.data[i].name,
            tag: 'osiguranje',
          });
        } else {
          console.log('INSURANCE FALSE');
        }
      }
    }

    for (let k = 0; k < data.data.length; k++) {
      let a = data.data[k].data.maintainance.length - 1;

      if (a < 0) continue;

      let total =
        data.data[k].data.maintainance[a].mileage +
        data.data[k].data.maintainance[a].reminder -
        data.data[k].mileage;
      if (total > 0 && total < 500 && total !== null && total !== undefined) {
        list.push({
          value: total,
          vozilo: data.data[k].name,
          tag: 'servis',
        });
      }
    }

    console.log(list);
    return list;
  }

  const setIndexes = (data) => {
    for (let i = 0; i < data.length; i++) {
      data[i].id = i;
    }
    return data;
  };

  const [cars, setCars] = useState(
    route.params.GDATA ? setIndexes(route.params.GDATA.data) : [],
  );
  console.log(route.params.GDATA);

  const goToCar = (carId) => {
    navigation.navigate('Auto', {
      carId: carId,
    });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const addCarHandler = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const addItem = (data) => {
    let nextData = cars;
    nextData.push(data);
    setCars(nextData);

    let pushData = route.params.GDATA;
    pushData.data = cars;
    setUserData(JSON.stringify(pushData));
  };

  const renderCar = (car) => {
    const item = car.item;
    const fuelIcon = getFuelIcon(item.fuel);

    return (
      <TouchableHighlight
        style={[
          styles.carButton,
          {
            alignSelf: item.id % 2 === 0 ? 'flex-start' : 'flex-end',
            flexDirection: item.id % 2 === 0 ? 'row' : 'row-reverse',
            // backgroundColor: Constants.background,
          },
        ]}
        activeOpacity={0.5}
        underlayColor={Constants.lightBlue + 'F0'}
        onPress={() => goToCar(item.id)}>
        <View
          style={[
            styles.carContainer,
            {
              alignSelf: item.id % 2 === 0 ? 'flex-start' : 'flex-end',
              flexDirection: item.id % 2 === 0 ? 'row' : 'row-reverse',
            },
          ]}>
          <View style={styles.logoContainer}>
            <FastImage source={getLogo(item.brand)} style={styles.brandLogo} />
          </View>

          <View
            style={[
              styles.carTextContainer,
              {
                alignItems: item.id % 2 === 0 ? 'flex-start' : 'flex-end',
              },
            ]}>
            <AppText
              size={20}
              bold
              color={Constants.white}
              style={{
                textAlign: item.id % 2 === 0 ? 'left' : 'right',
              }}>
              {item.name}
            </AppText>
            <AppText size={16} color={Constants.background}>
              {item.brand}
            </AppText>
            <AppText size={14} color={Constants.primaryLight}>
              {item.fuel.toUpperCase()}
            </AppText>
          </View>

          {fuelIcon}
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <Header route={route} />
      <View style={styles.body}>
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id.toString()} // ovdje je bio problem
          style={styles.carList}
          renderItem={(item) => renderCar(item)}
          ListFooterComponent={
            <TouchableOpacity
              onPress={() => {
                addCarHandler();
              }}
              activeOpacity={0.7}
              style={styles.addCarButton}>
              <MaterialCommunityIcon
                name="plus"
                size={70}
                color={Constants.black}
              />
            </TouchableOpacity>
          }
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback
            onPress={() =>
              isKeyboardVisible ? Keyboard.dismiss() : setModalVisible(false)
            }>
            <View
              style={{
                position: 'absolute',
                height: Constants.height,
                width: Constants.width,
              }}
            />
          </TouchableWithoutFeedback>

          <CarModal
            closeModal={closeModal}
            addItem={addItem}
            id={cars.length}
          />
        </View>
      </Modal>

      <Modal
        visible={warning}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setWarning(false)}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback
            styel={{marginVertical: 10}}
            onPress={() => setWarning(false)}>
            <View
              style={{
                position: 'absolute',
                height: Constants.height,
                width: Constants.width,
              }}
            />
          </TouchableWithoutFeedback>

          <View
            style={[
              styles.viewContainer,
              {
                backgroundColor: Constants.primary,
                borderColor: Constants.primaryDark,
                alignItems: 'flex-start',
              },
            ]}>
            <AppText
              size={28}
              color={Constants.white}
              bold
              style={{marginBottom: 25}}>
              Podsjetnik
            </AppText>
            {dataWarning.map((object) => {
              return object.tag === 'servis' ? (
                <AppText
                  color={Constants.white}
                  style={{textAlign: 'left', marginVertical: 5}}>
                  Uskoro trebate poslati vozilo{' '}
                  <AppText bold size={18} color={Constants.lightBlue}>
                    {object.vozilo}
                  </AppText>{' '}
                  na servis. (za{' '}
                  <AppText bold size={18} color={Constants.primaryLight}>
                    {object.value}
                  </AppText>{' '}
                  kilometara).
                </AppText>
              ) : (
                <AppText
                  key={Math.random() * 1000}
                  color={Constants.white}
                  style={{textAlign: 'left', marginVertical: 5}}>
                  <AppText bold size={18} color={Constants.lightBlue}>
                    {object.vozilo}
                  </AppText>
                  -u je potrebna obnova {object.tag} za{' '}
                  <AppText bold size={18} color={Constants.primaryLight}>
                    {object.value}
                  </AppText>{' '}
                  dana.
                </AppText>
              );
            })}

            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 20,
                top: 20,
              }}
              onPress={() => setWarning(false)}>
              <FontAwesomeIcon
                name="close"
                size={Constants.height * 0.03}
                color={Constants.black}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Constants.background,
  },
  body: {
    flex: 1,
  },
  carList: {
    width: '100%',
    flexGrow: 0,
    paddingTop: 20,
    paddingBottom: 20,
  },

  carButton: {
    width: Constants.width * 0.8 - 20,
    borderRadius: 10,
    marginBottom: 15,
    marginStart: 20,
  },
  carContainer: {
    width: Constants.width * 0.8 - 20,
    padding: 10,
    paddingEnd: 20,
    borderRadius: 10,
    backgroundColor: Constants.primary,

    elevation: 4,
    shadowColor: Constants.gray,
    shadowRadius: 3,
    shadowOpacity: 0.75,
    shadowOffset: {width: 2, height: 3},
  },
  logoContainer: {
    backgroundColor: Constants.white,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },
  brandLogo: {
    width: 60,
    aspectRatio: 1,
  },
  carTextContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  addCarButton: {
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 7,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: Constants.black,
    width: Constants.width * 0.75 - 40, // -40 just so it matches the padding of flatlist
    marginTop: 15,
    marginBottom: Constants.height * 0.08,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000' + '80',
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewContainer: {
    width: Constants.width * 0.85,
    borderRadius: 15,
    borderWidth: 5,
    padding: 20,
    alignItems: 'center',
  },
});

export default HomeScreen;
