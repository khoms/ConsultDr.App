import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/doctor/HomeScreen';
import Message from '../Screens/doctor/Message';
import {AuthContext} from '../Provider/AuthProvider';

const DoctorNavigator = () => {
  const DrNav = createStackNavigator();

  const DrNavs = () => {
    return (
      <DrNav.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <DrNav.Screen name="Home" component={HomeScreen} />
        <DrNav.Screen name="Chat" component={Message} />
      </DrNav.Navigator>
    );
  };
};

export default DoctorNavigator;
