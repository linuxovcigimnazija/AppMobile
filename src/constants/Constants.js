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
  black: '#373737',
  white: '#fcf7f6',
};
