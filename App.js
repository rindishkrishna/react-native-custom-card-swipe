
import React, { useState,useRef, useCallback, useEffect } from 'react'
import { PanResponder, StyleSheet, Text, View } from 'react-native'
import { Animated } from 'react-native'
import Card from './Src/Components/Card'
import Footer from './Src/Components/Footer'
import { pets as petsArray } from './Src/Data/data'
const { Dimensions } = require('react-native');

const { width, height } = Dimensions.get('screen');


const App = () => {
  const [pets, setPets] = useState(petsArray)
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  useEffect(()=>{
    if(!pets.length){
      setPets(petsArray)
    }
  },[pets.length])
  const panResponder= PanResponder.create({
    onMoveShouldSetPanResponder:()=> true,
    onPanResponderMove:(_,{dx, dy,y0}) =>{
      swipe.setValue({x:dx,y:dy});
    
      tiltSign.setValue(y0>height/2?1:-1)
    },
    onPanResponderRelease:(_, {dx,dy}) =>{
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100
      if(isActionActive){
        Animated.timing(swipe,{
          duration:200,
          toValue:{
            x:direction*500,
            y:dy
          },
          useNativeDriver:true
        }).start(removeTopCard);
      }else{
        Animated.spring(swipe,{
          toValue:{
            x:0,
            y:0,
          },
          useNativeDriver:true,
          friction:5,
        }).start();
      }

     
    }
  })
  const removeTopCard = useCallback(()=>{
    setPets((prevState) => prevState.slice(1))
    swipe.setValue({x:0,y:0})
  },[swipe])
  return (
    <View style={styles.main}>
      {pets
      .map(({name, source}, index) => {
        const isFirst = index === 0;
        const dragHandlers = isFirst? panResponder.panHandlers:{}
        return<Card 
        key={name} 
        name={name} 
        source={source} 
        isFirst={isFirst} 
        {...dragHandlers}
        swipe={swipe}
        tiltSign={tiltSign}
        />
      }
      
      ).reverse()}
      {/* <Footer /> */}
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  main:{
    flex:1,
    alignItems:"center"
  }
})
