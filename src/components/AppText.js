import React from 'react';
import {Text} from 'react-native';

const AppText = (props) => {
  return (
    <Text
      style={
        ([
          {
            fontFamily: props.bold ? '' : '',
            fontSize: props.size,
            color: props.color,
          },
        ],
        props.style)
      }>
      {props.children}
    </Text>
  );
};

export default AppText;
