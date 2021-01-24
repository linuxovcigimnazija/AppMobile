import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import {Alert} from 'react-native';

export const onLogOut = (navigatorFun) => {
  Alert.alert(
    'Upozorenje',
    'Ovom opcijom cete izaci iz vaseg profila, molimo Vas da sinhronizujete podatke ili ce podaci biti izgubljeni',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Ipak izadji sa profila',
        onPress: () => {
          auth().signOut();
          navigatorFun();
        },
      },
    ],
    {cancelable: false},
  );
};

export const getUserID = async () => {
  try {
    const value = await AsyncStorage.getItem('userID');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.warn(error);
  }
};

export const setUserID = async (user) => {
  try {
    await AsyncStorage.setItem('userID', user.id);
  } catch (error) {
    console.warn(error);
  }
};

export const getUserData = async () => {
  try {
    const value = await AsyncStorage.getItem('userData');
    if (value !== null) {
      const object = JSON.parse(value);
      return object;
    }
  } catch (error) {
    console.warn(error);
  }
};

export const setUserData = async (data) => {
  try {
    await AsyncStorage.setItem('userData', data);
  } catch (error) {
    console.warn(error);
  }
};

export const onSingUp = async (email, password, data, navigatorFunc) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      setUser(data, email);
      navigatorFunc();
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        Toast.showWithGravity('Email je vec u upotrebi', Toast.LONG, Toast.TOP);
      }
    });
};

export const onLogIn = async (email, password, navigatorFunc) => {
  try {
    let response = await auth().signInWithEmailAndPassword(email, password);
    if (response && response.user) {
      const key = await firestore().collection('id').doc(email).get();
      const id = key.data();
      const data = await firestore().collection('Users').doc(id.id).get();
      await setUserID(id);
      await setUserData(JSON.stringify(data.data()));
      navigatorFunc();
    }
  } catch (e) {
    Toast.showWithGravity(
      'Problem prilikom prijave. Pokusajte opet',
      Toast.LONG,
      Toast.TOP,
    );
    console.warn(e);
  }
};

export const setUser = async (data, email) => {
  const userId = await firestore().collection('Users').add(data);
  firestore().collection('id').doc(email).set({id: userId.id});
  await setUserID(userId);
  await setUserData(JSON.stringify(data));
};

export const updateBase = async (data) => {
  const id = await getUserID();
  firestore().collection('Users').doc(id).update(data);
};

export const getUser = async (id) => {
  try {
    const user = await firestore().collection('Users').doc(id).get();
    return user;
  } catch (error) {
    console.warn(error);
  }
};

export const deleteUser = async (id) => {
  try {
    await firestore().collection('Users').doc(id).delete();
  } catch (error) {
    console.log(error.message);
  }
};
