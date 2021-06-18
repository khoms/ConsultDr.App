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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../colors/Colors';
import Ip from '../ip';
import {useNavigation} from '@react-navigation/native';

const MedicalNotes = () => {
  const navigation = useNavigation();

  const [recordList, setRecordList] = useState('');
  const [userRecords, setUserRecords] = useState('');
  const [userId, setUserId] = useState('');
  const screenWidth = Math.round(Dimensions.get('window').width);

  const Boiler = async () => {
    const id = await AsyncStorage.getItem('userId');
    setUserId(id);
  };

  useEffect(() => {
    Boiler();
    if (!!recordList) {
      // '0aooafaskabc'
      const data = recordList.filter((item) => item.userId == userId);
      setUserRecords(data);
    } else fetchNotes();
  }, [recordList]);

  const fetchNotes = () => {
    fetch(`http://${Ip.ip}:5000/api/note`)
      .then((res) => res.json())
      .then((notes) => {
        // console.log(histories)
        setRecordList(notes.data);
        //
        console.log(recordList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Listing = (props) => {
    return (
      <View
        style={{
          flex: 1,
          borderWidth: 1.9,
          borderColor: Colors.view,
          borderRadius: 12,
          margin: 12,
          paddingBottom: 10,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              borderWidth: 2.7,
              borderColor: Colors.primary,
              borderRadius: 12,
              padding: 2,
              paddingTop: 6,
              paddingHorizontal: 9,
              marginTop: 18,
            }}>
            Last updated
          </Text>
          <Text style={{color: Colors.secondary, fontSize: 12}}>
            Date comes here
          </Text>
        </View>
        <View style={{}}>
          <View>
            <Text style={styles.title}>RBC level</Text>
            <Text style={styles.data}>{props.bloodGroup}</Text>
          </View>
          <View>
            <Text style={styles.title}>Blood Pressure</Text>
            <Text style={styles.data}>{props.bloodPressure} mmHg</Text>
          </View>
          <View>
            <Text style={styles.title}>Sugar Level</Text>
            <Text style={styles.data}>{props.sugarLevel} mg/dL</Text>
          </View>
          <View>
            <Text style={styles.title}>Surgical Records</Text>
            <Text style={styles.data}>{props.surgicalRecords}</Text>
          </View>

          <View>
            <Text style={styles.title}>Other Records</Text>
            <Text style={styles.data}>{props.otherRecords}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {/* <View style={styles.container}> */}

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
        <MaterialCommunityIcons
          reverse
          name="add-circle"
          style={{marginTop: 14, marginRight: 14}}
          size={30}
          color="white"
          onPress={() => {
            navigation.navigate('editRecords');
          }}
        />
      </View>
      <View style={{marginTop: 25}}>
        <MaterialCommunityIcons
          reverse
          name="add-circle"
          style={{marginRight: 14, alignSelf: 'center'}}
          size={30}
          color={Colors.primary}
          onPress={() => {
            navigation.navigate('editRecords');
          }}
        />
        <Text
          style={{
            color: Colors.primary,
            alignSelf: 'center',
            fontSize: 16,
            fontWeight: '400',
          }}>
          Add Notes
        </Text>
        {userRecords ? (
          <ScrollView style={{}}>
            {userRecords.map((userData) => (
              <Listing
                key={userData?._id}
                bloodGroup={userData?.bloodGroup}
                bloodPressure={userData?.bloodPressure}
                sugarLevel={userData?.sugarLevel}
                surgicalRecords={userData.surgicalRecords}
                otherRecords={userData.otherRecords}
                date={userData.date}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={{flex: 1, paddingTop: 20, justifyContent: 'center'}}>
            <Text>No records found!!!</Text>
            <ActivityIndicator size={60} color="black" />
          </View>
        )}

        <TouchableOpacity
          style={{justifyContent: 'center', alignSelf: 'center'}}
          onPress={() => navigation.navigate('editRecords')}>
          <Text style={styles.button}>Add Records</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems:'center',
    // justifyContent:'center'
    // flex: 1,
    // backgroundColor: Colors.divColor,
    height: '100%',
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    padding: 6,
    borderRadius: 14,
    width: '65%',
    // alignSelf: 'flex-start',
    marginTop: 6,
    marginLeft: 20,
    paddingLeft: 16,
    fontSize: 15,
  },
  button: {
    borderWidth: 2.7,
    borderColor: Colors.tryNav,
    borderRadius: 12,
    padding: 2,
    paddingTop: 6,
    paddingHorizontal: 9,
    backgroundColor: Colors.primary,
    color: Colors.text,
    fontSize: 16,
    marginBottom: 24,
    letterSpacing: 0.5,
    marginTop: 14,
  },
});

export default MedicalNotes;
