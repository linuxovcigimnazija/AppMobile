import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import AppText from './AppText';
import DashboardColors from '../constants/DashboardColors';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../constants/Constants';

const inputHeight = 35;

export default function DashboardInput(props) {
  return (
    <View
      style={[
        styles.container,
        props.error && {borderColor: Constants.redDark},
      ]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[DashboardColors.redDark + '80', DashboardColors.red]}
        style={styles.textContainer}>
        <AppText size={14} bold color={DashboardColors.white}>
          {props.text}
        </AppText>
      </LinearGradient>
      <View style={styles.inputContainer}>
        <View style={styles.triangleCorner} />
        <TextInput
          autoCorrect={false}
          selectionColor={DashboardColors.red}
          placeholder={props.placeholder}
          placeholderTextColor={DashboardColors.grayBackground}
          style={styles.input}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: DashboardColors.black,
    borderRadius: 5,
    overflow: 'hidden',
  },
  textContainer: {
    backgroundColor: DashboardColors.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: '22%',
    maxHeight: inputHeight,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  triangleCorner: {
    // codedaily.io
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: inputHeight / 8,
    borderTopWidth: inputHeight,
    borderRightColor: 'transparent',
    borderTopColor: DashboardColors.red,
    zIndex: 10,
  },
  input: {
    width: '100%',
    padding: 0,
    height: inputHeight,
    paddingLeft: inputHeight / 3,
    paddingRight: 5,
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
  },
});
