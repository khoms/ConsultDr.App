import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/doctor/HomeScreen';
import Message from '../Screens/doctor/Message';
import DoctorScreen from '../Screens/doctorsList';
import PatientScreen from '../Screens/doctor/PatientList';
import UserProfile from '../Screens/doctor/userProfile';
import AddHistory from '../Screens/doctor/userProfile';

import DoctorNavigator from '../Navigations/doctorNavigation';

import {AuthContext} from '../Provider/AuthProvider';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import LoginDoctor from '../Screens/doctor/login';

const DrNavScreen = () => {
  const {loading, doctorToken} = useContext(AuthContext);
  console.log('dr context baata', doctorToken);

  const DrNav = createStackNavigator();

  // const BottomNav = createBottomTabNavigator();

  // const DrScreen = () => {
  //     return (
  //         <BottomNav.Navigator>
  //         <BottomNav.Screen name='Home' component={DetailScreen}
  //         options={{
  //             tabBarLabel: 'Home',
  //             tabBarIcon: ({ tintColor }) => (
  //               <MaterialCommunityIcons
  //                 name='house'
  //                 color={tintColor}
  //                 size={30} />)
  //           }
  //           }/>
  //         <BottomNav.Screen name='Message' component={Message}
  //          options={{
  //             tabBarLabel: 'Messages',
  //             tabBarIcon: ({ color, size }) => (
  //               <MaterialCommunityIcons
  //                 name='mail'
  //                 color='black'
  //                 size={30} />)
  //           }}  />

  //     </BottomNav.Navigator>

  //     )
  // }

  const DetailNav = createStackNavigator();

  const DetailScreen = () => {
    return (
      <DetailNav.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <DetailNav.Screen name="Home" component={HomeScreen} />
        <DetailNav.Screen name="Doctor" component={DoctorScreen} />
        <DetailNav.Screen name="Chat" component={Message} />
        <DetailNav.Screen name="Patient" component={PatientScreen} />
        <DetailNav.Screen name="UserProfile" component={UserProfile} />
        <DetailNav.Screen name="AddHistory" component={AddHistory} />
      </DetailNav.Navigator>
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    // <DrNav.Navigator headerMode="none">
    //   <DrNav.Screen name="login" component={Login} />
    //   {/* <DrNav.Screen name='drHome' component={DetailScreen} /> */}
    //   <DrNav.Screen name="Home" component={HomeScreen} />
    //   <DrNav.Screen name="Doctor" component={DoctorScreen} />
    //   <DrNav.Screen name="Chat" component={Message} />
    // </DrNav.Navigator>
    doctorToken ? <DetailScreen /> : <LoginDoctor />
  );
};

export default DrNavScreen;
