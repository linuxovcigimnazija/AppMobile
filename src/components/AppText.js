import React from 'react';
import {Text} from 'react-native';

const AppText = (props) => {
  const textStyle = {
    fontFamily: props.bold ? 'Ubuntu-Bold' : 'Ubuntu-Regular',
    fontSize: props.size,
    color: props.color,
  };

  return <Text style={[textStyle, props.style]}>{props.children}</Text>;
};

export default AppText;
