import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../colors/Colors';
import Ip from '../ip';

const History = () => {

    const [historyList, setHistoryList] = useState('');
    const [userHistory, setUserHistory] = useState('');
    const [userId, setUserId] = useState('');


    const Boiler = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
  }


    useEffect(() => {
        Boiler();
        if (!!historyList) {

            // '0aooafaskabc'
            const data = historyList.filter((item) => item.userId == userId);
            setUserHistory(data);

        } else fetchHsitory();
    }, [historyList]);

    const fetchHsitory = () => {
        fetch(`http://${Ip.ip}:5000/api/history`)
            .then(res => res.json())
            .then(histories => {
                // console.log(histories)
                setHistoryList(histories.data)
                // 
                console.log(historyList);


            }
            )
            .catch(err => {
                console.log(err);
            })
    }

    const Listing = (props) => {
        return (
            <View style={styles.listing}>
                <View style={styles.listingItem}>
                    <Text style={styles.title}>Title:</Text>
                    <Text style={styles.item}>{props.title}</Text>
                </View>
                <View style={styles.listingItem}>
                    <Text style={styles.title}>Consulted By:</Text>
                    <Text style={styles.item}>{props.drName}</Text>
                </View>
                <View >
                    <Text style={styles.title}>Prescription:</Text>
                    <Text style={styles.item}>{props.prescription}</Text>
                </View>
                <View style={styles.listingItem}>
                    <Text style={styles.title}>Medicines:</Text>
                    <Text style={styles.item}>{props.medicine}</Text>
                </View>
                <View style={styles.listingItem}>
                    <Text style={styles.title}>Date:</Text>
                    <Text style={styles.item}>{props.date}</Text>
                </View>



            </View>
        )
    }

    return (
        <View>

            <StatusBar backgroundColor={Colors.primary} />
            {/* <View style={styles.container}> */}


                <View style={styles.header}>
                    <Text style={{ marginTop: 14, marginLeft: 30, fontSize: 24, fontWeight: '600', color: 'white' }}>Medical History</Text>

                </View>




                {userHistory ?
                    <ScrollView style={{ top: -35, paddingBottom: 100 ,marginBottom:70}} >





                        {userHistory.map((userData) => (

                            <Listing
                                key={userData?._id}
                                title={userData?.title}
                                drName={userData?.doctorName}
                                prescription={userData?.prescription}
                                medicine={userData.medicines}
                                date={userData.date}
                            />

                        ))}
                    </ScrollView>



                    :
                    <View style={{ flex: 1, paddingTop: 20, justifyContent: 'center' }}>
                        <Text>No records found!!!</Text>
                        <ActivityIndicator size={60} color='black' />
                    </View>}

        
        
 





            

        {/* </View> */}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        // alignItems:'center',
        // justifyContent:'center'
        // flex: 1,

    },
    header: {
        width: '100%',
        height: 100,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        // alignItems: 'center',

    },
    listing: {
        width: '88%',
        // height:150,
        borderColor: Colors.secondary,
        backgroundColor: Colors.view,
        alignSelf: 'center',
        borderWidth: 0.4,
        borderRadius: 20,
        // alignItems:'center',
        justifyContent: 'center',
        // marginLeft: 14,
        elevation: 4,
        paddingVertical: 34,
        marginVertical: 8,
        paddingLeft: 18,
        // overflow:'visible'
    },
    listingItem: {
        paddingVertical: 3,
        // flexDirection: 'row'
    },
    title:{
        fontSize: 19,
         fontWeight: '600',
         marginVertical:4
    },
    item:{
        // flex: 1,
        // flexWrap: 'wrap',
        fontSize:16,
        marginHorizontal:7,
        backgroundColor:Colors.tryNav,
        borderRadius:14,
        padding:10,
        lineHeight:20,
        // alignSelf:'flex-start'
    }

})

export default History;