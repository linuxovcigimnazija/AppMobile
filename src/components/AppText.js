import React from 'react';
import {Text} from 'react-native';
import Constants from '../constants/Constants';

const AppText = (props) => {
  const textStyle = {
    fontFamily: props.bold ? 'Ubuntu-Bold' : 'Ubuntu-Regular',
    fontSize: props.size ? props.size : 16,
    color: props.color ? props.color : Constants.black,
  };

  return (
    <Text maxFontSizeMultiplier={1.1} style={[textStyle, props.style]}>
      {props.children}
    </Text>
  );
};

export default AppText;