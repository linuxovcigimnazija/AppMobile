import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import AppText from '../../components/AppText';
import CancelAndSaveButtons from '../../components/CancelAndSaveButtons';
import Constants from '../../constants/Constants';
import InputTypeColors from '../../constants/InputTypeColors';

export default function CrashesModal({selectedCategoryValue, closeModal}) {
  const currency = 'KM';

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
        Unesite Ostecenje
      </AppText>

      <View style={styles.body}>
        <View style={inputStyles.inputHolder}>
          <AppText size={18} bold color={Constants.white}>
            Cijena stete:
          </AppText>
          <View style={inputStyles.inputContainer}>
            <TextInput
              selectionColor={Constants.lightBlue}
              style={inputStyles.input}
            />
            <AppText color={Constants.white}> {currency}</AppText>
          </View>
        </View>

        <View style={styles.body}>
          <View style={inputStyles.inputHolder}>
            <AppText size={18} bold color={Constants.white}>
              Opis:
            </AppText>
            <View style={inputStyles.inputContainer}>
              <TextInput
                selectionColor={Constants.lightBlue}
                style={[
                  inputStyles.input,
                  {width: Constants.width * 0.85 * 0.5, textAlign: 'left'},
                ]}
              />
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
              Datum udesa:
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

        <CancelAndSaveButtons
          closeModal={closeModal}
          selectedCategoryValue={selectedCategoryValue}
        />
      </View>
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
