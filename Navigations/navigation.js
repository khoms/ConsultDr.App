import React, {useState, useEffect, useMemo} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import SignUp from '../Screens/SignUp';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-community/async-storage';

import RootStackScreen from '../Screens/RootStackScreen';
import DoctorScreen from '../Screens/doctorsList';
import HealthServiceProfile from '../Screens/HealthServiceProfile';
import NoticeView from '../Screens/NoticeView';
import DrsProfile from '../Screens/doctorsProfile';
import Profile from '../Screens/Profile';
import EditProfile from '../Screens/editProfile';
import Message from '../Screens/Message';
import FriendListScreen from '../Screens/Chat/friendList';
import History from '../Screens/History';
import DrawerContent from '../Screens/drawerContent';

import Colors from '../colors/Colors';

import AuthContext from '../components/context';
import MedicalNotes from '../Screens/medicalNotes';
import EditRecords from '../Screens/editRecords';

const homeStack = createStackNavigator();

const MainScreen = (props) => {
  const BottomTab = createBottomTabNavigator();

  const Stack = createStackNavigator();

  function HomePage({navigation}) {
    // console.log('hello');
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.primary,
            height: 70,
          },
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Consult Doctor ',
            headerLeft: () => (
              //   // <Button title='gotoDrawer' color='black' onPress={(navData) => {
              //   //         navigation.toggleDrawer();
              //   //       }}/>
              //   // <HeaderButtons HeaderButtonComponent={HeaderButton}>
              //   //   <Item
              //   //     title="Menu"
              //   //     iconName="menu-outline"
              //   //     onPress={() => {
              //   //       navigation.toggleDrawer();
              //   //     }}
              //   //   />
              //   // </HeaderButtons>
              <MaterialCommunityIcons
                reverse
                name="menu"
                style={{marginLeft: 7}}
                size={30}
                color="white"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            ),
          }}
        />

        <Stack.Screen name="hspProf" component={HealthServiceProfile} />
        <Stack.Screen name="notice" component={NoticeView} />
      </Stack.Navigator>
    );
  }

  const doctorNav = createStackNavigator();

  const DoctorNav = () => {
    return (
      <doctorNav.Navigator
        initialRouteName="DoctorList"
        screenOptions={{
          headerShown: false,
          headerStyle: {backgroundColor: Colors.primary, height: 70},
          headerTintColor: 'white',
        }}>
        <doctorNav.Screen name="DoctorList" component={DoctorScreen} />
        <doctorNav.Screen name="doctorProfile" component={DrsProfile} />
        <doctorNav.Screen name="Message" component={Message} />
      </doctorNav.Navigator>
    );
  };

  const profileNav = createStackNavigator();

  const ProfileNav = () => {
    return (
      <profileNav.Navigator
        initialRouteName="Profile"
        screenOptions={{
          headerShown: false,
          headerStyle: {backgroundColor: Colors.primary, height: 70},
          headerTintColor: 'white',
        }}>
        <profileNav.Screen name="Profile" component={Profile} />
        <profileNav.Screen name="editProfile" component={EditProfile} />
      </profileNav.Navigator>
    );
  };

  const medicalNotes = createStackNavigator();

  const NotesNav = () => {
    return (
      <medicalNotes.Navigator
        initialRouteName="Notes"
        screenOptions={{
          headerShown: false,
          headerStyle: {backgroundColor: Colors.primary, height: 70},
          headerTintColor: 'white',
        }}>
        <medicalNotes.Screen name="Notes" component={MedicalNotes} />
        <medicalNotes.Screen name="editRecords" component={EditRecords} />
      </medicalNotes.Navigator>
    );
  };
  const chatNav = createStackNavigator();

  const ChatNav = () => {
    return (
      <chatNav.Navigator
        initialRouteName="friendList"
        screenOptions={{
          headerShown: false,
          headerStyle: {backgroundColor: Colors.primary, height: 70},
          headerTintColor: 'white',
        }}>
        <chatNav.Screen name="friendList" component={FriendListScreen} />
        <chatNav.Screen name="Message" component={Message} />
        <chatNav.Screen name="Profile" component={DrsProfile} />
      </chatNav.Navigator>
    );
  };

  const BottomNav = () => {
    return (
      <BottomTab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: Colors.divColor,
          style: {height: 60, backgroundColor: Colors.secondary},
          keyboardHidesTabBar: true,
        }}>
        <BottomTab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
              <MaterialCommunityIcons
                name="house"
                color={tintColor}
                size={30}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Doctor"
          component={DoctorNav}
          options={{
            tabBarLabel: 'Doctors',
            tabBarIcon: ({tintColor, size}) => (
              <Fontisto name="doctor" color="black" size={30} />
            ),
          }}
        />

        <BottomTab.Screen
          name="ChatNav"
          component={ChatNav}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="mail" color="black" size={30} />
            ),
          }}
        />

        <BottomTab.Screen
          name="Profile"
          component={ProfileNav}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="person" color="black" size={30} />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  };
  const drawer = createDrawerNavigator();
  const DrawerNav = () => {
    return (
      <drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <drawer.Screen name="Home" component={BottomNav} />
        <drawer.Screen name="Doctors" component={DoctorNav} />
        <drawer.Screen name="Profile" component={ProfileNav} />
        <drawer.Screen name="History" component={History} />
        <drawer.Screen name="MedicalNotes" component={NotesNav} />
      </drawer.Navigator>
    );
  };
  // let token;
  //   const Boiler = async () => {
  //    token = props.userToken;
  //   }

  //   useEffect(() => {
  //     Boiler();

  //   }, []);

  return (
    <DrawerNav />

    // <NavigationContainer>
    //   {(!props.userToken )=== null ?
    //     (
    //       // <homeStack.Navigator  initialRouteName='home'>
    //       //    <homeStack.Screen name={'Home'} component={Home}/>
    //       //  </homeStack.Navigator>
    //       <DrawerNav />

    //     ) :
    //     <RootStackScreen />}

    // </NavigationContainer>
  );
};

export default MainScreen;
