import { Image, Text, TouchableOpacity, Pressable,View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import IconSearch from "react-native-vector-icons/FontAwesome"
import React, { useState ,useEffect} from "react";
import { useNavigation,useIsFocused } from "@react-navigation/native";
 import { createDrawerNavigator } from "@react-navigation/drawer";
 
const Header = ({title,show}) => {
    const navigation = useNavigation()
    const editProfile = ()=>{
        navigation.navigate('EditProfile')
        
     }
    const searchProducts = ()=>{
        navigation.navigate('Tìm kiếm')
        
     }
     useEffect(()=>{
        setShowEditProfile(show)
     },[show])
    const [showEditProfile, setShowEditProfile] = useState(false)
    return(
        <View style={{
            
            height: 70,
            justifyContent: "space-between",
            alignItems:"center",
            flexDirection:"row",
            borderBottomWidth:0.2,
            borderBottomColor:'#8e8e8e',
            backgroundColor:'#fff',
            paddingTop:10

        }}>
          
            <Text style={{
                fontWeight:'600',
                fontSize:20,
                color:'#000',
                marginLeft:15,
                marginTop:15,
                textAlign:'center',
                }}>{title} </Text>
        
            <View style={{flexDirection:"row",marginTop:10,}}>
                <Pressable onPress={()=>{searchProducts()}}>
                        <View style={{ marginTop:5, marginRight:5}}>
                            <IconSearch name="search" size={25} color="#000" />
                        </View> 
                    </Pressable> 
                {showEditProfile?
                    <Pressable onPress={()=>{editProfile()}}>
                        <View style={{paddingHorizontal:10}}>
                            <Icon name="account-edit" size={31} color="#000" />
                        </View> 
                    </Pressable> 
                :
                null
                }

            </View>
        </View>
    )
}
export default Header