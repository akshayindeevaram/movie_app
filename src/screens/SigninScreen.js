import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SigninScreen=()=>{
    return(
        <View style={styles.StyleSheet}>
            <Text>Login</Text>
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default SigninScreen