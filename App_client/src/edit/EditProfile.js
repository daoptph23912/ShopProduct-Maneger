import {  View,SafeAreaView,TextInput,ScrollView,Text,ImageBackground,StyleSheet,Button,Pressable,ImputText, Platform, Image } from "react-native";
import {React,useState,useEffect} from "react";
import { ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {useDispatch, useSelector} from 'react-redux'
import { RadioButton } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation,useIsFocused } from "@react-navigation/native";
import axios from "axios";
import {PROFILEMEMBER,EDITPROFILEMEMBER} from "../../api";
import { onChange } from "react-native-reanimated";
const EditProfile = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [image, setImage] = useState(null);
    const [checked, setChecked] = useState(null);
    const [name, setName] = useState('');
    const [file, setFile] = useState({});
    const [phone, setPhone] = useState('');
    const [addres, setAddres] = useState('');
    const info = useSelector((state)=> state.Reducers.arrUser)
    const [BadPhone, setBadPhone] = useState(false);
    const [BadName, setBadName] = useState(false);
    const [BadAddress,setBadAddress] = useState(false);
    const [BadRechecked, setBadReCechked] = useState(false);
    const [errMessage , setErrMessage] = useState('')
    const [loadding,setIsLoadding] = useState(false);
     useEffect(() => {
        checkForCameraRollPermission()
      }, []);
      useEffect(()=>{
        const data = {
            id: info.id,  
         }
        
        axios.post(PROFILEMEMBER,data).then((response)=>{
            
            if(response.data.errCode ===0){
                setImage(response.data.userMember.anhDaiDien)
                setChecked(response.data.userMember.gioiTinh.toString())
                setPhone(response.data.userMember.soDienThoai)
                setName(response.data.userMember.tenThanhVien)
                setAddres(response.data.userMember.diaChi)
    
            }
        })
         
        
    },[isFocused])
    
       handleImage =async ()=>{
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
          },{
            "cancelled":false,
            "width":1080,
            "type":"image",
            "uri":"file:///data/user/0/host.exp.exponent/cache/ExperienceData/UNVERIFIED-192.168.1.5-react-expo-image-picker-guide/ImagePicker/a590d059-f144-45fe-ba8e-fc26b3c40aee.jpg",
            "height":810
         });
         
        if (!_image.cancelled) {
            let newFile={
                uri: _image.uri,
                type: `test/${_image.uri.split('.')[1]}`,
                name: `test.${_image.uri.split('.')[1]}`,
            }
            
           
            if(newFile){
                const COUND_NAME = 'djh5ubzth'
                const PRESET_NAME = 'b6oxas4h'
                const url = ''
                const FOLDER_NAME = 'UploadFileMember'
                const api = `https://api.cloudinary.com/v1_1/${COUND_NAME}/image/upload`
                const fromData = new FormData();
                        fromData.append('upload_preset',PRESET_NAME)
                        fromData.append("folder",FOLDER_NAME)
                        fromData.append('file',newFile)
                    
                        await axios.post(api,fromData,{
                            headers:{
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then((res) =>{
                            if(res.data.secure_url){
                                setIsLoadding(false)
                            }else{
                                setIsLoadding(true)
                            }
                            setImage(res.data.secure_url)
                            
                        
                    }).catch((err) =>{console.log(err)});
                    
    
                }
        }
        
        
        
        }
  
  
      const  checkForCameraRollPermission=async()=>{
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
        //   alert("Please grant camera roll permissions inside your system's settings");
        }else{
          console.log('Media Permissions are granted')
        }
  }
  
   const submit = async()=>{
    const phoneNumber = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if(phone){
       
        if(phoneNumber.test(phone)=== true){
            setBadPhone(false)
            
        }else{
            setBadPhone(true)
            setErrMessage("Số điện thoại không đúng định dạng")
            return
        }
    }else{
        setBadPhone(true)
        setErrMessage("Vui lòng nhập số điện thoại")
        return
    }
    if(name){
        setBadName(false)
    }else{
        setBadName(true)
        setErrMessage("Vui lòng nhập họ và tên")
        return
    }
    if(checked){
        setBadReCechked(false)
    }else{
        setBadReCechked(true)
        setErrMessage("Vui lòng chọn Giới tính")
        return
    }
    if(addres){
        setBadAddress(false)
    }else{
        setBadAddress(true)
        setErrMessage("Vui lòng nhập địa chỉ của bạn")
        return
    }
        
        
        data = {
            id: info.id,
            tenThanhVien: name,
            anhDaiDien: image,
            soDienThoai: phone,
            diaChi: addres,
            gioiTinh: checked,

        }
        await axios.put(EDITPROFILEMEMBER,data)
        .then((response)=>{
            if(response.data.errCode ===0){
                navigation.goBack()
            }
        
        })
        .catch((error)=>console.log(error))
           
       
        
        
   }
    return (
        <ScrollView style={[styles.container,{flex:1}]} showsVerticalScrollIndicator={false}>
            <View style={{marginTop:40}}>
                <View style={{alignItems:"center"}}>
                    <Pressable onPress={()=>{handleImage()}} >
                        <View style={{
                            height: 100,
                            width:100,
                            borderRadius:15,
                            justifyContent:'center',
                            alignContent:'center'
                        }}>
                            {loadding? 
                                <ActivityIndicator animating = {animating} color = '#bc2b78' size = "large"
                                style = {yourstyle}/>
                                :null
                        }
                            <ImageBackground
                               source={{ uri: image?image:"https://tse4.mm.bing.net/th?id=OIP.eImXLrEHmxuAIYAz3_VKhAHaHt&pid=Api&P=0" }}
                                style={{
                                    height:90,
                                    width:90,
                                    
                                }}
                                imageStyle={{borderRadius:15,backgroundColor:'#000',borderColor:'#000',borderWidth:.5,}}
                            >
                               <View style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center'
                               }}>
                                <Icon
                                    name="camera"
                                    size={35}
                                    color='#fff'
                                    style={{
                                        opacity:.7,
                                        justifyContent:'center',
                                        alignItems:'center'   ,
                                        borderColor:'#fff',
                                        borderRadius:10

                                    }}
                                />

                               </View>
                            </ImageBackground>
                           
                        </View>
                    </Pressable>
                    <Text style={{marginTop:10,fontSize:18,fontWeight:'bold'}}>
                                    {name}
                           </Text>
                </View>
                <View style={[styles.action,{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding:10
                }]}>
                    <FontAwesome 
                        name="user" size={21}  style={{
                            
                        }}
                    />
                        <TextInput
                        placeholder="Ho va ten"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={name}
                        onChangeText={(text)=>setName(text)}
                        style={styles.textInput}/>
                </View>
                {
                    BadName==true && (<Text style={{marginTop:10,marginLeft:40,color:'red'}}>{errMessage}</Text>)
                }
                <View style={[styles.action,{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding:10
                }]}>
                    <FontAwesome 
                        name="phone" size={21}  style={{
                            
                        }}
                    />
                        <TextInput
                        placeholder="So dien thoai"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={phone}
                        onChangeText={(text)=>setPhone(text)}
                        keyboardType='number-pad'
                        style={styles.textInput}/>
                </View>
                {
                    BadPhone==true && (<Text style={{marginTop:10,marginLeft:40,color:'red'}}>{errMessage}</Text>)
                }
                <View style={[styles.action,{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding:10
                }]}>
                    <FontAwesome 
                        name="map-marker" size={21}  style={{
                            
                        }}
                    />
                        <TextInput
                        placeholder="Dia chi"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={addres}
                        onChangeText={(text)=>setAddres(text)}
                        style={styles.textInput}/>
                </View>
                {
                    BadAddress==true && (<Text style={{marginTop:10,marginLeft:40,color:'red'}}>{errMessage}</Text>)
                }
                <View style={[styles.action,{
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }]}>
                    <FontAwesome 
                        name="user-o" size={21}  style={{
                            
                        }}
                    />
                       <View style={styles.gioiTinh}>
                    <Text style={styles.text_GioiTinh}>Giới tính: </Text>
                    <RadioButton  
                        value="1" 
                        status={ checked === '1' ? 'checked' : 'unchecked' } //if the value of checked is Apple, then select this button
                        onPress={() => setChecked('1')} //when pressed, set the value of the checked Hook to 'Apple'
                    />
                    <Text>Nam</Text>
                    <RadioButton
                        value="2"
                        status={ checked === '2' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('2')}
                    />
                    <Text>Nữ</Text>
                    <RadioButton
                        value="3"
                        status={ checked === '3' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('3')}
                    />
                    <Text>Khác</Text>
                    
                </View>
                </View>
                {
                    BadAddress==true && (<Text style={{marginTop:10,marginLeft:40,color:'red'}}>{errMessage}</Text>)
                }
                <Pressable style={styles.commandButton} onPress={()=>{submit()}}>
                        <Text style={styles.panelButtonTitle}>Submit</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}
