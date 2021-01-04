import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Constants from '../constants/Constants';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text>H</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    backgroundColor: 'black',
  },
});

export default Header;
