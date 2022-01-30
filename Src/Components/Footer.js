import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RoundButton from './RoundButton'

const Footer = () => {
    return (
        <View style={styles.container}>
            <RoundButton name="times" size={40} color={"#00eda6"}/>
            <RoundButton name="heart" size={34} color={"#ff006f"}/>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        position:'absolute',
        bottom:15,
        // backgroundColor:"blue",
        width:170,
        alignItems:"center",
        justifyContent:"space-between",
        zIndex:-1,

    }
})
