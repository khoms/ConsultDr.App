import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../colors/Colors';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const ListingBox = (props) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity style={styles.listingBox} onPress={props.onSelect}>
        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{
                uri:
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/220px-Pierre-Person.jpg',
              }}
            />
          </View>
          <View style={{marginLeft: 30, paddingVertical: 10}}>
            <Text style={styles.title} numberOfLines={2}>
              {props.post ? (
                <Text>Dr. {props.name}</Text>
              ) : (
                <Text>{props.name}</Text>
              )}
            </Text>
            <Text numberOfLines={2} style={{paddingVertical: 2}}>
              {props.category}
              <Text style={{fontSize: 18, letterSpacing: 6}}> </Text>
              {props.gender}
            </Text>
            <Text numberOfLines={2}>{props.study}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listingBox: {
    flex: 1,
    height: 100,
    width: '90%',
    // alignItems:'center',
    marginHorizontal: '5%',
    marginTop: 12,

    overflow: 'hidden',
    elevation: 9,

    // top:80
  },
  container: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: Colors.text,
    borderColor: Colors.secondary,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    flexDirection: 'row',
    // alignItems:'stretch'
    // backgroundColor:Colors.title
    // elevation:3,
    // padding:30,
    // justifyContent:'flex-end',
    // alignItems:'flex-end'
  },
  title: {
    fontSize: 20,
    // textAlign: 'right',
    fontWeight: '600',
    // marginBottom:6
  },
  imageView: {
    width: 85,
    height: 85,
    borderRadius: 805,
    borderWidth: 0.5,
    borderColor: 'grey',
    overflow: 'hidden',
    marginLeft: 20,
    marginTop: 2.5,
    // alignSelf: 'flex-start',
  },
  image: {
    width: 85,
    height: 85,
  },
});

export default ListingBox;
