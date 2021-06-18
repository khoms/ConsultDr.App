import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../colors/Colors';
import Ip from '../ip';
import {useNavigation} from '@react-navigation/native';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const EditProfile = (props) => {
  const [id, setId] = useState(props.route.params.id);
  const [dob, setDob] = useState(props.route.params.dob);
  const [name, setName] = useState(props.route.params.name);
  const [weight, setWeight] = useState(props.route.params.weight);
  const [height, setHeight] = useState(props.route.params.height);
  const [phoneNo, setPhoneNo] = useState(props.route.params.phoneNo);

  const [photo, setPhoto] = useState('');

  const [dummyImage, setDummyImage] = useState(
    'https://khomkhoms.files.wordpress.com/2019/01/cropped-f.jpg?w=200',
  );

  const [pwScreen, setPwScreen] = useState(false);
  const [userId, setUserId] = useState('');

  const [filePath, setFilePath] = useState({});
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const Boiler = async () => {
    const id = await AsyncStorage.getItem('userId');
    setUserId(id);
  };

  useEffect(() => {
    Boiler();
    //    fetchUser();
  });

  //   const fetchUser = () => {
  //     fetch(`http://192.168.1.164:5000/api/user/${userId}`)
  //       .then(res => res.json())
  //       .then(user => {
  //         // console.log(user.data)
  //         setUser(user.data)
  //         // console.log(user);

  //       }
  //       )
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   }

  const navigation = useNavigation();

  const validateInput = () => {
    if (name == '' || phoneNo == '') {
      Alert.alert('Type Error', 'Name and phone no cannot be left empty');
      return false;
    }
    return true;
  };

  const SaveApi = () => {
    console.log('arrive here1');
    fetch(`http://${Ip.ip}:5000/api/user/${userId}`, {
      // fetch(`http://192.168.1.121:5000/api/user/604a0290166ee228e00bacfa`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        name: name,
        dob: dob,
        phone: phoneNo,
        weight: weight,
        height: height,
      }),
    })
      .then((res) => {
        res.json();
        console.log('arrive here2');
      })
      .then((data) => {
        console.log(data);
        console.log('nepal');
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
    return true;
  };

  const SaveData = () => {
    if (validateInput()) {
      // SaveApi;
      if (SaveApi()) {
        navigation.navigate('Profile');
        console.log(userId);
      } else {
        Alert.alert(
          'Updating Error',
          'Sorry! we are facing error on saving your updated information',
        );
      }
    } else {
      Alert.alert(
        'Updating Error',
        'Sorry! we are facing error on saving your updated information.Make sure you have entered correct data',
      );
    }
  };

  const changeEditScreen = () => {
    setPwScreen(!pwScreen);
  };
  const matchPassword = () => {
    console.log('nepal');
  };
  const changePassword = () => {
    if (password == password1) {
      setPassword(password);
      setPasswordError('');
    } else {
      setPasswordError('Password Donot match');
      setPassword('');
      setPassword1('');
    }
    // if(passwordMatch()){

    // }
    // navigation.navigate('Profile');
  };
  // const BorderLine = () => {
  //     return (
  //         <View style={{ widht: '90%', height: 1, elevation: 3, backgroundColor: Colors.view }}></View>
  //     )
  // }

  // const selectImage = async () => {
  //     // Pick a single file
  //     try {
  //         const res = await DocumentPicker.pick({
  //             type: [DocumentPicker.types.images],
  //         });
  //         console.log(
  //             res.uri,
  //             res.type, // mime type
  //             res.name,
  //             res.size
  //         )
  //         if(res.uri){
  //             setPhoto(res)
  //             handleUploadPhoto();

  //         };
  //     } catch (err) {
  //         if (DocumentPicker.isCancel(err)) {
  //             // User cancelled the picker, exit any dialogs or menus and move on
  //         } else {
  //             throw err;
  //         }
  //     }
  // }

  // const handleUploadPhoto = () => {
  //     fetch(`http://192.168.1.164:5000/api/user/${userId}/photo`, {
  //       method: "POST",
  //       body: createFormData(photo)
  //     })
  //       .then(response => response.json())
  //       .then(response => {
  //         console.log("upload succes", response);
  //         alert("Upload success!");
  //         setPhoto(null);
  //       })
  //       .catch(error => {
  //         console.log("upload error", error);
  //         alert("Upload failed!");
  //       });
  //   };

  const selectImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response.data;

        // console.log(response);
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        setFilePath(source);
        uploadImage(response);
        setDummyImage(response.uri);
      }
    });
  };

  let uploadImage = async (response) => {
    console.log('upload image section');
    // console.log('trrrrry', response);
    if (response) {
      const data = new FormData();
      const extension = response.type
        ? response.type.replace('image/', '')
        : reponse.uri.split('.').pop();

      data.append('image', {
        name: `${new Date().toString()}.${extension}`,
        type: response.type || `image/${extension}`,
        uri:
          Platform.OS === 'android'
            ? response.uri
            : response.uri.replace('files://', ''),
      });

      console.log('api calling....');
      console.log(Ip.ip, userId);
      // axios
      //   .post(`http://${Ip.ip}/api/user/5f0ec0e69fdf1a05e02150ec/photo`, data, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   })
      fetch(`192.168.137.1:5000/api/user/5f0ec0e69fdf1a05e02150ec/photo`, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          console.log('failed');
        });
      console.log('api calling finished...');
      // }
      //   fetch(`192.168.137.1:5000/api/user/5f0ec0e69fdf1a05e02150ec`, {
      //     method: 'PUT',
      //     body: JSON.stringify({
      //       name: 'Khoms',
      //     }),
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   })
      //     .then((res) => {
      //       console.log(res);
      //     })
      //     .catch((error) => {
      //       console.log(error.message);
      //       console.log('failed');
      //     });
      //   console.log('api calling finished...');
    } else {
    }
    // //Check if any file is selected or not
    // if (filePath != null) {
    //   //If file selected then create FormData
    //   const fileToUpload = filePath;
    //   const data = new FormData();
    //   data.append('name', 'Image Upload');
    //   data.append('file_attachment', fileToUpload);
    //   let res = await fetch(`http://${Ip.ip}/api/user/${userId}/photo`, {
    //     method: 'post',
    //     body: data,
    //     headers: {
    //       'Content-Type': 'multipart/form-data; ',
    //     },
    //   });
    //   let responseJson = await res.json();
    //   if (responseJson.status == 1) {
    //     alert('Upload Successful');
    //   }
    // } else {
    //   //if no file selected the show alert
    //   alert('Please Select File first');
    // }
  };

  return (
    <View>
      <StatusBar backgroundColor={Colors.primary} />
      {pwScreen ? (
        <View>
          <View style={{...styles.header, flexDirection: 'row'}}>
            <Text
              style={{
                marginTop: 14,
                fontSize: 24,
                marginLeft: 24,
                fontWeight: '600',
                color: 'white',
                textAlign: 'left',
              }}>
              Change Password
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 80,
            }}>
            <View
              style={{
                width: '90%',
                height: 340,
                borderColor: 'grey',
                borderWidth: 0.4,
                borderRadius: 20,
                paddingVertical: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <View
                style={{
                  // flexDirection: 'column',
                  marginVertical: 10,
                  alignItems: 'center',
                }}> */}
              <Text
                style={{
                  fontSize: 14,
                  marginRight: 10,
                  marginLeft: 5,
                  alignSelf: 'flex-start',
                  left: 10,
                  fontSize: 16,
                }}>
                Current Password
              </Text>
              <TextInput
                style={styles.textIp}
                placeholder=""
                secureTextEntry={true}></TextInput>
              {/* </View> */}

              {/* <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  alignItems: 'center',
                }}> */}
              <Text
                style={{
                  fontSize: 14,
                  marginRight: 10,
                  marginLeft: 5,
                  alignSelf: 'flex-start',
                  left: 10,
                  fontSize: 16,
                }}>
                New Password
              </Text>
              <TextInput
                style={styles.textIp}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}></TextInput>
              {/* </View> */}

              {/* <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  alignItems: 'center',
                }}> */}
              <Text
                style={{
                  fontSize: 14,
                  marginRight: 10,
                  marginLeft: 5,
                  alignSelf: 'flex-start',
                  left: 10,
                  fontSize: 16,
                }}>
                Confirm Password
              </Text>
              <TextInput
                style={styles.textIp}
                secureTextEntry={true}
                value={password1}
                onChangeText={(text) => setPassword1(text)}></TextInput>
              {/* </View> */}

              <Text style={{color: 'red'}}>
                {password1}
                {passwordError}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: 10,
                  borderRadius: 30,
                }}>
                <TouchableOpacity
                  style={{
                    marginTop: 6,
                    alignSelf: 'center',
                    width: 90,
                    height: 35,
                    borderColor: 'red',
                    // borderWidth: 1,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    overflow: 'hidden',
                  }}
                  onPress={changePassword}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'white',
                      textAlign: 'center',
                      backgroundColor: Colors.primary,
                      paddingHorizontal: 14,
                      paddingVertical: 6,
                    }}>
                    Change
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginTop: 6,
                    alignSelf: 'center',
                    width: 90,
                    height: 35,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    overflow: 'hidden',
                  }}
                  onPress={changeEditScreen}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'white',
                      textAlign: 'center',
                      backgroundColor: Colors.secondary,
                      paddingHorizontal: 14,
                      paddingVertical: 6,
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <KeyboardAvoidingView behavior="height">
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.header}>
                <MaterialCommunityIcons
                  name="save"
                  style={{right: -20}}
                  size={25}
                  color="white"
                  onPress={SaveData}
                />
                <Text
                  style={{
                    marginTop: 14,
                    marginLeft: 24,
                    fontSize: 24,
                    fontWeight: '600',
                    color: 'white',
                  }}>
                  Edit Profile{pwScreen}
                </Text>
              </View>

              <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  source={{
                    uri: dummyImage,
                  }}></Image>
              </View>
              <View
                style={{alignItems: 'center', top: -20, left: 55, top: -25}}>
                <MaterialCommunityIcons
                  name="edit"
                  style={{backgroundColor: Colors.view, borderRadius: 14}}
                  size={25}
                  color={Colors.primary}
                  onPress={selectImage}
                />
              </View>

              {/* <ScrollView> */}

              <View style={styles.editView}>
                <Text style={styles.title}>Full Name :</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setName(text)}>
                  {name}
                </TextInput>
              </View>

              <View style={styles.editView}>
                <Text style={styles.title}>Date of Birth :</Text>
                {/* <TextInput style={styles.textInput}>{dob}</TextInput>
                 */}
                <DatePicker
                  style={{width: 200, marginLeft: 20, marginTop: -10}}
                  date={dob}
                  mode="date"
                  placeholder="placeholder"
                  format="DD-MM-YYYY"
                  minDate="01-01-1930"
                  maxDate="31-12-2010"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  useNativeDriver={true}
                  iconSource={{
                    uri:
                      'https://as1.ftcdn.net/jpg/02/48/42/66/500_F_248426657_swp1HeXPANtFqJG1LOJGSVHvUspaJfL1.jpg',
                  }}
                  onDateChange={(date) => {
                    setDob(date);
                  }}
                />
              </View>

              <View style={styles.editView}>
                <Text style={styles.title}>Weight :</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setWeight(text)}
                  keyboardType={'numeric'}>
                  {weight}
                </TextInput>
                <Text style={{fontSize: 18}}> kg</Text>
              </View>

              <View style={styles.editView}>
                <Text style={styles.title}>Height :</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setHeight(text)}
                  keyboardType={'numeric'}>
                  {height}
                </TextInput>
                <Text style={{fontSize: 18}}> cm</Text>
              </View>

              <View style={styles.editView}>
                <Text style={styles.title}>Phone no. :</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setPhoneNo(text)}
                  keyboardType={'numeric'}>
                  {phoneNo}
                </TextInput>
              </View>

              <TouchableOpacity
                style={{
                  marginTop: 6,
                  alignSelf: 'flex-end',
                  width: 180,
                  height: 35,
                }}
                onPress={changeEditScreen}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.primary,
                    textDecorationLine: 'underline',
                    textAlign: 'right',
                    marginRight: 14,
                    backgroundColor: Colors.divColor,
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 14,
                  }}>
                  Change Password
                </Text>
              </TouchableOpacity>
              {/* <BorderLine/> */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    // alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  imageView: {
    // top:-25,
    width: 160,
    height: 160,
    alignSelf: 'center',
    borderWidth: 8,
    borderColor: Colors.view,
    borderRadius: 160,
    // overflow: 'hidden',
    marginTop: -25,
    // elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderColor: Colors.view,
    borderRadius: 160,
    // elevation:9
  },
  editView: {
    width: '100%',
    height: 45,
    marginTop: 32,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'grey',
    // elevation:1
  },
  title: {
    fontSize: 19,
    paddingLeft: 20,
  },
  textInput: {
    fontSize: 18,
    top: -10,
    paddingLeft: 14,
  },
  textIp: {
    width: '90%',
    height: 40,
    borderWidth: 0.6,
    borderColor: 'grey',
    borderRadius: 10,
    marginVertical: 8,
    // left: 2,
    // marginVertical:10
  },
});

export default EditProfile;
