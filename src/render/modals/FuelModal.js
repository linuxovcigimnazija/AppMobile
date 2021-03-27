import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AppText from '../../components/AppText';
import CancelAndSaveButtons from '../../components/CancelAndSaveButtons';
import Constants from '../../constants/Constants';
import InputTypeColors from '../../constants/InputTypeColors';
import {MaterialCommunityIcon} from '../../utils/Functions';

export default function FuelModal({
  selectedCategoryValue,
  closeModal,
  addItem,
  currency,
}) {
  //DATA
  const [discount, setDiscount] = useState(false);
  const [price, setPrice] = useState();
  const [mileage, setMileage] = useState();
  const [volume, setVolume] = useState();
  const [pricePerLiter, setPricePerLiter] = useState();
  

  const onSavePressed = () => {
    let data;
    if (!price || !mileage || !volume || (discount && !pricePerLiter)) return;
    data = {
      price: price,
      volume: volume,
      date: Date.now(),
      discount: discount,
      mileage: mileage,
      pricePerLiter: discount
        ? pricePerLiter.toFixed(2)
        : (price / volume).toFixed(2),
      mileage: mileage,
      tag: 'fuel',
    };
    addItem(data, 'fuel', mileage);
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
            Unesite Gorivo
          </AppText>

          <View style={styles.body}>
            <View
              style={[
                inputStyles.inputHolder,
                {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginBottom: 0,
                },
              ]}>
              <AppText size={18} bold color={Constants.white}>
                Ukupna kilometraža:
              </AppText>
              <View style={[inputStyles.inputContainer, {marginTop: 5}]}>
                <TextInput
                  selectionColor={Constants.lightBlue}
                  style={[
                    inputStyles.input,
                    {width: Constants.width * 0.8 * 0.3, marginLeft: 0},
                  ]}
                  keyboardType="number-pad"
                  onChangeText={(text) => setMileage(parseInt(text, 10))}
                />
                <AppText color={Constants.white}> km</AppText>
              </View>
            </View>

            <View style={inputStyles.inputHolder}>
              <AppText size={18} bold color={Constants.white}>
                Ukupna cijena:
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

            <View style={inputStyles.inputHolder}>
              <AppText size={18} bold color={Constants.white}>
                Broj litara:
              </AppText>
              <View style={inputStyles.inputContainer}>
                <TextInput
                  selectionColor={Constants.lightBlue}
                  style={inputStyles.input}
                  keyboardType="number-pad"
                  onChangeText={(text) => setVolume(parseInt(text, 10))}
                />
                <AppText color={Constants.white}> litara</AppText>
              </View>
            </View>

            <TouchableOpacity
              style={styles.checkbox}
              activeOpacity={1}
              onPress={() => setDiscount(!discount)}>
              <AppText color={Constants.white} size={18}>
                Imate popust?
              </AppText>
              <MaterialCommunityIcon
                name={
                  discount
                    ? 'checkbox-marked-outline'
                    : 'checkbox-blank-outline'
                }
                color={Constants.white}
                size={20}
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>

            <View
              style={[inputStyles.inputHolder, {opacity: discount ? 1 : 0}]}>
              <AppText size={18} bold color={Constants.white}>
                Cijena po litru:
              </AppText>
              <View style={inputStyles.inputContainer}>
                <TextInput
                  selectionColor={Constants.lightBlue}
                  editable={discount}
                  style={inputStyles.input}
                  keyboardType="decimal-pad"
                  onChangeText={(text) => setPricePerLiter(parseFloat(text))}
                />
                <AppText color={Constants.white}> {currency} / l</AppText>
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
    justifyContent: 'space-evenly',
  },
  checkbox: {
    paddingTop: 15,
    flexDirection: 'row',
    width: '70%',
    alignItems: 'flex-end',
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
