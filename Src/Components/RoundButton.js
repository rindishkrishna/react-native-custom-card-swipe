import React, { useCallback, useRef } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Animated } from 'react-native';
const RoundButton = ({name,size,color}) => {
    const scale= useRef(new Animated.Value(1)).current;
    const animateScale = useCallback((newValue) =>{
        Animated.spring(scale, {
            toValue:newValue,
            friction:4,
            useNativeDriver:true
        }).start()
    },[scale])
    return (
     <TouchableWithoutFeedback 
     onPressIn={()=> animateScale(0.8) }
      onPressOut={()=> animateScale(1)}
      delayPressIn={0}
      delayPressOut={110}
      >
         <Animated.View style={[styles.align,{transform:[{scale}]}]}>
             <FontAwesome5 name={name} size={size} color={color} style={styles.btn} />
         </Animated.View>
     </TouchableWithoutFeedback>
    )
}

export default RoundButton

const styles = StyleSheet.create({
   align:{
       width:70,
       height:70,
       backgroundColor:"#fff",
       elevation:5,
       borderRadius:40,
       justifyContent:"center",
       alignItems:"center"

   }
})
