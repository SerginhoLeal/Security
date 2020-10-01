import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

const Options = (props) => {
  const animation = new Animated.Value(0)

  // const [open, setOpen] = useState(animation)
  // console.log(open)

  const toggleMenu = () => {

    const toValue = open === 0 ? 0 : 1
    // console.log(toValue)

    Animated.spring(animation, {
      toValue,
      friction:5
    }).start();

    const open = !open;
    // setOpen(open === 0 ? 1 : 0)
  }

  const toggleMenuClose = () => {
    // const toValue = open ? 1 : 0

    // Animated.spring(animation, {
    //   toValue,
    //   friction:5
    // }).start();

    // const open = !open;
  }

  const pinLocation = {
    transform:[
      {scale:animation},
      {
        translateY: animation.interpolate({
          inputRange:[0,1],
          outputRange:[0,-80]
        })
      }
    ]
  }

  const pinAdd = {
    transform:[
      {scale:animation},
      {
        translateY: animation.interpolate({
          inputRange:[0,1],
          outputRange:[0,-150]
        })
      }
    ]
  }

  const opacity = animation.interpolate({
    inputRange:[0,1],
    outputRange:[0,1]
  })

  return (
    <View style={[styles.bodyOptions, props.style]}>

      <TouchableWithoutFeedback onPress={props.HandleSearch}>
        <Animated.View style={[styles.buttonOptions, styles.buttonSecondary, pinLocation, opacity]}>
          <Icon name="map-marker-alt" size={25} color="#f82a4b"/>
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={props.handleNextPage}>
        <Animated.View style={[styles.buttonOptions, styles.buttonSecondary, pinAdd, opacity]}>
          <Icon name="plus" size={25} color="#f82a4b"/>
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.buttonOptions, {backgroundColor:'#f82a4b'}]}>
          <Icon name="cog" size={28} color="#fff"/>
        </Animated.View>
      </TouchableWithoutFeedback>

    </View>
  );
}

const styles = StyleSheet.create({
  bodyOptions:{
    position:'absolute',
    right:5,
    left:5,
    alignItems:'center',
  },
  buttonOptions:{
    position:'absolute',
    width:50,
    height:50,
    borderRadius:50 / 2,
    justifyContent:'center',
    alignItems:'center',
    elevation:20,
  },
  buttonSecondary:{
    width:45,
    height:45,
    borderRadius:50,
    backgroundColor:'#ffffffaa'
  },
})

export default Options;