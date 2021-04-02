import React from 'react';
import {StyleSheet} from 'react-native';

import TabMonth from './TabMonth';
import TabYear from './TabYear';
import TabAll from './TabAll';

export default function Tab({page, data, currency}) {
  // const componentProps = {currency={currency} data={data} style={styles.wholeTab}}

  switch (page) {
    case 'month':
      return <TabMonth {...componentProps} />;
    case 'year':
      return <TabYear {...componentProps} />;
    case 'all':
      return <TabAll {...componentProps} />;
  }
}

const styles = StyleSheet.create({
  wholeTab: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
