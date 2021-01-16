import React, {useState} from 'react';
import {Text, View, StyleSheet, Linking} from 'react-native';
import Header from '../components/Header';
import Constants from '../constants/Constants';
import {Picker} from '@react-native-picker/picker';
import {TravellInfoData} from '../constants/TravellInfoData';
import Hyperlink from 'react-native-hyperlink';
import AppText from '../components/AppText';
import LinearGradient from 'react-native-linear-gradient';

const TravelInfoScreen = () => {
  const list = TravellInfoData;
  const [number, setNumber] = useState(list[0].value);
  const [link, setLink] = useState(
    'http://www.mvp.gov.ba/konzularne_informacije/sta_konzul_moze_uciniti_za_vas/?id=17675',
  );

  const numberChange = (index) => {
    list.map((obj, i) => {
      if (index === i) {
        setNumber(list[i].value);
      }
    });
  };

  const linkChange = (index) => {
    list.map((obj, i) => {
      if (index === i) {
        setLink(list[i].putovanje);
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: Constants.background}}>
      <Header />
      <View style={styles.lowerView}>
        <View style={styles.numbersView}>
          <AppText style={styles.titleText}>POMOC NA PUTU ZA...</AppText>
          <View style={styles.dropDownPickerStyle}>
            <Picker
              selectedValue={number}
              onValueChange={(itemValue, itemIndex) => numberChange(itemIndex)}>
              <Picker.Item label={list[0].label} value={list[0].value} />
              <Picker.Item label={list[1].label} value={list[1].value} />
              <Picker.Item label={list[2].label} value={list[2].value} />
            </Picker>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Policija:</Text>
            <Text>{number.milicija}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Vatrogasci:</Text>
            <Text>{number.vatrogasci}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Hitna Pomoc:</Text>
            <Text>{number.hitna}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Pomoc na putu:</Text>
            <Text>{number.ams}</Text>
          </View>
        </View>
      </View>
      <View style={styles.lowerView}>
        <View style={styles.numbersView}>
          <Text style={styles.titleText}>ZELITE DA PUTUJETE?</Text>
          <Text style={styles.textStyle}>
            NAJNOVIJE INFORMACIJE VEZANE{'\n'}ZA PUTOVANJE U PANDEMIJI
          </Text>
          <View style={styles.dropDownPickerStyle}>
            <Picker
              onValueChange={(itemValue, itemIndex) => linkChange(itemIndex)}
              selectedValue={link}>
              <Picker.Item
                label={list[0].label}
                value="http://www.mvp.gov.ba/konzularne_informacije/sta_konzul_moze_uciniti_za_vas/?id=17675"
              />
              <Picker.Item
                label={list[1].label}
                value="http://www.mfa.gov.rs/sr/index.php/konzularni-poslovi/putovanja-u-inostranstvo/vesti-za-putovanja-u-inostranstvo/22669-----------covid-19?lang=cyr"
              />
              <Picker.Item
                label={list[2].label}
                value="https://www.gov.me/en/homepage"
              />
            </Picker>
          </View>
          <Hyperlink
            linkDefault={true}
            linkStyle={{color: Constants.black, fontSize: 14}}
            linkText={(url) => (url === link ? 'link' : url)}>
            <Text
              style={{alignSelf: 'center', textDecorationLine: 'underline'}}>
              Vise informacija na ovaj {link}
            </Text>
          </Hyperlink>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lowerView: {
    //flex: 1,
    width: Constants.screenWidth * 0.9,
    height: Constants.screenHeight * 0.35,
    backgroundColor: 'blue',
    borderRadius: 15,
    alignSelf: 'center',
    margin: 10,
    padding: 10,
    justifyContent: 'center',
  },
  numbersView: {
    flex: 1,
    width: Constants.screenWidth * 0.8,
    height: Constants.screenHeight * 0.3,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 15,
    alignContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: Constants.black,
    alignSelf: 'center',
    margin: 15,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 16,
    color: Constants.black,
    textAlign: 'center',
  },
  dropDownPickerStyle: {
    width: Constants.screenWidth * 0.7,
    height: 40,
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'blue',
    justifyContent: 'center',
  },
});

export default TravelInfoScreen;

/*pickerChange(index){
 this.state.currencies.map( (v,i)=>{
  if( index === i ){
    this.setState({
    currentLabel: this.state.currencies[index].currencyLabel,
    currency: this.state.currencies[index].currency
   })
  }
 })
} */
