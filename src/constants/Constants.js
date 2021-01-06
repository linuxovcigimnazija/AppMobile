import {Platform, Dimensions} from 'react-native';

export default {
  // koristite Constants.OS i dobijete nazad 'ios' ili 'android'
  OS: Platform.OS,

  // postoji neka razlika izmedju screen i window width/height, ali mi nikad nije bilo bitno
  // generalno koristite samo Constants.width ili Constants.height
  // ostale konstante su tu samo AKO se desi da zatreba
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,

  // BOJE ( Constants.ime-boje )
  // PALETU KOJU NE KORISTITE KOMENTARISITE
  black: '#373737',
  white: '#fcf7f6',
  gray: '#888888',

  // COOLORS palette 18 (watermellon)
  background: '#f2e8cf',
  red: '#bc4749',
  primary: '#6a994e',
  primaryDark: '#386641',
  primaryLight: '#a7c957',

  // COOLORS palette 14 (sea ship)
  // background: '#e9fff9',
  // red: '#d64045',
  // primary: '#467559',
  // primaryDark: '#1d3354',
  // primaryLight: '#9ed8db',
};