export default EditProfile;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#FFF',
    },
    commandButton:{
        margin:15,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItem: 10
    },
    panel:{
        padding:20,
        backgroundColor: '#FFFFFF',
        padingTop:20
    },
    header:{
        backgroundColor:'#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width:-1,height:-1},
        shadowRadius:2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    panelHeader:{
        alignItems: 'center',

    },
    panelHandle:{
        width:40,
        heightl: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle:{
        fontSize:27,
        height:35,
    },
    panelSubtitle:{
        fontSize:14,
        corlor: 'gray',
        height: 30,
        marginBottom:10
    },
    panelButtom:{

        padding:15,
        borderRadius:10,
        backgroundColor: '#FF6347',
        alignItems:'center',
        marrginVertical:7
    },
    panelButtonTitle:{
        fontSize: 17,
        fontWeight:'bold',
        color:'#fff',
        textAlign: 'center',
    },
    action:{
        
        flexDirection: 'row',
        marginTop:15,
        marginBottom:10,
        borderBottomWidth: 1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5
    },
    actionError:{
        flexDirection:'row',
        marginTop:10,
        borderBottomColor:'#FF0000',
        paddingBottom:5
    },
    textInput:{
        flex:1,
        marginTop: Platform.OS === 'android' ? 0 : -12,
        paddingLeft:15,
        color: '#05375a',
        backgroundColor:'#FFFFFF'
    },
    gioiTinh:{
        flexDirection: 'row',
       
        paddingRight:20,
      
        marginLeft:20,
        width: '80%',
        justifyContentc: 'center',
        alignItems: 'center'
    },
    text_GioiTinh:{
        fontSize:16,
        marginRight: 15,
        fontWeight: 'bold'
    }
})