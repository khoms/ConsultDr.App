import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import Colors from '../colors/Colors';
import Ip from '../ip';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const Drprof = (props) => {
  const [doctor, setDoctor] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const [showAvailableAt, setShowAvailableAt] = useState(false);

  const navigation = useNavigation();
  const id = props.route.params.id;
  const name = props.route.params.name;
  const qualification = props.route.params.qualification;

  navigation.setOptions({
    title: `Dr. ${name}`,
    //    headerStyle:{marginHorizontal:10,backgroundColor:Colors.primary}
  });

  useEffect(() => {
    if (!!doctor) {
    } else fetchDoctor();
  }, [doctor]);

  const fetchDoctor = () => {
    fetch(`http://${Ip.ip}:5000/api/doctor/${id}`)
      .then((res) => res.json())
      .then((doctor) => {
        console.log(doctor.data);
        setDoctor(doctor.data);
        // console.log(doctorList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Profile = () => {
    setShowProfile(!showProfile);
    setShowAvailableAt(false);
    setShowSocialMedia(false);
  };

  const AvailableAt = () => {
    setShowAvailableAt(!showAvailableAt);
    setShowSocialMedia(false);
    setShowProfile(false);
  };

  const SocialMedia = () => {
    setShowSocialMedia(!showSocialMedia);
    setShowAvailableAt(false);
    setShowProfile(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/220px-Pierre-Person.jpg',
            }}
          />
        </View>
      </View>
      <View style={styles.mainBox}>
        <View style={styles.drName}>
          <Text style={{fontSize: 20, fontWeight: '600'}} numberOfLines={2}>
            Dr. {name}
          </Text>
          <Text style={{fontSize: 18, color: 'grey'}}>{doctor.speciality}</Text>
        </View>
        <View style={styles.details}>
          <Text
            style={{fontSize: 18, color: Colors.primary, fontWeight: '600'}}>
            10
          </Text>
          <Text
            style={{fontSize: 18, color: Colors.primary, fontWeight: '600'}}>
            Cases
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            width: '40%',
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            marginBottom: 30,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Message')}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
              Consult Online
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <ScrollView style={{width: '100%', marginBottom: 20}}>
        <TouchableOpacity style={styles.dropDown} onPress={Profile}>
          <View style={styles.dropDownView}>
            <Text style={{fontSize: 19, fontWeight: '600'}}>Profile</Text>
            {showProfile ? (
              <Fontisto name="angle-up" color="black" size={20} />
            ) : (
              <Fontisto name="angle-down" color="black" size={20} />
            )}
          </View>
          {showProfile ? (
            <View style={styles.hiddenView}>
              <Text style={styles.hiddenText}>
                Qualifications: {qualification}
              </Text>
              <Text style={styles.hiddenText} t>
                Speciality: {doctor.speciality}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropDown} onPress={AvailableAt}>
          <View style={styles.dropDownView}>
            <Text style={{fontSize: 19, fontWeight: '600'}}>Available At</Text>
            {showAvailableAt ? (
              <Fontisto name="angle-up" color="black" size={20} />
            ) : (
              <Fontisto name="angle-down" color="black" size={20} />
            )}
          </View>
          {showAvailableAt ? (
            <View style={styles.hiddenView}>
              {doctor.worksAt.map((data) => {
                return <Text style={styles.hiddenText}>{data}</Text>;
              })}
            </View>
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          style={{...styles.dropDown, marginBottom: 10}}
          onPress={SocialMedia}>
          <View style={styles.dropDownView}>
            <Text style={{fontSize: 19, fontWeight: '600'}}>Social Media</Text>
            {showSocialMedia ? (
              <Fontisto name="angle-up" color="black" size={20} />
            ) : (
              <Fontisto name="angle-down" color="black" size={20} />
            )}
          </View>

          {showSocialMedia ? (
            <View style={styles.hiddenView}>
              <Fontisto
                name="facebook"
                color="black"
                size={20}
                style={{...styles.hiddenText, paddingHorizontal: 7}}
              />
              <Fontisto
                name="instagram"
                color="black"
                size={20}
                style={{...styles.hiddenText, paddingHorizontal: 7}}
              />
              <Fontisto
                name="twitter"
                color="black"
                size={20}
                style={{...styles.hiddenText, paddingHorizontal: 7}}
              />
            </View>
          ) : null}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '15%',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // position:'absolute'
  },
  imageView: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderWidth: 0.7,
    borderColor: 'black',
    top: 40,
    overflow: 'hidden',
  },
  image: {
    width: 150,
    height: 150,
  },
  mainBox: {
    marginTop: 80,
    width: '90%',
    borderColor: 'grey',
    borderWidth: 0.6,
    borderRadius: 40,
    alignItems: 'center',
    // backgroundColor:Colors.secondary,
    // padding:12
  },
  drName: {
    // marginTop:80,
    alignItems: 'center',
    padding: 12,
  },
  details: {
    alignItems: 'center',
    padding: 8,
  },
  dropDown: {
    width: '85%',
    // height:50,
    borderColor: 'black',
    // borderWidth:0.1,
    borderRadius: 10,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    // justifyContent:"space-between",
    // flexDirection:'row',
    elevation: 3,
  },

  dropDownView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // alignSelf:'center',
  },
  hiddenView: {
    width: '85%',
    marginVertical: 15,
    paddingHorizontal: 5,
  },
  hiddenText: {
    fontSize: 18,
    paddingBottom: 7,
  },
});
export default Drprof;
