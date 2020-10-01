import React, { useState } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

const Options = (props) => {

  const { handleNextPage, handleSearch, handleModal} = props

  const animation = new Animated.Value(1)
  const mode = new Animated.Value(0)

  const toggleMenu = () => {

    Animated.sequence([
      Animated.timing(animation,{
        toValue:0.95,//Com o timing o toValue é a profundidade após o click no botão
        duration:10,
        useNativeDriver: false,
      }),
      Animated.timing(animation,{
        toValue:1,
        useNativeDriver: false,
      }),
      Animated.timing(mode,{
        toValue:mode._value === 0 ? 1 : 0,
        useNativeDriver: false,
      })
    ]).start();

  }

  const sizeStyle = {
    transform:[{scale:animation}]
  };

  const rotation = mode.interpolate({
    inputRange:[0,1],
    outputRange:["0deg","45deg"]
  });

  const plusX = mode.interpolate({
    inputRange:[0,1],
    outputRange:[-24, -100]
  })

  const plusY = mode.interpolate({
    inputRange:[0,1],
    outputRange:[-50, -100]
  })

  const localX = mode.interpolate({
    inputRange:[0,1],
    outputRange:[-24, -24]
  })

  const localY = mode.interpolate({
    inputRange:[0,1],
    outputRange:[-50, -150]
  })

  const modalX = mode.interpolate({
    inputRange:[0,1],
    outputRange:[-24, 50]
  })

  const modalY = mode.interpolate({
    inputRange:[0,1],
    outputRange:[-50, -100]
  })

  return (
    <View style={[styles.bodyOptions, props.style]}>


      <Animated.View style={{ left:plusX, top:plusY}}>
        <TouchableWithoutFeedback onPress={handleNextPage}>
          <View style={styles.buttonSecondary}>
            <Icon name="plus" size={25} color="#f82a4b"/>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
      

      <Animated.View style={{left:localX, top:localY}}>
        <TouchableWithoutFeedback onPress={handleSearch}>
          <View style={styles.buttonSecondary}>
            <Icon name="map-marker-alt" size={25} color="#f82a4b"/>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>


      <Animated.View style={{ left:modalX, top:modalY}}>
        <TouchableWithoutFeedback onPress={handleModal}>
          <Animated.View style={styles.buttonSecondary}>
            <Icon name="info-circle" size={25} color="#f82a4b"/>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>


      <Animated.View style={[styles.buttonOptions, sizeStyle]}>
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <Animated.View style={{transform:[{rotate:rotation}]}}>
            <Icon name="cog" size={28} color="#fff"/>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
      

    </View>
  );
}

const styles = StyleSheet.create({
  bodyOptions:{
    position:'absolute',
    padding:10,
    right:0,left:0,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonOptions:{
    position:'absolute',
    width:50,
    height:50,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    elevation:20,
    backgroundColor:'#f82a4b'
  },
  buttonSecondary:{
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    width:45,
    height:45,
    borderRadius:50,
    backgroundColor:'#ffffff',
    elevation:20,
    top:25
  },
})

export default Options;