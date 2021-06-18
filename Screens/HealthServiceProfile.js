import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import Colors from '../colors/Colors';
import Ip from '../ip';

const HealthServiceProfile = (props) => {
  const name = props.route.params.name;
  const address = props.route.params.address;
  const id = props.route.params.id;
  const photo = props.route.params.photo;

  useEffect(() => {
    fetchHospital();
  }, [hospital]);
  const [hospital, setHospital] = useState('');
  const fetchHospital = () => {
    fetch(`http://${Ip.ip}:5000/api/healthCenter/${id}`)
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
  return (
    <View style={styles.container}>
      <View style={{height: 60, backgroundColor: Colors.primary}}>
        <View style={{alignItems: 'center', top: 16, flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '600',
              color: 'white',
              marginLeft: 20,
            }}>
            {name}
          </Text>
        </View>
      </View>
      <View style={styles.header}></View>

      <View style={styles.imageView}>
        <Image style={styles.image} source={{uri: photo}} />
      </View>

      {/* <Text style={{ fontSize: 28, fontWeight: '600', marginBottom: 14, alignSelf: 'center', marginTop: -50 }} numberOfLines={2}>{name}</Text> */}
      <ScrollView style={{top: -50}}>
        <View style={styles.mainBox}>
          <Text style={styles.details}>Location: {hospital.name}</Text>
          <Text style={styles.details}>Phone No.: {hospital.phone}</Text>
          <Text style={styles.details}>Fax: 061521521</Text>
          <Text style={styles.details}>E-mail: {hospital.email}</Text>
          <Text style={styles.details}>Website: www.website.com</Text>
        </View>

        <View style={styles.aboutUs}>
          <TouchableOpacity style={{marginBottom: 20}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                textDecorationLine: 'underline',
              }}>
              Our Services{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                textDecorationLine: 'underline',
              }}>
              Doctors
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: '8%',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 50,
    // marginLeft:8
    // position:'relative'
  },
  imageView: {
    width: '96%',
    height: 240,
    marginTop: 12,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: Colors.secondary,
    overflow: 'hidden',
    alignSelf: 'center',
    top: -60,
    elevation: 7,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  mainBox: {
    width: '90%',
    borderColor: Colors.secondary,
    elevation: 8,
    borderWidth: 0.6,
    borderRadius: 35,
    alignSelf: 'center',
    backgroundColor: Colors.view,
    padding: 20,
  },
  details: {
    paddingBottom: 12,
    fontSize: 18,
  },
  aboutUs: {
    alignSelf: 'flex-start',
    marginLeft: 18,
    marginTop: 20,
  },
});

export default HealthServiceProfile;
