import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../colors/Colors';
import Ip from '../ip';

import {AuthContext} from '../Provider/AuthProvider';

const Login = (props) => {
  // await AsyncStorage.setItem('token',null);
  const {getToken} = useContext(AuthContext);

  const navigation = useNavigation();

  const [username, setUsername] = useState('hello@gmail.com');
  const [password, setPassword] = useState('1234567');
  const [role, setRole] = useState('User');
  const [oppRole, setOppRole] = useState('Doctor');
  const [usernameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [user, setUser] = useState('');

  const [userId, setUserId] = useState('');
  // const { login } = useContext(AuthContext);

  const validateInput = () => {
    if (username == '' && password == '') {
      setUserNameError(true);
      setPasswordError(true);
      return false;
    } else if (password == '') {
      setUserNameError(false);
      setPasswordError(true);
      return false;
    } else if (username == '') {
      setUserNameError(true);
      setPasswordError(false);
      return false;
    } else {
      setUserNameError(false);
      setPasswordError(false);
    }
    return true;
  };

  const loginScreen = () => {
    setUserNameError(false);
    setPasswordError(false);

    if (validateInput()) {
      const connect = fetch(`http://${Ip.ip}:5000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          setUser(data);
          //    try {
          const token = await AsyncStorage.setItem('token', data.token);
          getToken();

          await AsyncStorage.setItem('userId', data.data);

          AsyncStorage.removeItem('drToken');
          //     //  props.navigation.replace("home")
          //     if(AsyncStorage.getItem("token")){
          //     //    navigation.replace('home')

          //     }
          //    } catch (e) {
          //      console.log("Error: ",e)
          //       Alert(e)
          //    }

          // navigation.replace('home');
        })
        .catch((err) => {
          console.log(err);
          setLoginError(err);
        });
      return true;
    }
  };

  // const changeScreen = async () => {
  //     if (loginScreen()) {
  //         await AsyncStorage.setItem('token', JSON.stringify(user.token));
  //         const token = await AsyncStorage.getItem("token");
  //         await AsyncStorage.setItem('userId', JSON.stringify(user.data));
  //         console.log(token)

  //     }
  // }

  useEffect(() => {}, []);

  const changeRole = () => {
    if (role === 'User') {
      setRole('Doctor');
      setOppRole('User');
    } else {
      setRole('User');
      setOppRole('Doctor');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://image.freepik.com/free-vector/online-doctor-concept_23-2148522701.jpg',
          }}
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.title}>
          <Text
            style={{
              fontSize: 25,
              color: Colors.primary,
              fontWeight: '600',
              alignSelf: 'flex-start',
            }}>
            {' '}
            Sign In As {role}
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          {usernameError && (
            <Text style={{color: 'red'}}>Username cannot be empty</Text>
          )}

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {passwordError && (
            <Text style={{color: 'red'}}>Password cannot be empty</Text>
          )}

          <TouchableOpacity
            style={{alignSelf: 'flex-start'}}
            onPress={() => console.log('forget pw')}>
            <Text
              style={{
                marginLeft: 24,
                color: 'grey',
                textDecorationLine: 'underline',
              }}>
              Forget Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={loginScreen}>
            <Text style={{color: 'white', fontSize: 17}}>Log In</Text>
          </TouchableOpacity>
          {loginError && <Text style={{color: 'red'}}>Server Error</Text>}

          <Text style={{marginVertical: 15, fontSize: 18}}>OR</Text>
          <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
            <Text style={{fontSize: 15}}>Don't have an Account?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.loginBtn, alignSelf: 'flex-end'}}
            onPress={() => navigation.navigate('drNav')}>
            <Text>For Doctor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  innerContainer: {
    width: '85%',
    padding: 20,
    borderWidth: 0.3,
    borderRadius: 20,

    justifyContent: 'center',
    backgroundColor: Colors.divColor,
  },
  // imageView: {
  //     // top:-25,
  //     width: '90%',
  //     height: 250,
  //     alignSelf: 'center',
  //     // borderWidth: 8,
  //     borderColor: Colors.view,
  //     // borderRadius: 160,
  //     // overflow: 'hidden',
  //     // marginTop: -25,
  //     elevation: 9,
  // },
  // image: {
  //     width: '100%',
  //     height: '100%'
  // },
  title: {
    marginVertical: 10,
  },
  input: {
    width: '90%',
    borderColor: Colors.secondary,
    borderWidth: 0.6,
    borderRadius: 18,

    paddingLeft: 15,
    marginVertical: 10,
  },
  loginBtn: {
    width: '40%',
    height: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
  },
});
export default Login;
