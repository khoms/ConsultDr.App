import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,ImageBackground} from 'react-native';
import  Colors from '../colors/Colors';


const HospitalBox =(props)=>{
    return(
        <TouchableOpacity style={styles.mainBox} onPress={props.onSelect}>

    
    <ImageBackground style={styles.image}  source={{ uri: props.photo}}>
    <View style={styles.title}>
    <Text style={{color:'white',marginLeft:10,fontSize:18}} numberOfLines={1}>{props.name}</Text>
    </View>
    </ImageBackground>
    

        </TouchableOpacity>
    )

}

const styles =StyleSheet.create({
    mainBox:{
        width:152,
        height:150,
        backgroundColor:Colors.view,
        borderColor:'grey',
        borderWidth:0.4,
        marginLeft:22,
        marginTop:12,
        borderRadius:20,
        overflow:'hidden',
        // elevation:10
    },
    image:{
        width:'100%',
        height:'100%',
        justifyContent:'flex-end'
    },
    title:{
        backgroundColor:'rgba(0,0,0,0.5)'
        
    }


})

export default HospitalBox;