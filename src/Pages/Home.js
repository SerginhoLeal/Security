import React, {useState, useEffect} from 'react'
import {useNavigation} from '@react-navigation/native';
import { View, Text, SafeAreaView, Animated } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapsView,{Marker, Callout} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Options from '../Components/Options'


const Home = (props) => {
    const mode = new Animated.Value(0)

    const navigation = useNavigation();

    function handleNextPage(){
        navigation.navigate('Adicionar')
    }

    function handleNextLocal(desc){
        navigation.navigate('Incidents',{desc})
    }

    const [docs, setDocs] = useState([]);

    const [currentRegion, setCurrentRegion] = useState(null)
    // console.log(currentRegion)
    
    async function loadInitialPosition(){
        await Geolocation.getCurrentPosition(
            (position) => {
                const {coords} = position
                const {latitude, longitude} = coords
                console.log(coords)
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0,
                    longitudeDelta: 0.005,
                })
            },
        );
    }

    useEffect(() => {
        loadInitialPosition();
    },[]);

    const [carregando, setCarregando] = useState(false)

    async function handleSearch(){
        setCarregando(true)

        const {latitude, longitude} = currentRegion;

        fetch(`https://my-security.herokuapp.com/8dr7YKjlJ3aXKcnwGJrm?latitude=${latitude}&longitude=${longitude}&getLocal=Local`,{
            method:'get',
            headers:{
                'Content-Type':'application/json',
                // 'Authorization':`Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then(res => {
            setDocs(res.business)
            setCarregando(false)
            toggleMenu()
        })
    }
    const toggleMenu = () => {
        Animated.timing(mode,{
            toValue:mode._value === 0 ? 1 : 0,
            useNativeDriver: false,
        }).start();
    }


    function handleRegionChange(region){
        // console.log("regiao",region)
        setCurrentRegion(region);
    }

    if (!currentRegion){
        return null;
    }

    return (

        <SafeAreaView style={{flex:1}}>
            <MapsView
                onRegionChangeComplete={handleRegionChange}
                style={{flex:1}}
                initialRegion={currentRegion}
                showsUserLocation
                loadingEnabled
            >
                {docs.map(desc => (
                    <Marker 
                        key={desc._id} 
                        coordinate={{
                            longitude:desc.location.coordinates[0],
                            latitude:desc.location.coordinates[1],
                        }}>

                        <Icon name="map-pin" size={30} color="#1c1c1c"/>

                        <Callout onPress={()=>handleNextLocal(desc)}>
                            <View style={{width:200,alignItems:'center'}}>
                                <Text style={{fontSize:20}}>--{desc.ocorrido}--</Text>
                            </View>
                        </Callout>

                    </Marker> 
                ))}
            </MapsView>
            
            <Options 
                handleNextPage={handleNextPage}
                handleSearch={handleSearch}
                // handleModal={handleModal}
                style={{bottom:'3%'}} 
            />

                {
                    carregando &&
                    <View style={{position:'absolute',left:0,right:0,alignItems:"center"}}>
                        <Text style={{color: `#000`}}>Carregando</Text>
                    </View>
                }

        </SafeAreaView>
    );
}

export default Home;