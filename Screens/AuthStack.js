/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useMemo, useContext} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Login from './Login';
import RootStackScreen from './RootStackScreen';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import MainScreen from '../Navigations/navigation';
import DrNavScreen from '../Navigations/drNav';

import {AuthContext} from '../Provider/AuthProvider';

const AuthStack = () => {
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [userToken, setUserToken] = useState(null);
  const {loading, userToken, doctorToken} = useContext(AuthContext);
  console.log('context bata aako value', userToken);
  // console.log('doctro bata aako value', doctorToken);

  //   const updateStorage = async () => {
  //     const token = await AsyncStorage.getItem('token');
  //     setUserToken(token);
  //     const id = await AsyncStorage.getItem('userId');
  //   };

  //  useEffect(() => {
  //   Boiler();
  // }, [userToken]);

  // const authContext = useMemo(()=>({
  //   login:async (props)=>{
  //     setIsLoading(false);
  //     const token = await AsyncStorage.getItem("token");
  //     setUserToken(token);

  //   },
  //   signOut:()=>{
  //     setIsLoading(false);
  //     setUserToken(null);
  //   },
  //   signUp:()=>{
  //     setIsLoading(false);
  //     setUserToken('abcd');
  //   }
  // }))

  //   useEffect(() => {
  //     console.log('we are here');
  //     updateStorage().then(() => setIsLoading(false));
  //     console.log(userToken);
  //     // setTimeout(()=>{
  //     //   setIsLoading(false);
  //     // },100)
  //   }, [userToken]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (userToken) {
    return <MainScreen />;
  } else if (!userToken && !doctorToken) {
    return <RootStackScreen />;
  } else if (!userToken || doctorToken) {
    return <DrNavScreen />;
  } else {
    return <RootStackScreen />;
  }
  // return userToken ? <MainScreen /> : <RootStackScreen />;

  //   return (
  // //     <AuthContext.Provider value={authContext}>
  // //    <MainScreen userToken={userToken}/>
  // // </AuthContext.Provider>
  // <NavigationContainer>
  //     {/* {(userToken )=== null ?
  //       (
  //         <RootStackScreen />
  //         // <homeStack.Navigator  initialRouteName='home'>
  //         //    <homeStack.Screen name={'Home'} component={Home}/>
  //         //  </homeStack.Navigator>

  //       ) :

  //       <MainScreen />} */}

  //       {userToken ?<MainScreen/>:<RootStackScreen/>}

  //   </NavigationContainer>
  // );
};
export default AuthStack;
