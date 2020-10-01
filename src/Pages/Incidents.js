import React,{useState, createRef} from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const Incidents = () => {
    const routes = useRoute();
    const Incident = routes.params.desc;

    return (
        <SafeAreaView style={styles.body}>
            <Image style={{
                padding:'45%',
                borderRadius:20,
                borderWidth:1,
                borderColor:'#fff'
            }} source={{uri:Incident.picture}}/>

            <Text style={{
                fontSize:20,
                color:'#fff'
            }}>Nesse local ocorreu {Incident.ocorrido}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#171C26',
    },
    inputBox:{
        marginTop:2,
        marginBottom:2,
        borderRadius:10,
        marginHorizontal:20,
        backgroundColor:'#ffffffaa',
    },
    imgup:{
        padding:10,
        marginTop:2,
        borderRadius:10,
        alignItems:'center',
        marginHorizontal:20,
        backgroundColor:'#ffffffaa',
    },
    buttonSend:{
        padding:10,
        marginTop:5,
        borderRadius:10,
        alignItems:'center',
        marginHorizontal:50,
        backgroundColor:'#1CC761',
    },
    modalView:{
        position:'absolute',
        bottom:2,
        width:'100%',
        backgroundColor:'#ffffffaa'
    },
    buttonSelect:{
        padding:10,
        marginTop:5,
        marginBottom:5,
        borderRadius:10,
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:20,
        // backgroundColor:'#7B839A',
    }
})

export default Incidents;