import React from 'react';
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

const NoticeDetail = (props) => {
  const title = props.route.params.title;
  const description = props.route.params.description;
  const photo = props.route.params.photo;
  return (
    <View style={styles.container}>
      <View style={{height: 60, backgroundColor: Colors.primary}}>
        <View style={{alignItems: 'center', top: 16, flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '600',
              color: 'white',
              marginLeft: 30,
            }}>
            Notice
          </Text>
        </View>
      </View>
      <View style={styles.header}></View>
      <View
        style={{
          marginHorizontal: 18,
          justifyContent: 'center',
          marginVertical: 14,
        }}>
        <Text numberOfLines={3} style={{fontSize: 23, fontWeight: '700'}}>
          {title}
        </Text>
      </View>

      <View style={styles.imageView}>
        <Image
          style={styles.image}
          // source={{
          //   uri: `../../Consult-Doctor/public/uploads/notice/${props.route.params.id}`,
          // }}
          // source={require('C:Users$userDesktop/158331798_4037371832991709_4118884399383947014_n.jpg')}
        />
      </View>

      {/* <Text style={{ fontSize: 28, fontWeight: '600', marginBottom: 14, alignSelf: 'center', marginTop: -50 }} numberOfLines={2}>{name}</Text> */}
      <ScrollView style={{top: -50}}>
        <View style={styles.mainBox}>
          {/* <Text style={styles.details}>{title}</Text> */}
          <Text style={styles.details}>{description}</Text>
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
    // top: -60,
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

export default NoticeDetail;
