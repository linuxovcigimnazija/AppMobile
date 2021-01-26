import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AppText from '../../components/AppText';
import CancelAndSaveButtons from '../../components/CancelAndSaveButtons';
import Constants from '../../constants/Constants';
import InputTypeColors from '../../constants/InputTypeColors';
import DropDownPicker from 'react-native-dropdown-picker';
import SubCategories from '../../constants/SubCategories';

export default function EquipmentModal({
  selectedCategoryValue,
  closeModal,
  addItem,
  currency,
}) {
  const [selectedSubcategory, setSelectedSubcategory] = useState('equipment');

  //DATA
  const [comment, setComment] = useState();
  const [price, setPrice] = useState();

  const onSavePressed = () => {
    let data;
    if (selectedSubcategory === 'carWash') {
      if (!price) return;
      data = {
        price: price,
        date: Date.now(),
        tag: selectedSubcategory,
      };
    } else {
      if (!comment || !price) return;
      data = {
        price: price,
        date: Date.now(),
        comment: comment,
        tag: selectedSubcategory,
      };
    }
    addItem(data, 'equipment');
    closeModal();
  };

  return (
    <KeyboardAvoidingView
      behavior={Constants.OS === 'ios' ? 'padding' : 'none'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            Odaberite Stavku za Unos
          </AppText>

          <DropDownPicker
            items={SubCategories[selectedCategoryValue]}
            defaultValue={'equipment'}
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
            <View style={inputStyles.inputHolder}>
              <AppText size={18} bold color={Constants.white}>
                Cijena:
              </AppText>
              <View style={inputStyles.inputContainer}>
                <TextInput
                  selectionColor={Constants.lightBlue}
                  style={inputStyles.input}
                  keyboardType="number-pad"
                  onChangeText={(text) => setPrice(parseInt(text, 10))}
                />
                <AppText color={Constants.white}> {currency}</AppText>
              </View>
            </View>

            <View
              style={[
                inputStyles.inputHolder,
                {
                  opacity: selectedSubcategory === 'carWash' ? 0 : 1,
                  marginBottom: 30,
                },
              ]}>
              <AppText size={18} bold color={Constants.white}>
                Opis:
              </AppText>
              <View style={inputStyles.inputContainer}>
                <TextInput
                  maxLength={selectedSubcategory === 'equipment' ? 20 : 25}
                  editable={selectedSubcategory === 'carWash' ? false : true}
                  selectionColor={Constants.lightBlue}
                  style={[
                    inputStyles.input,
                    {width: Constants.width * 0.85 * 0.5, textAlign: 'left'},
                  ]}
                  onChangeText={(text) => setComment(text)}
                />
              </View>
            </View>
          </View>

          <CancelAndSaveButtons
            closeModal={closeModal}
            selectedCategoryValue={selectedCategoryValue}
            onSavePressed={onSavePressed}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: Constants.width * 0.85,
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
