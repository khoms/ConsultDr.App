import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './Login';
import LoginDoctor from './doctor/login';
import SignUp from './SignUp';
import DrNavScreen from '../Navigations/drNav';
import MainScreen from '../Navigations/navigation';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="login" component={Login} />
    {/* <RootStack.Screen name='home' component={MainScreen}/> */}
    <RootStack.Screen name="signUp" component={SignUp} />
    <RootStack.Screen name="drNav" component={DrNavScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
