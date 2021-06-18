import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Colors from '../colors/Colors';
import Ip from '../ip';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../Provider/AuthProvider';

const Profile = (props) => {
  const navigation = useNavigation();

  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const Boiler = async () => {
    const id = await AsyncStorage.getItem('userId');
    setUserId(id);
  };

  useEffect(() => {
    Boiler();
    if (!!user) {
    } else fetchUser();
    navigation.addListener('focus', () => {
      Boiler();
      fetchUser();
    });
  }, [user, userId]);

  const fetchUser = () => {
    fetch(`http://${Ip.ip}:5000/api/user/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        // console.log(user.data)
        setUser(user.data);
        // console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <StatusBar backgroundColor={Colors.primary} />
      <View style={styles.container}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="edit"
            style={{right: -20}}
            size={25}
            color="white"
            onPress={() => {
              navigation.navigate('editProfile', {
                id: user?._id,
                dob: user?.dob,
                name: user?.name,
                weight: user?.weight,
                height: user?.height,
                phoneNo: user?.phone,
              });
            }}
          />
          <Text
            style={{
              marginTop: 14,
              marginLeft: 14,
              fontSize: 24,
              fontWeight: '600',
              color: 'white',
            }}>
            Profile
          </Text>
        </View>
        <View style={{marginLeft: 10}}>
          {user ? null : (
            <Text style={{color: 'red'}}>Error on loading Data</Text>
          )}
        </View>

        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://khomkhoms.files.wordpress.com/2019/01/cropped-f.jpg?w=200',
            }}
          />
        </View>

        <View style={styles.details}>
          <View style={{flex: 1, top: 60}}>
            <Text
              style={{
                alignSelf: 'center',
                marginBottom: 30,
                fontSize: 25,
                fontWeight: '600',
                color: 'black',
              }}>
              {user.name}
            </Text>

            <View style={{flexDirection: 'row', marginLeft: 28}}>
              <MaterialCommunityIcons
                name="date-range"
                size={25}
                color="black"
              />
              <Text style={styles.detailTitle}>DOB {user.dob}</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 28,
              }}>
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons name="label" size={25} color="black" />
                <Text style={styles.detailTitle}>{user.weight}kg</Text>
              </View>
              <View style={{flexDirection: 'row', marginRight: 70}}>
                <MaterialCommunityIcons name="height" size={25} color="black" />
                <Text style={styles.detailTitle}> {user.height}cm</Text>
              </View>
            </View>
            <View style={{marginLeft: 28, marginTop: 25}}>
              <View>
                <MaterialCommunityIcons name="call" size={25} color="black" />
                <Text>{user.phone}</Text>
              </View>
              <View style={{marginTop: 25}}>
                <MaterialCommunityIcons name="email" size={25} color="black" />
                <Text>{user.email}</Text>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.additionalDetails}>
                    <View >
                        <MaterialCommunityIcons
                            name='call'

                            size={25}
                            color='black'

                        />
                        <Text>Phone Number</Text>
                        <MaterialCommunityIcons
                            name='email'

                            size={25}
                            color='black'

                        />
                        <Text>Email</Text>
                    </View>

                </View> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    // alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  imageView: {
    // top:-25,
    width: 160,
    height: 160,
    alignSelf: 'center',
    borderWidth: 8,
    borderColor: Colors.view,
    borderRadius: 160,
    overflow: 'hidden',
    // marginTop: -25,
    elevation: 9,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    width: '88%',
    height: 400,
    backgroundColor: Colors.view,
    alignSelf: 'center',
    // borderRadius:14,
    elevation: 4,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -70,
    borderTopLeftRadius: 95,
    borderBottomRightRadius: 95,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 10,
  },
  additionalDetails: {
    marginLeft: 20,
    marginTop: 40,
  },
});

export default Profile;
