import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import Constants from './src/constants/Constants';
import {NavigationContainer} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {FeatherIcon, FontAwesome5Icon} from './src/utils/Functions';
import auth from '@react-native-firebase/auth';

// SCREENS <RegisterScreen />
import HomeScreen from './src/screens/HomeScreen';
import TravelInfoScreen from './src/screens/TravelInfoScreen';
import MyProfileScreen from './src/screens/MyProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AutoScreen from './src/screens/AutoScreen';
import InputScreen from './src/screens/InputScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import {getUserData} from './src/utils/firebaseUtils';
const App = () => {
  const iniRoute = auth().currentUser ? 'TabNavigation' : 'Login';

  const [data, setData] = useState(null);
  const [visiable, setVisiable] = useState(false);

  useEffect(() => {
    const getIndex = async () => {
      const object = await getUserData();
      setData(object);
    };
    getIndex();
  }, []);

  console.log(data);
  useEffect(() => {
    if (data !== null) {
      setVisiable(true);
    }
  }, [data]);

  const HomeStack = createStackNavigator();
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Auto" component={AutoScreen} />
        <HomeStack.Screen name="Input" component={InputScreen} />
        <HomeStack.Screen name="Analytics" component={AnalyticsScreen} />
      </HomeStack.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();
  function TabNavigator() {
    return (
      <Tab.Navigator
        initialRouteName="HomeStack"
        tabBar={(props) => (
          <View style={styles.shadow}>
            <BottomTabBar {...props} />
          </View>
        )}
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            if (route.name === 'HomeStack') {
              return <FeatherIcon name="home" size={size} color={color} />;
            } else if (route.name === 'TravelInfo') {
              return <FontAwesome5Icon name="car" size={size} color={color} />;
            } else if (route.name === 'MyProfile') {
              return <FeatherIcon name="user" size={size} color={color} />;
            }

            return null;
          },
        })}
        lazy={true}
        tabBarOptions={{
          keyboardHidesTabBar: false,
          activeTintColor: Constants.white,
          inactiveTintColor: Constants.primaryLight + 'B0',
          activeBackgroundColor: Constants.primaryDark,
          inactiveBackgroundColor: Constants.primaryDark,
          showLabel: false,
          style: styles.tabBarStyle,
        }}>
        <Tab.Screen name="TravelInfo" component={TravelInfoScreen} />
        <Tab.Screen name="HomeStack" component={HomeStackScreen} />
        <Tab.Screen name="MyProfile" component={MyProfileScreen} />
      </Tab.Navigator>
    );
  }

  const AppStack = createStackNavigator();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.notch} />
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <AppStack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={iniRoute}>
            <AppStack.Screen name="TabNavigation" component={TabNavigator} />
            <AppStack.Screen name="Register" component={RegisterScreen} />
            <AppStack.Screen name="Login" component={LoginScreen} />
          </AppStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // background color sets the color of screen
    // out of safeareaview on the bottom half
    backgroundColor: Constants.black,
  },
  notch: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    // background color sets the color of screen
    // out of safeareaview on the upper half
    backgroundColor: Constants.primaryDark,
  },
  safeArea: {
    flex: 1,
  },
  tabBarStyle: {
    width: '100%',
    height: Constants.height * 0.06,
    borderTopWidth: 0,
  },
});

export default App;
