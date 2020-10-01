import React,{useState, createRef} from 'react';
import ImagePicker from 'react-native-image-picker';
import Search from '../Components/Search';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const initialState = {
    local: {
        latitude:0,
        longitude:0,
    },
}

const addIncidents = () => {
    const navigation = useNavigation();

    const [state, setState] = useState({...initialState})
    const lat = `${state.local.latitude}`;
    const lng = `${state.local.longitude}`;

    const [pronto, setPronto] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [error, setError] = useState(false);

    const get = 'Local'
    const [oco, setOco] = useState('');
    const [picture, setPicture] = useState('');
    const [modal, setModal] = useState(false);

   const _ImageSave = () => {
        fetch('https://my-security.herokuapp.com/NRBQlog6f2Pwnqe3adQJ',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                getLocal:get,
                ocorrido:oco,
                picture:picture,
                latitude: lat,
                longitude: lng,
            })
        }).then(res => res.json())
        .then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log("pronto",err)
        })
        navigation.goBack();
    }

    const _uploadImage = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (res) => {
            console.log("res =", res);
            if(res.didCancel){
                console.log("Usuario cancelou a imagem")
            }else if(res.pronto){
                console.log('imagem pronto', res.pronto)
            }else{
                const uri = res.uri
                const type = 'image/jpg'
                const name = res.fileName
                const source = {uri, type, name}
                console.log(source)
                handleUpdate(source)
            }
        })
    }

    const handleUpdate = (photo)=>{
        setCarregando(true);
        setPronto(false);
        setError(false);
        const data = new FormData()
        data.append('file',photo)
        data.append('upload_preset','MySecurity')
        data.append('cloud_name','zasetrewsqw')
        fetch('https://api.cloudinary.com/v1_1/zasetrewsqw/image/upload',{
            method:'POST',
            body:data,
            headers:{
                'Accept':'application/json',
                'Content-Type':'multipart/form-data'
            }
        }).then(res => res.json())
        .then(data => {
            setPicture(data.url)
            setModal(false)
            setCarregando(false);
            setPronto(true);
            console.log(data)
        }).catch(err=>{
            setError(true);
            setCarregando(false);
            console.log('erro de upload')
        })
    }

    const _takePhoto = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (res) => {
            console.log("res =", res);
            if(res.didCancel){
                console.log("Usuario cancelou a imagem")
            }else if(res.pronto){
                console.log('imagem pronto', res.pronto)
            }else{
                const uri = res.uri
                const type = 'image/jpg'
                const name = res.fileName
                const source = {uri, type, name}
                console.log(source)
                handleUpdate(source)
            }
        })
    }

    const handleLocationSelected = (data, {geometry}) => {
        const {location: {lat: latitude, lng: longitude} } = geometry
        setState({
            ...state,
            local:{
                latitude,
                longitude,
                // title: data.structured_formatting.main_text
            }
        })
    }


    return (
        <SafeAreaView style={styles.body}>

            {
                carregando &&
                <View style={{alignItems:"center"}}>
                    <Text style={{color: `#fff`}}>Carregando imagem...</Text>
                </View>
            }{
                pronto &&
                <View style={{alignItems:"center"}}>
                    <Text style={{color: `#fff`}}>Imagem enviada com sucesso </Text>
                </View>
            }{
                error &&
                <View style={{alignItems:"center"}}>
                    <Text style={{color: `#fff`}}>Falha ao tentar enviar a imagem</Text>
                </View>
            }
                
                <TextInput style={styles.inputBox} onChangeText={setOco} value={oco} placeholderTextColor='#555' placeholder="Ocorridos" />
                
                <TouchableOpacity onPress={()=>setModal(true)} style={styles.imgup}>
                    <Text style={{color:'#fff',fontSize:20}}>Carregar Imagem</Text>
                </TouchableOpacity>

                <Search onLocationSelected={handleLocationSelected}/>

            <View style={{alignItems:'center'}}>
                <TouchableOpacity onPress={()=>_ImageSave()} style={styles.buttonSend}>
                    <Text style={{color:'#fff',fontSize:20}}>Enviar</Text>
                </TouchableOpacity>
            </View>
            
            <Modal transparent={true} onRequestClose={()=>{setModal(false)}} animationType="slide" visible={modal}>
                <View style={styles.modalView}>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <TouchableOpacity onPress={()=>_takePhoto()} style={[styles.buttonSelect,{backgroundColor:'#7B839A'}]}>
                            <Text style={{color:'#fff',fontSize:20}}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setModal(false)} style={[styles.buttonSelect,{backgroundColor:'#ff0000'}]}>
                            <Text style={{color:'#fff',fontSize:20}}>Sair</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>_uploadImage()} style={[styles.buttonSelect,{backgroundColor:'#7B839A'}]}>
                            <Text style={{color:'#fff',fontSize:20}}>Galeria</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body:{
        flex:1,
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

export default addIncidents;