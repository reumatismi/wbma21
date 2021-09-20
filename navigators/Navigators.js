/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Login from '../views/Login';
import Upload from '../views/Upload';
import {MainContext} from '../contexts/MainContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Icon} from 'react-native-elements';
import MyFiles from '../views/MyFiles';
import Modify from '../views/Modify';
import Xylophone from '../views/Xylophone';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = '';
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Profile':
              iconName = 'beer';
              break;
            case 'Upload':
              iconName = 'flower';
              break;
            case 'Xylophone':
              iconName = 'cog';
              break;
          }
          return (
            <Icon name={iconName} size={size} color={color} type="ionicon" />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Upload" component={Upload} />
      <Tab.Screen name="Xylophone" component={Xylophone} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Front"
            component={TabScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen name="Single" component={Single} />
          <Stack.Screen name="My Files" component={MyFiles} />
          <Stack.Screen name="Modify" component={Modify} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
