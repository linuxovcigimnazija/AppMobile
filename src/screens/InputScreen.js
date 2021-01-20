/* eslint-disable curly */
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Header from '../components/Header';
import Constants from '../constants/Constants';
import AppText from '../components/AppText';
import DropDownPicker from 'react-native-dropdown-picker';
import InputCategories from '../constants/InputCategories';
import InputTypeColors from '../constants/InputTypeColors';
import {getCategoryIcon, sortResults} from '../utils/Functions';
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

const InputScreen = ({navigation, route}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    route.params.category.toLowerCase(),
  );
  let categoryColor = InputTypeColors[selectedCategory];
  let categoryIconColor = Constants.white;

  const [data, setData] = useState({
    fuel: [
      {
        price: 150,
        volume: 50,
        discount: true,
        pricePerLiter: 2.2,
        date: Date.parse('2003-01-16'),
        tag: 'fuel',
      },
      {
        price: 130,
        volume: 30,
        discount: false,
        pricePerLiter: 2.54,
        date: Date.parse('2003-02-01'),
        tag: 'fuel',
      },
    ],
    registration: {
      price: 400,
      date: Date.parse('2003-02-07'),
      tag: 'registration',
    },
    insurance: {
      price: 600,
      date: Date.parse('2003-07-05'),
      tag: 'insurance',
    },
    maintaincance: [
      {
        price: 100,
        big: true,
        reminder: 10000,
        reminderUsed: false,
        date: Date.parse('2003-07-01'),
        tag: 'maintainance',
      },
      {
        price: 100,
        big: false,
        reminder: 10000,
        reminderUsed: true,
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

  const addItem = () => {};

  const returnData = () => {
    let returnDataValue;
    if (selectedCategory === 'all')
      returnDataValue = [
        ...data.fuel,
        ...data.carWash,
        ...data.crashes,
        ...data.equipment,
        data.insurance,
        ...data.maintaincance,
        ...data.repair,
        ...data.other,
        data.registration,
        ...data.tickets,
      ];
    else if (selectedCategory === 'fuel') returnDataValue = [...data.fuel];
    else if (selectedCategory === 'registration')
      returnDataValue = [data.registration, data.insurance];
    else if (selectedCategory === 'maintainance')
      returnDataValue = [...data.maintaincance, ...data.repair];
    else if (selectedCategory === 'crashes')
      returnDataValue = [...data.crashes];
    else if (selectedCategory === 'equipment')
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

  return (
    <View style={[styles.screenContainer, {backgroundColor: categoryColor}]}>
      <Header navigation={navigation} backButtonVisible={true} />
      <View style={styles.wholeBody}>
        <View
          style={[
            styles.bodyHeader,
            Constants.OS === 'ios' ? {zIndex: 100} : {},
          ]}>
          <DropDownPicker
            items={InputCategories}
            defaultValue={selectedCategory}
            onChangeItem={(item) => setSelectedCategory(item.value)}
            placeholder="Odaberite Unosnu Kategoriju"
            arrowColor={categoryColor}
            arrowSize={24}
            showArrow={true}
            style={styles.dropDownPickerStyle}
            containerStyle={styles.dropDownPickerContainerStyle}
            dropDownStyle={styles.dropDownStyle}
            placeholderStyle={styles.dropDownPickerPlaceholder}
            labelStyle={styles.dropDownPickerLabel}
            selectedLabelStyle={styles.dropDownPickerSelectedLabel}
            itemStyle={{justifyContent: 'flex-start', alignItems: 'center'}}
          />
          {getCategoryIcon(selectedCategory, categoryIconColor)}
        </View>

        <View style={[styles.bodyContainer, {backgroundColor: categoryColor}]}>
          <View style={styles.body}>
            <FlatList
              data={returnData()}
              keyExtractor={(item) => item.date.toString()}
              contentContainerStyle={styles.flatList}
              style={{marginTop: 3}}
              renderItem={(item) => renderItem(item)}
            />
          </View>
        </View>
      </View>

      {selectedCategory !== 'all' && (
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
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Constants.background,
  },
  wholeBody: {
    flex: 1,
  },
  bodyHeader: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropDownPickerContainerStyle: {
    width: '60%',
    height: '60%',
  },
  dropDownPickerStyle: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 5,
    borderColor: Constants.primaryLight,
    backgroundColor: Constants.white,
    paddingStart: 0,
  },
  dropDownPickerLabel: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 16,
    color: Constants.gray,
    textAlign: 'left',
    alignSelf: 'center',
    flexShrink: 1,
  },
  dropDownPickerSelectedLabel: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 22,
    color: Constants.gray,
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
  },

  bodyContainer: {
    flex: 4,
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
});

export default InputScreen;
