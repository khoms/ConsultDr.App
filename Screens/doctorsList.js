import React, {useEffect, useState, useContext} from 'react';
import {
  ActivityIndicator,
  Text,
  Button,
  TextInput,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../colors/Colors';
import Ip from '../ip';
import Search from 'react-native-search-box';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AuthContext from '../Provider/AuthProvider';

import {DoctorsData} from '../data/dummy-data';
import ListingBox from '../components/listingBox';

const DoctorScreen = (props) => {
  // const [doctor,setDoctor]= useState('');
  const [doctorList, setDoctorList] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  // const [showDoctorList,setShowDoctorList] = useState('');
  let displayDoctors;

  // const {userToken} = useContext(AuthContext);

  useEffect(() => {
    if (!!doctorList) {
    } else fetchDoctor();
  }, [doctorList]);

  // const fetchDoctor = async () => {
  //   try{
  //    drs = await fetch('http://192.168.1.164:5000/api/doctor')
  //   .then(res=>res.json())
  // .then((data)=>{console.log(data)
  // setDoctorList(data.count)})
  // }
  // // .catch(err=>{
  // //     console.log(err)

  // // });
  //   catch(e){
  //     console.log(e.message);
  //   }
  //   // if (drs.success) {
  //   //   setDoctorList(drs.data);
  //   // }
  // };

  const fetchDoctor = () => {
    fetch(`http://${Ip.ip}:5000/api/doctor`)
      .then((res) => res.json())
      .then((doctors) => {
        console.log(doctors);
        setDoctorList(doctors.doctors);
        setFilteredList(doctors.doctors);
        console.log(doctorList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderDoctor = (itemData) => {
    // const count = doctorList.length;
    // count=count+1;
    // console.log(count);
    return (
      <ListingBox
        name={itemData.item.name}
        category={itemData.item.category}
        study={itemData.item.education}
        onSelect={() =>
          props.navigation.navigate('doctorProfile', {
            id: itemData.item.id,
            name: itemData.item.name,
            // qualification:itemData.item.
          })
        }
      />
    );
  };

  // {doctorList?.map((doctor) => (
  //   <tr key={`doctor-${doctor?._id}`}>
  //     <th scope="row">{doctor?.nmcNo}</th>
  //     <td>{doctor?.name}</td>
  //     <td>{doctor?.qualification}</td>
  //     <td>{doctor?.worksAt}</td>
  //     <td>

  const handleSearch = (value) => {
    const doctorListClone = [...doctorList];
    const filteredListClone = doctorListClone.filter((el) =>
      el.name.toUpperCase().includes(value.toUpperCase()),
    );
    setFilteredList(filteredListClone);
    console.log(filteredList.length);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />

      <View style={styles.header}>
        <TextInput
          style={styles.search}
          onChangeText={handleSearch}
          placeholder="Search Doctors">
          {/* <Fontisto name="search" color="grey" size={15} /> */}

          {/* {(!searchText) ? <Text style={{ color: 'grey', fontSize: 16 }}>Search Doctors</Text> : null} */}
        </TextInput>
      </View>
      {/* <Text>{JSON.stringify(doctorList)}</Text> */}
      {/* <Button onPress={fetchDoctor} title='Press me' /> */}
      {filteredList ? (
        // <FlatList
        //   keyExtractor={(item, index) => item.id}
        //   data={DoctorsData} renderItem={renderDoctor} numColumns={1} />

        <ScrollView>
          {filteredList.map((doctor) => (
            <ListingBox
              key={doctor?._id}
              name={doctor?.name}
              category={doctor?.speciality}
              study={doctor?.qualification}
              post="Dr."
              onSelect={() =>
                props.navigation.navigate('doctorProfile', {
                  id: doctor?._id,
                  name: doctor?.name,
                  qualification: doctor?.qualification,
                })
              }
            />
          ))}
        </ScrollView>
      ) : (
        <View style={{flex: 1, paddingTop: 20, justifyContent: 'center'}}>
          <ActivityIndicator size={60} color="black" />
        </View>
      )}

      {/* {console.log(doctorList)} */}
    </View>
    // <View style={{flex:1}}>
    //   <View style={styles.outerBox}>

    //     <Text>My name is Nepaal</Text>

    //   </View>
    // </View>
  );
  // })
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outerBox: {
    width: '95%',
    height: 90,
    borderColor: 'grey',
    borderWidth: 0.6,
    borderRadius: 15,
    marginTop: 50,
    marginLeft: '2.5%',
  },
  header: {
    width: '100%',
    height: '15%',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    // position:'absolute'
  },
  search: {
    marginHorizontal: '9%',
    marginTop: 35,
    height: 40,
    borderWidth: 0.3,
    borderColor: 'grey',
    backgroundColor: Colors.text,
    borderRadius: 20,
    paddingLeft: 16,
    paddingTop: 11,
  },
});

export default DoctorScreen;
