import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import HospitalBox from '../components/hospitalViewBox';
import NoticeBox from '../components/noticeBox';
import {HospitalsData} from '../data/dummy-data';
import {NoticeData} from '../data/dummy-data';

import Colors from '../colors/Colors';
import Ip from '../ip';
import {useNavigation} from '@react-navigation/native';

const Home = (props) => {
  const navigation = useNavigation();
  const [user, setUser] = useState('loading');
  const [hospital, setHospital] = useState('');
  const [notice, setNotice] = useState('');
  const [userId, setUserId] = useState('');
  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('userId');
    setUserId(id);
  };

  useEffect(() => {
    Boiler();
    if (!!userId) {
    } else {
      fetchUser();
      fetchHospital();
      fetchNotice();
    }
  }, [userId]);

  const fetchUser = () => {
    fetch(`http://${Ip.ip}:5000/api/user/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        // console.log(user.data)
        setUser(user.data);
        // console.log(doctorList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchHospital = () => {
    fetch(`http://${Ip.ip}:5000/api/healthCenter`)
      .then((res) => res.json())
      .then((hospital) => {
        // console.log(user.data)
        setHospital(hospital.data);
        // console.log(doctorList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchNotice = () => {
    fetch(`http://${Ip.ip}:5000/api/notice`)
      .then((res) => res.json())
      .then((notice) => {
        // console.log(user.data)
        setNotice(notice.data);
        // console.log(doctorList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   const fetchUser=()=>{
  //   // setUserId(id);
  //   // fetch(`192.168.1.164:5000/api/user/${id}`
  //   // // , {
  //   // //   headers: new Headers({
  //   // //     Authorization: "Bearer " + token
  //   // //   })
  //   // // }
  //   // )
  //   // .then(res => res.text())
  //   //   .then(data => {
  //   //     console.log(data)
  //   //     setUser(data)
  //   //   }
  //   //   )
  //   //   .catch(err => {
  //   //     console.log(err);
  //   //   })

  //     fetch(`192.168.1.164:5000/api/user`)
  //   .then(res => res.text())
  //     .then(data => {
  //       console.log(data)
  //       setUser(data)
  //     }
  //     )
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }
  // }
  // useEffect(() => {
  //   Boiler()
  // }, [])

  const logout = (props) => {
    AsyncStorage.removeItem('token').then(() => {
      props.navigation.replace('login');
    });
  };

  const renderHospital = (itemData) => {
    // return (
    //   <HospitalBox
    //   name={itemData.item.name}
    //   address={itemData.item.address}
    //   photo={itemData.item.photo}
    //   onSelect={()=>props.navigation.navigate('hspProf',{address:itemData.item.address,name:itemData.item.name,photo:itemData.item.photo})}
    //   />
    // )
    return (
      <HospitalBox
        name={itemData.item.name}
        address={itemData.item.name}
        // photo={itemData.item.photo}
        onSelect={() =>
          props.navigation.navigate('hspProf', {
            id: itemData.item._id,
            address: itemData.item.name,
            name: itemData.item.name,
          })
        }
      />
    );
  };

  const renderNotice = (itemData) => {
    return (
      <NoticeBox
        title={itemData.item.title}
        category={itemData.item.category}
        id={itemData.item._id}
        // address={itemData.item.address}
        // photo={itemData.item.photo}
        onSelect={() =>
          props.navigation.navigate('notice', {
            // photo: itemData.item.photo,
            title: itemData.item.title,
            description: itemData.item.description,
            id: itemData.item._id,
          })
        }
      />
    );
  };

  const logOut = async () => {
    await AsyncStorage.setItem('token', '');
    await AsyncStorage.setItem('userId', '');
    const token = await AsyncStorage.getItem('token');
    // await AsyncStorage.setItem('userId', user.data);
    console.log(token);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.primary} />
        <View
          style={{
            height: 60,
            backgroundColor: Colors.primary,
            borderBottomWidth: 0.6,
            borderBottomColor: Colors.secondary,
          }}>
          <View style={{alignItems: 'center', top: 16, flexDirection: 'row'}}>
            <MaterialCommunityIcons
              reverse
              name="menu"
              style={{marginHorizontal: 14}}
              size={30}
              color="white"
              onPress={() => {
                // logOut()
                navigation.toggleDrawer();
              }}
            />
            <Text style={{fontSize: 28, fontWeight: '600', color: 'white'}}>
              Consult Doctor
            </Text>
          </View>
        </View>
        <View style={styles.header}></View>
        <ScrollView>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{
                uri:
                  'https://images.unsplash.com/photo-1597765221336-1f65bb4c4fee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
              }}
            />
          </View>

          {/* <View >
        <Text style={{ fontSize: 18 }}>your data is {user}</Text>
      </View> */}

          <View>
            <View style={styles.titleView}>
              <Text style={styles.title}>Hospitals</Text>

              {/* <Text>{JSON.stringify(notice)}</Text> */}
              <TouchableOpacity>
                {/* <Text style={styles.seeMore}>See all>>></Text> */}
              </TouchableOpacity>
            </View>
            <FlatList
              data={hospital}
              horizontal={true}
              maxToRenderPerBatch={3}
              showsHorizontalScrollIndicator={false}
              // maxToRenderPerBatch={5}
              keyExtractor={(item, index) => item._id}
              renderItem={renderHospital}
            />
          </View>
          <View>
            <View style={{...styles.titleView, marginTop: 12}}>
              <Text style={styles.title}>Notices</Text>
              <TouchableOpacity style={{alignSelf: 'center'}}>
                {/* <Text style={styles.seeMore}>See all>>></Text> */}
              </TouchableOpacity>
            </View>
            <FlatList
              data={notice}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              // maxToRenderPerBatch={5}
              keyExtractor={(item, index) => item._id}
              renderItem={renderNotice}
            />
            {/* <NoticeBox /> */}
          </View>
          <View style={{height: 200, width: 100}}>
            {/* <Text>Nepal</Text> */}
          </View>

          <View></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    height: '8%',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 50,
    // marginLeft:8
    // position:'absolute'
  },
  imageView: {
    // top:-20,
    width: '88%',
    height: 190,
    alignSelf: 'center',
    borderWidth: 0.4,
    borderColor: 'grey',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 10,
    elevation: 9,
  },
  image: {
    width: '100%',
    height: 225,
  },
  titleView: {
    marginTop: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 6,
    // backgroundColor: Colors.secondary
  },
  title: {
    marginLeft: 14,
    fontSize: 24,
    fontWeight: '600',
    // color: '#F2F2F2',
    color: 'black',
  },
  seeMore: {
    fontSize: 17,

    color: 'grey',
    justifyContent: 'center',
    marginRight: 12,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});

export default Home;
