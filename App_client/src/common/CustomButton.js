import { Text, TouchableOpacity } from "react-native";

const CustomButton = ({onPress, title, bgColor, textColor}) => {
    return (
        <TouchableOpacity
        style={{
            backgroundColor: bgColor,
            justifyContent: "center",
            alignItems: "center",
            width:'85%',
            height:50,
            borderRadius:10,
            alignSelf:'center',
            marginTop:50,
        }} onPress= {() => {
            onPress();
        }}>
            <Text style={{color:textColor}}>{title}</Text>
        </TouchableOpacity>
    );
};
export default CustomButton;