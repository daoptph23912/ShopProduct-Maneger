import { Image, TextInput, View, } from "react-native";
import React, { useState } from "react";
const CustomTextInput = ({value, onChangeText, placeholder, icon, type}) => {
    const [text, setText] = useState(value);
    return (
        <View style={{ width: '80%', height: 50, borderWidth: 0.5, 
        borderRadius: 10, alignSelf: "center", marginTop: 20,
         flexDirection: "row", alignItems: "center",paddingLeft:20,paddingRight:20}}>
            <Image source={icon} style={{ width: 24, height: 24 }}></Image>
        <TextInput 
        value={value}
        onChangeText={text => {
            onChangeText(text);
        }}
        placeholder={placeholder}
        secureTextEntry={type == 'password' ? true : false}
        style={{marginLeft:10}}></TextInput>
        
        </View>
    )
}
export default CustomTextInput;