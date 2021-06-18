import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../colors/Colors';
import Ip from '../ip';
import {TextInput} from 'react-native-paper';

const EditRecords = () => {
  const [historyList, setHistoryList] = useState('');
  const [userHistory, setUserHistory] = useState('');
  const [userId, setUserId] = useState('');
  const screenWidth = Math.round(Dimensions.get('window').width);
  const [blood, setBlood] = useState('');
  const [pressure, setPressure] = useState('');
  const [sugar, setSugar] = useState('');
  const [surgery, setSurgery] = useState('');
  const [other, setOther] = useState('');

  const Boiler = async () => {
    const id = await AsyncStorage.getItem('userId');
    setUserId(id);
  };

  useEffect(() => {
    Boiler();
    if (!!historyList) {
      // '0aooafaskabc'
      const data = historyList.filter((item) => item.userId == userId);
      setUserHistory(data);
    } else fetchHsitory();
  }, [historyList]);

  const fetchHsitory = () => {
    fetch(`http:///${Ip.ip}:5000/api/note`)
      .then((res) => res.json())
      .then((histories) => {
        // console.log(histories)
        setHistoryList(histories.data);
        //
        console.log(historyList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateHsitory = () => {
    fetch(`http:///${Ip.ip}:5000/api/history/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((histories) => {
        // console.log(histories)
        setHistoryList(histories.data);
        //
        console.log(historyList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      {/* <StatusBar backgroundColor={Colors.primary} /> */}
      {/* <View style={styles.container}> */}

      <ScrollView>
        <View style={styles.header}>
          <Text
            style={{
              marginTop: 14,
              marginLeft: 30,
              fontSize: 24,
              fontWeight: '600',
              color: 'white',
            }}>
            Medical Notes
          </Text>
        </View>
        <View style={{}}>
          {/* <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                borderWidth: 2.7,
                borderColor: Colors.primary,
                borderRadius: 12,
                padding: 2,
                paddingTop: 6,
                paddingHorizontal: 9,
              }}>
              Last updated
            </Text>
            <Text style={{color: Colors.secondary, fontSize: 12}}>
              Date comes here
            </Text>
          </View> */}
          <View style={{marginTop: 14}}>
            <View>
              <Text style={styles.title}>RBC level</Text>
              <TextInput
                underlineColor={Colors.text}
                style={styles.data}></TextInput>
            </View>
            <View>
              <Text style={styles.title}>
                Blood Pressure
                <Text style={{fontSize: 13, color: 'grey'}}> (mm/Hg)</Text>
              </Text>
              <TextInput
                underlineColor={Colors.text}
                style={styles.data}
                keyboardType={'numeric'}></TextInput>
            </View>
            <View>
              <Text style={styles.title}>
                Sugar Level
                <Text style={{fontSize: 13, color: 'grey'}}> (mg/dL)</Text>
              </Text>
              <TextInput
                underlineColor={Colors.text}
                style={styles.data}
                keyboardType={'numeric'}></TextInput>
            </View>
            <View>
              <Text style={styles.title}>Surgical Records</Text>
              <TextInput
                underlineColor={Colors.text}
                style={styles.data}></TextInput>
            </View>

            <View>
              <Text style={styles.title}>Other Records</Text>
              <TextInput
                underlineColor={Colors.text}
                style={styles.data}></TextInput>
            </View>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
            }}></TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems:'center',
    // justifyContent:'center'
    flex: 1,
    // backgroundColor: Colors.divColor,
    height: '100%',
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    // alignItems: 'center',
  },
  title: {
    marginLeft: Math.round(Dimensions.get('window').width) * 0.07,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  data: {
    backgroundColor: Colors.divColor,
    // padding: 10,
    borderRadius: 14,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 17,
    paddingLeft: 16,
    fontSize: 15,
  },
});

export default EditRecords;
