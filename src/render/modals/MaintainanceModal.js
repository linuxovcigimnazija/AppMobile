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
import DropDownPicker from 'react-native-dropdown-picker';
import SubCategories from '../../constants/SubCategories';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInputMask} from 'react-native-masked-text';
import {invertDate} from '../../utils/Functions';

export default function MaintainanceModal({
  selectedCategoryValue,
  closeModal,
  addItem,
  currency,
  currentMileage,
}) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    'maintainance',
  );

  //DATA
  const [big, setBig] = useState(false);
  const [price, setPrice] = useState();
  const [comment, setComment] = useState();
  const [reminder, setReminder] = useState();
  const [date, setDate] = useState('');

  const onSavePressed = () => {
    let data;
    if (selectedSubcategory === 'maintainance') {
      if (!price || !reminder) return;
      data = {
        price: price,
        big: big,
        date: Date.now(),
        reminder: reminder,
        mileage: currentMileage,
        tag: selectedSubcategory,
      };
    } else {
      if (!comment || !price || !date) return;
      data = {
        price: price,
        date: Date.parse(invertDate(date)),
        comment: comment,
        tag: selectedSubcategory,
      };
    }
    addItem(data, 'maintainance');
    closeModal();
  };

  /*
  const Maintainance = () => {
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
              keyboardType="number-pad"
              onChangeText={(text) => setPrice(parseInt(text, 10))}
            />
            <AppText color={Constants.white}> {currency}</AppText>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkbox}
          activeOpacity={1}
          onPress={() => setBig(!big)}>
          <MaterialCommunityIcon
            name={big ? 'radiobox-blank' : 'radiobox-marked'}
            color={Constants.white}
            size={20}
          />
          <AppText style={{marginLeft: 10}} color={Constants.white} size={18}>
            Mali servis
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkbox}
          activeOpacity={1}
          onPress={() => setBig(!big)}>
          <MaterialCommunityIcon
            name={big ? 'radiobox-marked' : 'radiobox-blank'}
            color={Constants.white}
            size={20}
          />
          <AppText style={{marginLeft: 10}} color={Constants.white} size={18}>
            Veliki servis
          </AppText>
        </TouchableOpacity>

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
            Sljedeci servis vozila:
          </AppText>
          <View style={[inputStyles.inputContainer, {marginTop: 10}]}>
            <AppText color={Constants.white}>Za </AppText>
            <TextInput
              selectionColor={Constants.lightBlue}
              style={[inputStyles.input, {marginLeft: 0, width: '30%'}]}
              keyboardType="number-pad"
              onChangeText={(text) => setReminder(parseInt(text, 10))}
            />
            <AppText size={14} color={Constants.white} style={{opacity: 0.9}}>
              {' '}
              km
            </AppText>
          </View>
        </View>
      </View>
    );
  };
  const Repair = () => {
    return (
      <View>
        <View style={[inputStyles.inputHolder, {marginVertical: 7.5}]}>
          <AppText size={18} bold color={Constants.white}>
            Cijena popravke:
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
              marginVertical: 7.5,
            },
          ]}>
          <AppText size={18} bold color={Constants.white}>
            Opis popravke:
          </AppText>
          <View style={[inputStyles.inputContainer, {marginTop: 10}]}>
            <TextInput
              selectionColor={Constants.lightBlue}
              style={[
                inputStyles.input,
                {
                  width: Constants.width * 0.85 * 0.5,
                  textAlign: 'left',
                  marginLeft: 0,
                },
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
              marginVertical: 7.5,
            },
          ]}>
          <AppText size={18} bold color={Constants.white}>
            Datum popravljanja:
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
*/
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
            Unesite Podatak o Održavanju
          </AppText>

          <DropDownPicker
            items={SubCategories[selectedCategoryValue]}
            defaultValue={'maintainance'}
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
            {selectedSubcategory === 'maintainance' ? (
              <View>
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

                <TouchableOpacity
                  style={styles.checkbox}
                  activeOpacity={1}
                  onPress={() => setBig(!big)}>
                  <MaterialCommunityIcon
                    name={big ? 'radiobox-blank' : 'radiobox-marked'}
                    color={Constants.white}
                    size={20}
                  />
                  <AppText
                    style={{marginLeft: 10}}
                    color={Constants.white}
                    size={18}>
                    Mali servis
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkbox}
                  activeOpacity={1}
                  onPress={() => setBig(!big)}>
                  <MaterialCommunityIcon
                    name={big ? 'radiobox-marked' : 'radiobox-blank'}
                    color={Constants.white}
                    size={20}
                  />
                  <AppText
                    style={{marginLeft: 10}}
                    color={Constants.white}
                    size={18}>
                    Veliki servis
                  </AppText>
                </TouchableOpacity>

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
                    Sljedeći servis vozila:
                  </AppText>
                  <View style={[inputStyles.inputContainer, {marginTop: 10}]}>
                    <AppText color={Constants.white}>Za </AppText>
                    <TextInput
                      selectionColor={Constants.lightBlue}
                      style={[inputStyles.input, {marginLeft: 0, width: '30%'}]}
                      keyboardType="number-pad"
                      onChangeText={(text) => setReminder(parseInt(text, 10))}
                    />
                    <AppText
                      size={14}
                      color={Constants.white}
                      style={{opacity: 0.9}}>
                      {' '}
                      km
                    </AppText>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View style={[inputStyles.inputHolder, {marginVertical: 7.5}]}>
                  <AppText size={18} bold color={Constants.white}>
                    Cijena popravke:
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
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      marginVertical: 7.5,
                    },
                  ]}>
                  <AppText size={18} bold color={Constants.white}>
                    Opis popravke:
                  </AppText>
                  <View style={[inputStyles.inputContainer, {marginTop: 10}]}>
                    <TextInput
                      maxLength={25}
                      selectionColor={Constants.lightBlue}
                      style={[
                        inputStyles.input,
                        {
                          width: Constants.width * 0.85 * 0.5,
                          textAlign: 'left',
                          marginLeft: 0,
                        },
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
                      marginVertical: 7.5,
                    },
                  ]}>
                  <AppText size={18} bold color={Constants.white}>
                    Datum popravljanja:
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
                      style={[inputStyles.input, {marginLeft: 0, width: '40%'}]}
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
            )}
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
  checkbox: {
    flexDirection: 'row',
    width: '70%',
    alignItems: 'flex-end',
    paddingVertical: 3,
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
    paddingHorizontal: 15,
  },
});
