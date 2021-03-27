import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AppText from '../../components/AppText';
import CancelAndSaveButtons from '../../components/CancelAndSaveButtons';
import Constants from '../../constants/Constants';
import InputTypeColors from '../../constants/InputTypeColors';
import CarManifacturers from '../../constants/CarManifacturers';
import FuelTypes from '../../constants/FuelTypes';
import {TextInputMask} from 'react-native-masked-text';
import {invertDate, getLogo, FontAwesomeIcon} from '../../utils/Functions';
import FastImage from 'react-native-fast-image';

export default function CarModal({closeModal, addItem, id}) {
  //DATA
  const [selectedManifacturer, setSelectedManifacturer] = useState();
  const [name, setName] = useState();
  const [HP, setHP] = useState();
  const [volume, setVolume] = useState();
  const [selectedFuelType, setSelectedFuelType] = useState();

  const onSavePressed = () => {
    let data;
    if (!selectedFuelType || !selectedManifacturer || !name || !HP || !volume)
      return;

    data = {
      brand: selectedManifacturer,
      name: name,
      fuel: selectedFuelType,
      horsepower: HP,
      sizeInLiters: volume,
      id: id,
      mileage: 0,
      data: {
        fuel: [],
        registration: [],
        insurance: [],
        maintainance: [],
        repair: [],
        crashes: [],
        equipment: [],
        tickets: [],
        carWash: [],
        other: [],
      },
    };

    addItem(data);
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
              backgroundColor: Constants.primary,
              borderColor: Constants.primaryDark,
            },
          ]}>
          <AppText
            style={{textAlign: 'center'}}
            color={Constants.white}
            size={28}
            bold>
            Unesite Novo Vozilo
          </AppText>

          <View
            style={
              Constants.OS === 'ios'
                ? {
                    flexDirection: 'row',
                    width: Constants.width * 0.85 - 20,
                    justifyContent: 'space-evenly',
                    marginVertical: 10,
                    zIndex: 1000,
                  }
                : {
                    flexDirection: 'row',
                    width: Constants.width * 0.85 - 20,
                    justifyContent: 'space-evenly',
                    marginVertical: 10,
                  }
            }>
            <View style={styles.logoContainer}>
              {selectedManifacturer ? (
                <FastImage
                  source={getLogo(selectedManifacturer)}
                  style={styles.brandLogo}
                />
              ) : (
                <FontAwesomeIcon
                  name="question-circle"
                  size={Constants.width * 0.1}
                  color={Constants.gray}
                />
              )}
            </View>

            <DropDownPicker
              searchablePlaceholder="Unesite Marku..."
              searchablePlaceholderTextColor={Constants.background}
              searchableStyle={{
                fontFamily: 'Ubuntu-Regular',
                color: Constants.background,
              }}
              searchableError={() => <AppText>Nije pronadjeno</AppText>}
              items={CarManifacturers}
              searchable={true}
              arrowColor={Constants.primaryDark}
              arrowSize={14}
              showArrow={true}
              style={[
                styles.dropDownPickerStyle,
                {borderColor: Constants.primaryDark},
              ]}
              containerStyle={styles.dropDownPickerContainerStyle}
              dropDownStyle={[
                styles.dropDownStyle,
                {
                  borderColor: Constants.primaryDark,
                  backgroundColor: Constants.primary,
                },
              ]}
              placeholder="Odaberite Marku"
              placeholderStyle={styles.dropDownPickerPlaceholder}
              labelStyle={styles.dropDownPickerLabel}
              selectedLabelStyle={styles.dropDownPickerSelectedLabel}
              onChangeItem={(item) => {
                setSelectedManifacturer(item.value);
              }}
            />
          </View>

          <View style={styles.body}>
            <View>
              <View style={inputStyles.inputHolder}>
                <AppText size={18} bold color={Constants.white}>
                  Model:
                </AppText>
                <View style={inputStyles.inputContainer}>
                  <TextInput
                    maxLength={15}
                    selectionColor={Constants.lightBlue}
                    style={[
                      inputStyles.input,
                      {width: '70%', textAlign: 'left'},
                    ]}
                    onChangeText={(text) => setName(text)}
                  />
                </View>
              </View>
            </View>

            <View
              style={[
                inputStyles.inputHolder,
                {
                  zIndex: Constants.OS === 'ios' ? 1000 : undefined,
                },
              ]}>
              <AppText size={18} bold color={Constants.white}>
                Tip goriva:
              </AppText>
              <View style={inputStyles.inputContainer}>
                <DropDownPicker
                  items={FuelTypes}
                  arrowColor={Constants.primaryDark}
                  arrowSize={14}
                  showArrow={true}
                  style={[
                    styles.dropDownPickerStyle,
                    {borderColor: Constants.primaryDark},
                  ]}
                  containerStyle={[
                    styles.dropDownPickerContainerStyle,
                    {marginTop: 0, marginLeft: 10, width: '75%'},
                  ]}
                  dropDownStyle={[
                    styles.dropDownStyle,
                    {
                      borderColor: Constants.primaryDark,
                      backgroundColor: Constants.primary,
                      height: undefined,
                    },
                  ]}
                  placeholder="Tip goriva"
                  placeholderStyle={styles.dropDownPickerPlaceholder}
                  labelStyle={styles.dropDownPickerLabel}
                  selectedLabelStyle={styles.dropDownPickerSelectedLabel}
                  onChangeItem={(item) => {
                    setSelectedFuelType(item.value);
                  }}
                />
              </View>
            </View>

            <View style={inputStyles.inputHolder}>
              <AppText size={18} bold color={Constants.white}>
                Konjskih snaga:
              </AppText>
              <View style={inputStyles.inputContainer}>
                <TextInput
                  keyboardType="number-pad"
                  selectionColor={Constants.lightBlue}
                  style={[inputStyles.input]}
                  onChangeText={(text) => setHP(parseInt(text, 10))}
                />
                <AppText color={Constants.white} size={14}>
                  {' '}
                  KS
                </AppText>
              </View>
            </View>

            <View style={inputStyles.inputHolder}>
              <AppText size={18} bold color={Constants.white}>
                Veličina motora:
              </AppText>
              <View style={inputStyles.inputContainer}>
                <TextInput
                  keyboardType="decimal-pad"
                  selectionColor={Constants.lightBlue}
                  style={[inputStyles.input]}
                  onChangeText={(text) =>
                    setVolume(parseFloat(text).toFixed(1))
                  }
                />
                <AppText color={Constants.white} size={14}>
                  {' '}
                  L
                </AppText>
              </View>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: Constants.white + '40',
                  borderColor: Constants.primaryDark,
                },
              ]}
              onPress={() => closeModal()}
              activeOpacity={0.7}>
              <AppText size={16} color={Constants.white}>
                Otkaži
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: Constants.primaryDark,
                  borderColor: Constants.primaryDark,
                },
              ]}
              onPress={onSavePressed}
              activeOpacity={0.7}>
              <AppText size={16} color={Constants.white}>
                Unesite
              </AppText>
            </TouchableOpacity>
          </View>
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

  logoContainer: {
    height: Constants.width * 0.18,
    width: Constants.width * 0.18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.white,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Constants.primaryLight,
  },
  brandLogo: {
    aspectRatio: 1,
    width: Constants.width * 0.1,
    borderRadius: 10, // maybe this could look good
  },

  dropDownPickerContainerStyle: {
    width: '65%',
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
    height: 200,
  },
  dropDownPickerPlaceholder: {
    fontFamily: 'Ubuntu-Bold',
    color: Constants.background,
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
    fontFamily: 'Ubuntu-Bold',
    fontSize: 15,
    color: Constants.white,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
  },
  button: {
    borderRadius: 100,
    borderWidth: 1,
    width: '40%',
    paddingVertical: 5,
    alignItems: 'center',
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
