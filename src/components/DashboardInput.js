import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import AppText from './AppText';
import Constants from '../constants/Constants';

const inputHeight = 35;

export default function DashboardInput(props) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <AppText size={18} color={Constants.white}>
          {props.text}
        </AppText>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.triangleCorner} />
        <TextInput style={styles.input} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  textContainer: {
    backgroundColor: Constants.primary,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Constants.black,
  },
  triangleCorner: {
    // codedaily.io
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: inputHeight / 4,
    borderTopWidth: inputHeight,
    borderRightColor: 'transparent',
    borderTopColor: Constants.primary,
  },
  input: {
    width: '100%',
    height: inputHeight,
    paddingLeft: inputHeight / 3,
    paddingRight: 5,
  },
});
