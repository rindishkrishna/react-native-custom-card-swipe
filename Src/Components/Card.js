import React, { useCallback } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Choice from './Choice';
import { Animated } from 'react-native';


const { Dimensions } = require('react-native');

const { width, height } = Dimensions.get('screen');



const Card = ({name, source,isFirst,swipe,tiltSign,...rest}) => {
    // const CARD = {
    //     WIDTH: width * 0.9,
    //     HEIGHT: height * 0.78,
    //     BORDER_RADIUS: 20,
    //     OUT_OF_SCREEN: width + 0.5 * width,
    //   };
   
   
    const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
        inputRange:[-100,0,100],
        outputRange:['8deg','0deg','-8deg']
    })
    const likeOpacity= swipe.x.interpolate({
        inputRange:[25,100],
        outputRange:[0,1],
        
    })
    const nopeOpacity= swipe.x.interpolate({
        inputRange:[-100,-25],
        outputRange:[1,0],
        
    })

    const animatedCardStyle={
        transform:[...swipe.getTranslateTransform(),{rotate}]
    }

    const renderChoice = useCallback(()=>{
        
        return(
            <>
             <Animated.View style={[styles.container,styles.likeContainer,{opacity:likeOpacity}]}>
        <Choice type="Like"/>
        </Animated.View>
          <Animated.View style={[styles.container,styles.nopeContainer,{opacity:nopeOpacity}]}>
          <Choice type="Nope"/>
          </Animated.View>
          </>
         
        )
    },[likeOpacity,nopeOpacity])

    return (
        <Animated.View style={[styles.main,isFirst && animatedCardStyle]} {...rest}>
            <Image source={source} style={styles.img}/>
            <Text style={styles.txt}>{name}</Text>
            {
                isFirst && renderChoice()
            }
        </Animated.View>
    )
}

export default Card

const styles = StyleSheet.create({
    img:{
        width:width*0.9,
        height:height * 0.7,
        borderRadius:20
        
    },
    main:{
    position:"absolute",
    top:30
    },
    txt:{
        position:"absolute",
        left:22,
        bottom:22,
        fontSize:36,
        fontWeight:"bold",
        color:"#fff"
    },
    container:{
        position:"absolute",
        top:100
    },
    likeContainer:{
        left:45,
        transform:[{rotate:"-30deg"}],
        borderColor:"#00eda6"
    },
    nopeContainer:{
    right:45,
    transform:[{rotate:"30deg"}]
    }
})
