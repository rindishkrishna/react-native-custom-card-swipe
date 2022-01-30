import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Choice = ({type}) => {
    return (
        <View style={[styles.container]}>
            <Text style={styles.text}>{type}</Text>
        </View>
    )
}

export default Choice

const styles = StyleSheet.create({
    container:{
        borderWidth:7,
        paddingHorizontal:15,
        borderRadius:15,
        backgroundColor:"rgba(0,0,0,0.2)"
    },
    text:{
        fontSize:48,
        fontWeight:"bold",
        textTransform:"uppercase",
        letterSpacing:4,
        color:"white"

    }
})
