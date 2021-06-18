import React from 'react';
import {View, Text, StyleSheet, StatusBar, Button} from 'react-native';
import Colors from '../../colors/Colors';
import {useNavigation} from '@react-navigation/native';

const UserProfile = (props) => {
  const navigation = useNavigation();

  const id = props.route.params.id;
  return (
    <View style={{flex: 1}}>
      <Button
        title="Add History"
        onPress={() => navigation.navigate('AddHistory')}></Button>
      <Text>{id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default UserProfile;
