import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Paragraph,
  Drawer,
  Caption,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import updateStorage from '../App';
import Ip from '../ip';

import {AuthContext} from '../Provider/AuthProvider';

const DrawerContent = (props) => {
  const {getToken} = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState('');
  // const navigation = useNavigation();

  const Boiler = async () => {
    const id = await AsyncStorage.getItem('userId');

    setUserId(id);
  };

  useEffect(() => {
    Boiler();
    if (!!user) {
    } else fetchUser();
    // navigation.addListener('focus',()=>{fetchUser()})
  }, [user, userId]);

  const fetchUser = () => {
    fetch(`http://${Ip.ip}:5000/api/user/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        // console.log(user.data)
        setUser(user.data);
        // console.log(doctorList);
        // console.log(user.id)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = (props) => {
    // AsyncStorage.removeItem('userId');

    AsyncStorage.removeItem('token').then(() => getToken());

    // updateStorage;
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section>
            <View style={styles.userInfoSection}>
              <View
                style={{
                  marginTop: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  left: -30,
                }}>
                <Avatar.Image
                  source={{
                    uri:
                      'https://khomkhoms.files.wordpress.com/2019/01/cropped-f.jpg?w=200',
                  }}
                  size={110}
                />
              </View>
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  left: -30,
                }}>
                <Title style={styles.title}>{user.name}</Title>
                <Caption style={styles.caption}>@{user.email}</Caption>
                <Caption style={styles.caption}>{user.phone}</Caption>
              </View>

              {/* <View style={styles.row}>
                                <View style={styles.section}>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                    <Caption style={styles.caption}>Following</Caption>
                                </View>
                                <View style={styles.section}>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                    <Caption style={styles.caption}>Followers</Caption>
                                </View>
                            </View> */}
            </View>
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="doctor" color={color} size={size} />
              )}
              label="Doctors"
              onPress={() => {
                props.navigation.navigate('Doctors');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="history" color={color} size={size} />
              )}
              label="Medical History"
              onPress={() => {
                props.navigation.navigate('History');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="note" color={color} size={size} />
              )}
              label="Medical Notes"
              onPress={() => {
                props.navigation.navigate('MedicalNotes');
              }}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="frequently-asked-questions"
                  color={color}
                  size={size}
                />
              )}
              label="FAQs"
              onPress={() => {
                props.navigation.navigate('SettingsScreen');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="face-agent" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('SupportScreen');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="code-not-equal" color={color} size={size} />
              )}
              label="Terms and Conditions"
              onPress={() => {
                props.navigation.navigate('SupportScreen');
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={logout}
        />
      </Drawer.Section>
    </View>
  );
};
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  // preference: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     paddingVertical: 12,
  //     paddingHorizontal: 16,
  // },
});

export default DrawerContent;
