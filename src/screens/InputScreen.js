import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Header from '../components/Header';
import Constants from '../constants/Constants';
import AppText from '../components/AppText';
import DropDownPicker from 'react-native-dropdown-picker';
import InputCategories from '../constants/InputCategories';
import InputTypeColors from '../constants/InputTypeColors';
import {getCategoryIcon} from '../utils/Functions';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const InputScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('fuel');
  let categoryColor = InputTypeColors[selectedCategory];
  let categoryIconColor = Constants.white;

  const addItem = () => {};

  const renderItem = (item) => {
    return (
      <View>
        <AppText>dsakjsa</AppText>
      </View>
    );
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
            itemStyle={{justifyContent: 'flex-start'}}
          />
          {getCategoryIcon(selectedCategory, categoryIconColor)}
        </View>

        <View style={[styles.bodyContainer, {backgroundColor: categoryColor}]}>
          <View style={styles.body}>
            <FlatList
              data={[0, 1, 2, 3, 4, 5, 6]}
              keyExtractor={(item) => item.toString()}
              style={styles.flatList}
              renderItem={(item) => renderItem(item)}
            />
          </View>
        </View>
      </View>

      {selectedCategory !== 'all' && (
        <TouchableOpacity
          onPress={() => addItem()}
          activeOpacity={0.7}
          style={[
            styles.floatingAddButton,
            {backgroundColor: categoryColor, shadowColor: categoryColor},
          ]}>
          <EntypoIcon name="add-to-list" size={24} color={Constants.white} />
        </TouchableOpacity>
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
    height: (Constants.height - Constants.height * 0.08) * 0.2,
    paddingHorizontal: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute', // IMPORTANT FOR COOL ANIMATION ON SCROLL
  },
  dropDownPickerContainerStyle: {
    width: '60%',
    height: '50%',
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
    textAlign: 'center',
    alignSelf: 'center',
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
    width: '100%',
    marginTop: (Constants.height - Constants.height * 0.08) * 0.2,
  },
  body: {
    height: (Constants.height - Constants.height * 0.08) * 0.8,
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Constants.background,
  },
  flatList: {
    flex: 1,
    padding: 20,
    marginTop: 3,
  },
  floatingAddButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
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
