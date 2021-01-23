import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AppText from '../../components/AppText';
import CancelAndSaveButtons from '../../components/CancelAndSaveButtons';
import Constants from '../../constants/Constants';
import InputTypeColors from '../../constants/InputTypeColors';
import SubCategories from '../../constants/SubCategories';

export default function RegistrationModal({selectedCategoryValue, closeModal}) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    'registration',
  );
  const currency = 'EUR';

  const Insurance = () => {
    return (
      <View>
        <View style={inputStyles.inputHolder}>
          <AppText size={18} bold color={Constants.white}>
            Cijena:
          </AppText>
          <View style={inputStyles.inputContainer}>
            <TextInput
              selectionColor={Constants.lightBlue}
              style={inputStyles.input}
            />
            <AppText color={Constants.white}> {currency}</AppText>
          </View>
        </View>

        <View
          style={[
            inputStyles.inputHolder,
            {
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginBottom: 30,
            },
          ]}>
          <AppText size={18} bold color={Constants.white}>
            Datum osiguravanja vozila:
          </AppText>
          <View style={[inputStyles.inputContainer, {marginTop: 10}]}>
            <TextInput
              selectionColor={Constants.lightBlue}
              style={[inputStyles.input, {marginLeft: 0}]}
            />
            <AppText size={14} color={Constants.white} style={{opacity: 0.9}}>
              {' '}
              DD-MM-GGGG
            </AppText>
          </View>
        </View>
      </View>
    );
  };

  const Registration = () => {
    return (
      <View>
        <View style={inputStyles.inputHolder}>
          <AppText size={18} bold color={Constants.white}>
            Cijena:
          </AppText>
          <View style={inputStyles.inputContainer}>
            <TextInput
              selectionColor={Constants.lightBlue}
              style={inputStyles.input}
            />
            <AppText color={Constants.white}> {currency}</AppText>
          </View>
        </View>

        <View
          style={[
            inputStyles.inputHolder,
            {
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginBottom: 30,
            },
          ]}>
          <AppText size={18} bold color={Constants.white}>
            Datum registrovanja vozila:
          </AppText>
          <View style={[inputStyles.inputContainer, {marginTop: 10}]}>
            <TextInput
              selectionColor={Constants.lightBlue}
              style={[inputStyles.input, {marginLeft: 0, width: '40%'}]}
            />
            <AppText size={14} color={Constants.white} style={{opacity: 0.9}}>
              {' '}
              DD-MM-GGGG
            </AppText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.modalContainer,
        {
          backgroundColor: InputTypeColors[selectedCategoryValue],
          borderColor: InputTypeColors[selectedCategoryValue + 'Accent'],
        },
      ]}>
      <AppText
        style={{textAlign: 'center'}}
        color={Constants.white}
        size={28}
        bold>
        Unesite Registraciju ili Osiguranje
      </AppText>

      <DropDownPicker
        items={SubCategories[selectedCategoryValue]}
        defaultValue={'registration'}
        arrowColor={InputTypeColors[selectedCategoryValue + 'Accent']}
        arrowSize={14}
        showArrow={true}
        style={[
          styles.dropDownPickerStyle,
          {borderColor: InputTypeColors[selectedCategoryValue + 'Accent']},
        ]}
        containerStyle={styles.dropDownPickerContainerStyle}
        dropDownStyle={[
          styles.dropDownStyle,
          {
            borderColor: InputTypeColors[selectedCategoryValue + 'Accent'],
            backgroundColor: InputTypeColors[selectedCategoryValue],
          },
        ]}
        placeholderStyle={styles.dropDownPickerPlaceholder}
        labelStyle={styles.dropDownPickerLabel}
        selectedLabelStyle={styles.dropDownPickerSelectedLabel}
        onChangeItem={(item) => setSelectedSubcategory(item.value)}
      />

      <View style={styles.body}>
        {selectedSubcategory === 'registration' ? (
          <Registration />
        ) : (
          <Insurance />
        )}
      </View>

      <CancelAndSaveButtons
        closeModal={closeModal}
        selectedCategoryValue={selectedCategoryValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: '85%',
    borderRadius: 15,
    borderWidth: 5,
    padding: 20,
    alignItems: 'center',
  },
  body: {
    width: '100%',
    marginVertical: 10,
  },

  dropDownPickerContainerStyle: {
    width: '55%',
    height: 35,
    marginTop: 15,
    alignSelf: 'center',
    marginBottom: '1%',
  },
  dropDownPickerStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingStart: 0,
  },
  dropDownStyle: {
    borderTopWidth: 1,
    borderWidth: 1.5,
  },
  dropDownPickerPlaceholder: {
    fontFamily: 'Ubuntu-Bold',
    color: Constants.black,
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
    fontFamily: 'Ubuntu-Regular',
    fontSize: 15,
    color: Constants.white,
  },
});

const inputStyles = StyleSheet.create({
  inputHolder: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    // justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    textAlign: 'right',
    borderWidth: 2,
    borderColor: Constants.white,
    borderRadius: 5,
    height: 30,
    marginLeft: 10,
    width: Constants.width * 0.85 * 0.2,
    paddingVertical: 0,
    fontFamily: 'Ubuntu-Bold',
    color: Constants.white,
    paddingHorizontal: 10,
  },
});
