import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import {Alert} from 'react-native';

export const onLogOut = (navigationFunction) => {
  Alert.alert(
    'Upozorenje',
    'Ovom opcijom ćete izaći iz Vašeg profila, molimo Vas da sinhronizujete podatke sa Cloudom ili će biti zauvijek izgubljeni',
    [
      {
        text: 'Nazad',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Svjestan sam, nastavi',
        onPress: () => {
          auth().signOut();
          clearAll();
          navigationFunction();
        },
      },
    ],
    {cancelable: false},
  );
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Deleted ASYNC.');
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
    console.log('LOGIN', data);
  } catch (error) {
    console.warn(error);
  }
};

export const onSingUp = async (
  email,
  password,
  data,
  navigatorFunc,
  render,
) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      setUser(data, email, navigatorFunc, render);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        Toast.showWithGravity('Email je vec u upotrebi', Toast.LONG, Toast.TOP);
      }
    });
};

export const onLogIn = async (email, password, navigatorFunc, render) => {
  try {
    let response = await auth().signInWithEmailAndPassword(email, password);
    if (response && response.user) {
      const key = await firestore().collection('id').doc(email).get();
      const id = key.data();
      const data = await firestore().collection('Users').doc(id.id).get();
      await setUserID(id);
      await setUserData(JSON.stringify(data.data()));

      navigatorFunc(!render);
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

export const setUser = async (data, email, navigatorFunc, render) => {
  const userId = await firestore().collection('Users').add(data);
  firestore().collection('id').doc(email).set({id: userId.id});
  await setUserID(userId);
  console.log('CREATING USER WITH', data);
  await setUserData(JSON.stringify(data));

  navigatorFunc(!render);
};

export const updateBase = async (reRender, render) => {
  try {
    const id = await getUserID();
    const data = await getUserData();
    firestore().collection('Users').doc(id).update(data);
    console.log('SYNCED', data);
    Toast.showWithGravity(
      'Podaci su postavljeni na Cloud',
      Toast.LONG,
      Toast.TOP,
    );
    reRender(!render);
  } catch (error) {
    Toast.showWithGravity('DOSLO JE DO GRESKE', Toast.LONG, Toast.TOP);
  }
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
