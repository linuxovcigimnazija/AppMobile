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
import {TextInputMask} from 'react-native-masked-text';
import {invertDate} from '../../utils/Functions';

export default function CrashesModal({
  selectedCategoryValue,
  closeModal,
  addItem,
  currency,
}) {
  //DATA
  const [date, setDate] = useState('');
  const [price, setPrice] = useState();
  const [comment, setComment] = useState();

  const onSavePressed = () => {
    let data;
    if (!date || !price || !comment) return;
    data = {
      price: price,
      comment: comment,
      date: Date.parse(invertDate(date)),
      tag: 'crashes',
    };
    addItem(data, 'crashes');
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
            Unesite Oštećenje
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
                  keyboardType="number-pad"
                  onChangeText={(text) => setPrice(parseInt(text, 10))}
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
                    maxLength={25}
                    selectionColor={Constants.lightBlue}
                    style={[
                      inputStyles.input,
                      {width: Constants.width * 0.85 * 0.5, textAlign: 'left'},
                    ]}
                    onChangeText={(text) => setComment(text)}
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
                  <TextInputMask
                    type={'datetime'}
                    options={{
                      format: 'DD-MM-YYYY',
                    }}
                    value={date}
                    onChangeText={(text) => {
                      setDate(text);
                    }}
                    selectionColor={Constants.lightBlue}
                    style={[
                      inputStyles.input,
                      {textAlign: 'left', marginLeft: 0, width: '40%'},
                    ]}
                  />
                  <AppText
                    size={14}
                    color={Constants.white}
                    style={{opacity: 0.9}}>
                    {' '}
                    DD-MM-GGGG
                  </AppText>
                </View>
              </View>
            </View>

            <CancelAndSaveButtons
              closeModal={closeModal}
              selectedCategoryValue={selectedCategoryValue}
              onSavePressed={onSavePressed}
            />
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
