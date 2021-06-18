import React from 'react';
import {View, Text, FlatList, Image, StyleSheet, StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Message from '../Message';
import Colors from '../../colors/Colors';
import {useNavigation} from '@react-navigation/native';

const FriendListScreen = () => {
  const navigation = useNavigation();
  const name = 'Bhola Raj Upadhyaye';
  const id = '604759e6d5ed893e2439a8da';
  // const availableChat = useSelector((state) => state.usersOnline);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={Colors.primary} />

      <View style={styles.header}>
        <Text
          style={{
            marginTop: 14,
            marginLeft: 14,
            fontSize: 24,
            fontWeight: '600',
            color: 'white',
          }}>
          Message
        </Text>
      </View>
      {/* <FlatList
        data={usersOnline}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
            //   onPress={() =>
            //     navigation.navigate('Chat', {
            //       name: item.username,
            //       userId: item.userId
            //     })
            //   }
            >
              <View style={itemContainerStyles}>
                <Image style={avatarImageStyle} source={{ uri: item.avatar }} />
                <View style={avatarNameViewStyle}>
                  <Text style={{ fontSize: 25 }}>{item.username}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.username}
      /> */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Message', {
            name: name,
            userId: id,
          })
        }>
        <View style={styles.box}>
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
              Dr. {name}
            </Text>
            <Text style={{marginVertical: 8, opacity: 0.6}}>
              Last Message comes here
            </Text>
          </View>
        </View>
        {/* <View style={styles.box}></View> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '15%',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    // position:'absolute'
  },
  box: {
    // flex: 1,
    height: 100,
    width: '90%',
    // alignItems:'center',
    marginHorizontal: '5%',
    marginTop: 12,

    overflow: 'hidden',
    elevation: 9,
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: Colors.text,
    borderColor: Colors.secondary,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    flexDirection: 'row',
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
  title: {
    fontSize: 20,
    // textAlign: 'right',
    fontWeight: '600',
    // marginBottom:6
  },
});

export default FriendListScreen;
