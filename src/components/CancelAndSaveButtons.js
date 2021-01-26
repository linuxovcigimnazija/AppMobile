import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import AppText from './AppText';
import Constants from '../constants/Constants';
import InputTypeColors from '../constants/InputTypeColors';

export default function CancelAndSaveButtons({
  selectedCategoryValue,
  closeModal,
  onSavePressed,
}) {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: Constants.white + '40',
            borderColor: InputTypeColors[selectedCategoryValue + 'Accent'],
          },
        ]}
        onPress={closeModal}
        activeOpacity={0.7}>
        <AppText size={16} color={Constants.white}>
          Otkaži
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: InputTypeColors[selectedCategoryValue + 'Accent'],
            borderColor: InputTypeColors[selectedCategoryValue + 'Accent'],
          },
        ]}
        onPress={onSavePressed}
        activeOpacity={0.7}>
        <AppText size={16} color={Constants.white}>
          Unesite
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
