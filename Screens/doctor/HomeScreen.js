import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Button,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../../colors/Colors';
import {useNavigation} from '@react-navigation/native';

import {AuthContext} from '../../Provider/AuthProvider';

const DrHomeScreen = ({navigation}) => {
  const {getDrToken} = useContext(AuthContext);

  // const navigation = useNavigation();

  const logout = (props) => {
    // AsyncStorage.removeItem('userId');

    AsyncStorage.removeItem('drToken').then(() => getDrToken());
    console.log('Log ouT doctor pressed');

    // updateStorage;
  };

  return (
    <View>
      <StatusBar backgroundColor={Colors.primary} />

      <View style={styles.header}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '600',
            color: 'white',
            marginLeft: 12,
            marginTop: 14,
          }}>
          Consult Doctor
        </Text>
      </View>
      <ScrollView>
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.view}
            onPress={() => {
              navigation.navigate('Doctor');
            }}>
            <Fontisto name="doctor" color={Colors.divColor} size={100} />
            <Text style={styles.title}>Doctors</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.view}
            onPress={() => {
              navigation.navigate('Patient');
            }}>
            <Fontisto name="person" color={Colors.divColor} size={100} />
            <Text style={styles.title}>Patients</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <TouchableOpacity style={styles.view}>
            <Fontisto name="info" color={Colors.divColor} size={100} />
            <Text style={styles.title}>Notices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.view}>
            <Fontisto name="history" color={Colors.divColor} size={100} />
            <Text style={styles.title}>History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <TouchableOpacity
            style={styles.view}
            onPress={() => {
              navigation.navigate('Chat');
            }}>
            <Fontisto name="hipchat" color={Colors.divColor} size={100} />
            <Text style={styles.title}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.view}>
            <Fontisto
              name="player-settings"
              color={Colors.divColor}
              size={100}
            />
            <Text style={styles.title}>Settings</Text>
          </TouchableOpacity>
        </View>

        <Button title="Logout Demo" onPress={logout}></Button>
        <View style={{...styles.box, marginBottom: 100}}>
          <TouchableOpacity style={styles.view}>
            <Fontisto
              name="player-settings"
              color={Colors.divColor}
              size={100}
            />
            <Text style={styles.title}>Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    // alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    // flexDirection:'row-reverse'
  },
  box: {
    flexDirection: 'row',
  },
  view: {
    width: 180,
    height: 150,
    backgroundColor: Colors.secondary,
    marginHorizontal: 10,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    elevation: 7,
  },
  title: {
    fontSize: 24,
    marginTop: 5,
    color: 'white',
  },
});

export default DrHomeScreen;
