import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
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
import AppText from './src/components/AppText';
const App = () => {
  const [iniRoute, setIniRoute] = useState(
    auth().currentUser ? 'TabNavigation' : 'Login',
  );

  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [render, reRender] = useState(false);

  useEffect(() => {
    setVisible(false);
    const getIndex = async () => {
      const object = await getUserData();
      setData(object);
    };
    getIndex();
    setIniRoute(auth().currentUser ? 'TabNavigation' : 'Login');
  }, [render]);

  useEffect(() => {
    if (data !== null) {
      setVisible(true);
    }
  }, [data]);

  const HomeStack = createStackNavigator();
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{
            GDATA: data,
          }}
        />
        <HomeStack.Screen
          name="Auto"
          component={AutoScreen}
          initialParams={{
            GDATA: data,
          }}
        />
        <HomeStack.Screen
          name="Input"
          component={InputScreen}
          initialParams={{
            GDATA: data,
          }}
        />
        <HomeStack.Screen
          name="Analytics"
          component={AnalyticsScreen}
          initialParams={{
            GDATA: data,
          }}
        />
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
        <Tab.Screen
          initialParams={{
            GDATA: data,
          }}
          name="TravelInfo"
          component={TravelInfoScreen}
        />
        <Tab.Screen name="HomeStack" component={HomeStackScreen} />
        <Tab.Screen
          name="MyProfile"
          component={MyProfileScreen}
          initialParams={{
            GDATA: data,
            reRender: reRender,
            render: render,
          }}
        />
      </Tab.Navigator>
    );
  }

  const AppStack = createStackNavigator();

  if (!visible) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Constants.primaryDark,
        }}>
        <AppText
          style={{marginBottom: 15}}
          color={Constants.white}
          size={40}
          bold>
          AppMobile
        </AppText>
        <ActivityIndicator color={Constants.white} size="large" />
      </View>
    );
  } else {
    console.log('APP', data);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.notch} />
        <SafeAreaView style={styles.safeArea}>
          <NavigationContainer>
            <AppStack.Navigator
              initialRouteName={iniRoute}
              screenOptions={{headerShown: false}}>
              <AppStack.Screen name="TabNavigation" component={TabNavigator} />
              <AppStack.Screen name="Register" component={RegisterScreen} />
              <AppStack.Screen
                initialParams={{
                  reRender: reRender,
                  render: render,
                }}
                name="Login"
                component={LoginScreen}
              />
            </AppStack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </View>
    );
  }
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
    backgroundColor: Constants.primaryDarker,
  },
  safeArea: {
    flex: 1,
  },
  tabBarStyle: {
    width: '100%',
    height: Constants.height * 0.06,
    borderTopWidth: 1,
    borderTopColor: Constants.primaryDarker,
  },
});

export default App;
