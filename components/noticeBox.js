import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Colors from '../colors/Colors';

const NoticeBox = (props) => {
  const id = props.id;
  return (
    <TouchableOpacity style={styles.mainBox} onPress={props.onSelect}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{
              uri: `../../Consult-Doctor/public/uploads/notice/${id}`,
            }}
          />
        </View>

        <View style={{width: 140}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '700',
              color: 'black',
              marginTop: 7,
            }}>
            {props.category}
          </Text>
          <Text
            numberOfLines={3}
            style={{color: 'grey', fontSize: 15, marginTop: 4, marginRight: 5}}>
            {props.title}
          </Text>
        </View>
      </View>

      <View
        style={{
          width: 120,
          backgroundColor: 'white',
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
          alignSelf: 'flex-end',
        }}>
        <Text style={{fontSize: 15}}>see more</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    width: 240,
    height: 140,
    backgroundColor: Colors.view,
    borderColor: 'grey',
    borderWidth: 0.4,
    marginLeft: 22,
    marginTop: 12,
    borderRadius: 20,
    marginBottom: 60,
  },
  imageView: {
    width: 90,
    height: 70,
    borderRadius: 14,
    overflow: 'hidden',
    margin: 6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default NoticeBox;
