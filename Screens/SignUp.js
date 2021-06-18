import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../colors/Colors';
import Ip from '../ip';



const SignUp = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');

    const SignUpScreen = () => {
        fetch(`http://${Ip.ip}:5000/api/user`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "name": name,
                "age": age,
                "phone": phone,
                "email": email,
                "password": password

            })
        })
            .then(res => res.json())
            .then(data => { console.log(data) })
            .catch(err => {
                console.log(err.message)
            })
    }
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.title}>
                    <Text style=
                        {{ fontSize: 25, color: Colors.primary, fontWeight: '600', alignSelf: 'flex-start' }}> Create an Account</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        style={styles.input}
                        placeholder='Full Name'
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Age'
                        value={age}
                        onChangeText={(text) => setAge(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Phone Number'
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />

                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder='Password'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />

                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder='Confirm Password'
                        value={password1}
                        onChangeText={(text) => setPassword1(text)}
                    />

                    <TouchableOpacity style={styles.loginBtn} onPress={() => SignUpScreen()}>
                        <Text style={{ color: 'white', fontSize: 17 }}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={{ marginVertical: 15, fontSize: 18 }}>OR</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('login')}>
                        <Text style={{ fontSize: 15 }}>Already have an Account</Text>
                    </TouchableOpacity>
                    <View><Text>{name}</Text></View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colors.secondary

    },
    innerContainer: {
        width: '85%',
        padding: 20,
        borderWidth: 0.3,
        borderRadius: 20,
        backgroundColor:Colors.divColor,

        justifyContent: 'center'
    },
    title: {
        marginVertical: 10

    },
    input: {
        width: '90%',
        borderColor: Colors.secondary,
        borderWidth: 0.6,
        borderRadius: 18,

        paddingLeft: 15,
        marginVertical: 10
    },
    loginBtn: {
        width: '40%',
        height: 32,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10
    }

})
export default SignUp;