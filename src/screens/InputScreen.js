/* eslint-disable curly */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Header from '../components/Header';
import Constants from '../constants/Constants';
import AppText from '../components/AppText';
import DropDownPicker from 'react-native-dropdown-picker';
import InputCategories from '../constants/InputCategories';
import InputTypeColors from '../constants/InputTypeColors';
import {
  FontAwesomeIcon,
  getCategoryIcon,
  sortResults,
} from '../utils/Functions';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {
  Fuel,
  Registration,
  Insurance,
  Maintainance,
  Repair,
  Crash,
  Tickets,
  Equipment,
  CarWash,
  Other,
} from '../render/index';
import {
  FuelModal,
  RegistrationModal,
  MaintainanceModal,
  CrashesModal,
  EquipmentModal,
} from '../render/modals';

const InputScreen = ({navigation, route}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    InputCategories[route.params.category],
  );
  let selectedCategoryValue = selectedCategory.value;
  let categoryColor = InputTypeColors[selectedCategoryValue];
  let categoryIconColor = Constants.white;
  let controller = {
    isOpen: () => false,
  };
  let flatList;

  const [iconNameDependency, setIconNameDependency] = useState(false);
  const iconName = iconNameDependency ? 'chevron-up' : 'chevron-down';

  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState({
    fuel: [
      {
        price: 150,
        volume: 50,
        discount: true,
        pricePerLiter: 200.21,
        date: Date.parse('2003-12-12'),
        tag: 'fuel',
      },
      {
        price: 130,
        volume: 30,
        discount: false,
        pricePerLiter: 200.54,
        date: Date.parse('2003-02-01'),
        tag: 'fuel',
      },
    ],
    registration: [
      {
        price: 400,
        date: Date.parse('2003-02-07'),
        tag: 'registration',
      },
    ],
    insurance: [
      {
        price: 600,
        date: Date.parse('2003-07-05'),
        tag: 'insurance',
      },
    ],
    maintainance: [
      {
        price: 100,
        big: true,
        reminder: 10000,
        date: Date.parse('2003-07-01'),
        tag: 'maintainance',
      },
      {
        price: 100,
        big: false,
        reminder: 10000,
        date: Date.parse('2003-05-01'),
        tag: 'maintainance',
      },
    ],
    repair: [
      {
        price: 7000,
        comment: 'Nije radilo kvacilo',
        date: Date.parse('2003-01-02'),
        tag: 'repair',
      },
      {
        price: 7000,
        comment: 'Opet nije radilo kvacilo znaci ja ne znam sta da radim vise',
        date: Date.parse('2003-01-03'),
        tag: 'repair',
      },
    ],
    crashes: [
      {
        price: 7000,
        comment: 'velik sudar',
        date: Date.parse('2004-01-02'),
        tag: 'crashes',
      },
      {
        price: 7000,
        comment: 'lancani sudar',
        date: Date.parse('2006-01-05'),
        tag: 'crashes',
      },
    ],
    equipment: [
      {
        price: 7000,
        comment: 'olovka',
        date: Date.parse('2013-01-03'),
        tag: 'equipment',
      },
      {
        price: 7000,
        comment: 'zvucnik',
        date: Date.parse('2023-01-03'),
        tag: 'equipment',
      },
    ],
    tickets: [
      {
        price: 7000,
        comment: 'jos brza voznja',
        date: Date.parse('2003-01-04'),
        tag: 'tickets',
      },
      {
        price: 7000,
        comment: 'brza voznja',
        date: Date.parse('2006-01-04'),
        tag: 'tickets',
      },
    ],
    carWash: [
      {
        price: 5,
        date: Date.parse('2500-02-24'),
        tag: 'carWash',
      },
      {
        price: 3,
        date: Date.parse('2400-02-24'),
        tag: 'carWash',
      },
      {
        price: 4,
        date: Date.parse('2600-02-22'),
        tag: 'carWash',
      },
    ],
    other: [
      {
        price: 400,
        comment: 'Auto za miris',
        date: Date.parse('2000-10-10'),
        tag: 'other',
      },
      {
        price: 100,
        comment: 'Miris za auto',
        date: Date.parse('2000-10-11'),
        tag: 'other',
      },
    ],
  });

  const addItem = () => {
    setModalVisible(true);
    controller.close();
  };

  const returnData = () => {
    let returnDataValue;
    if (selectedCategoryValue === 'all')
      returnDataValue = [
        ...data.fuel,
        ...data.carWash,
        ...data.crashes,
        ...data.equipment,
        data.insurance,
        ...data.maintainance,
        ...data.repair,
        ...data.other,
        data.registration,
        ...data.tickets,
      ];
    else if (selectedCategoryValue === 'fuel') returnDataValue = [...data.fuel];
    else if (selectedCategoryValue === 'registration')
      returnDataValue = [...data.registration, ...data.insurance];
    else if (selectedCategoryValue === 'maintainance')
      returnDataValue = [...data.maintainance, ...data.repair];
    else if (selectedCategoryValue === 'crashes')
      returnDataValue = [...data.crashes];
    else if (selectedCategoryValue === 'equipment')
      returnDataValue = [
        ...data.equipment,
        ...data.tickets,
        ...data.carWash,
        ...data.other,
      ];

    return sortResults(returnDataValue, 'date', false);
  };

  const renderItem = (stuff) => {
    const item = stuff.item;
    switch (item.tag) {
      case 'fuel':
        return <Fuel item={item} />;
      case 'registration':
        return <Registration item={item} />;
      case 'insurance':
        return <Insurance item={item} />;
      case 'maintainance':
        return <Maintainance item={item} />;
      case 'repair':
        return <Repair item={item} />;
      case 'crashes':
        return <Crash item={item} />;
      case 'equipment':
        return <Equipment item={item} />;
      case 'tickets':
        return <Tickets item={item} />;
      case 'carWash':
        return <CarWash item={item} />;
      case 'other':
        return <Other item={item} />;
    }
  };

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

  const toggleDropDownMenu = () => {
    controller.toggle();
    setIconNameDependency(!iconNameDependency);
  };

  const addItemToArray = (inputData, tag, mileage = 0) => {
    if (mileage) {
    }
    let nextData = data;
    nextData[inputData.tag].push(inputData);
    setData(nextData);
  };

  return (
    <View style={[styles.screenContainer, {backgroundColor: categoryColor}]}>
      <Header navigation={navigation} backButtonVisible={true} route={route} />
      <View style={styles.wholeBody}>
        <View style={[styles.bodyContainer, {backgroundColor: categoryColor}]}>
          <View style={styles.body}>
            <FlatList
              onScrollBeginDrag={() => {
                controller.close();
              }}
              ref={(ref) => (flatList = ref)}
              data={returnData()}
              keyExtractor={(item) => (Math.random() * 10000).toString()}
              contentContainerStyle={styles.flatList}
              renderItem={(item) => renderItem(item)}
            />
          </View>
        </View>

        <View
          style={[
            styles.bodyHeader,
            Constants.OS === 'ios' ? {zIndex: 100} : {},
          ]}>
          <View style={styles.titleContainer}>
            <View style={styles.titleTopContainer}>
              <AppText
                style={{textAlign: 'center', marginBottom: 15}}
                size={30}
                bold
                color={Constants.white}>
                {selectedCategory.label}
              </AppText>
              {/* {getCategoryIcon(selectedCategoryValue, categoryIconColor)} */}
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
              <DropDownPicker
                controller={(instance) => (controller = instance)}
                items={InputCategories}
                defaultValue={selectedCategoryValue}
                onChangeItem={(item) => {
                  flatList.scrollToOffset({animated: false, offset: 0});
                  setIconNameDependency(false);
                  setSelectedCategory(item);
                }}
                placeholder="Odaberite Unosnu Kategoriju"
                arrowColor={categoryColor}
                arrowSize={15}
                showArrow={false}
                style={[
                  styles.dropDownPickerStyle,
                  {
                    backgroundColor:
                      InputTypeColors[selectedCategoryValue + 'Accent'],
                  },
                ]}
                containerStyle={styles.dropDownPickerContainerStyle}
                dropDownStyle={styles.dropDownStyle}
                placeholderStyle={styles.dropDownPickerPlaceholder}
                labelStyle={styles.dropDownPickerLabel}
                selectedLabelStyle={styles.dropDownPickerSelectedLabel}
                itemStyle={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              />
            </View>

            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                alignItems: 'center',
                bottom: 3,
                backgroundColor:
                  InputTypeColors[selectedCategoryValue + 'Accent'],
                paddingHorizontal: 5,
                borderRadius: 5,
              }}>
              <AppText
                color={Constants.white}
                style={{marginRight: 3}}
                size={15}
                bold>
                Kategorije
              </AppText>
              <FontAwesomeIcon
                name={iconName}
                color={Constants.white}
                size={14}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={1}
            style={[styles.titleContainer, styles.touchable]}
            onPress={() => toggleDropDownMenu()}>
            <View />
          </TouchableOpacity>
        </View>
      </View>

      {selectedCategoryValue !== 'all' && (
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            onPress={() => addItem()}
            activeOpacity={0.7}
            style={[
              styles.floatingAddButton,
              {backgroundColor: categoryColor, shadowColor: categoryColor},
            ]}>
            <EntypoIcon name="add-to-list" size={24} color={Constants.white} />
          </TouchableOpacity>
        </View>
      )}

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

          {selectedCategoryValue === 'fuel' ? (
            <FuelModal
              addItem={addItemToArray}
              closeModal={() => setModalVisible(false)}
              selectedCategoryValue={selectedCategoryValue}
            />
          ) : selectedCategoryValue === 'crashes' ? (
            <CrashesModal
              addItem={addItemToArray}
              closeModal={() => setModalVisible(false)}
              selectedCategoryValue={selectedCategoryValue}
            />
          ) : selectedCategoryValue === 'maintainance' ? (
            <MaintainanceModal
              addItem={addItemToArray}
              closeModal={() => setModalVisible(false)}
              selectedCategoryValue={selectedCategoryValue}
            />
          ) : selectedCategoryValue === 'equipment' ? (
            <EquipmentModal
              addItem={addItemToArray}
              closeModal={() => setModalVisible(false)}
              selectedCategoryValue={selectedCategoryValue}
            />
          ) : (
            <RegistrationModal
              addItem={addItemToArray}
              closeModal={() => setModalVisible(false)}
              selectedCategoryValue={selectedCategoryValue}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Constants.primaryDark,
  },
  wholeBody: {
    flex: 1,
  },
  bodyHeader: {
    width: '100%',
    height:
      Constants.height > 800
        ? Constants.height * 0.92 * 0.16
        : Constants.height * 0.92 * 0.2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  titleContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
  },
  touchable: {
    position: 'absolute',
    width: Constants.width,
    height:
      Constants.height > 800
        ? Constants.height * 0.92 * 0.16
        : Constants.height * 0.92 * 0.2,
  },
  titleTopContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    flex: 1,
  },
  dropDownPickerContainerStyle: {
    width: '80%',
    // height: 25,
  },
  dropDownPickerStyle: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 0,
    borderColor: Constants.background,
    paddingStart: 0,
  },
  dropDownPickerLabel: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 18,
    color: Constants.gray,
    flexShrink: 1,
  },
  dropDownPickerSelectedLabel: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 1,
    opacity: 0,
    color: Constants.background,
    textAlign: 'center',
  },
  dropDownPickerPlaceholder: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 16,
    color: Constants.gray,
  },
  dropDownStyle: {
    backgroundColor: Constants.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 1,
    paddingBottom: 2,
    paddingTop: 0,
  },

  bodyContainer: {
    width: '100%',
    height:
      Constants.height > 800
        ? Constants.height * 0.92 * 0.84 - Constants.height * 0.13
        : Constants.height * 0.92 * 0.8 - Constants.height * 0.06,
    top:
      Constants.height > 800
        ? Constants.height * 0.92 * 0.16
        : Constants.height * 0.92 * 0.2,
  },
  body: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Constants.white,
  },
  flatList: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Constants.white,
    borderRadius: 100,
  },
  floatingAddButton: {
    padding: 20,
    borderRadius: 100,
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000' + '80',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InputScreen;
