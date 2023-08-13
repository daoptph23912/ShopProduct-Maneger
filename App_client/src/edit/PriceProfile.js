import {  View,SafeAreaView,TextInput,ScrollView,Text,ImageBackground,StyleSheet,Button,Pressable,ImputText, Platform, Image } from "react-native";
import {React,useState,useEffect} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useDispatch, useSelector} from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation,useIsFocused } from "@react-navigation/native";
import axios from "axios";
import {PROFILEMEMBER,NAPTIENMEMBER} from "../../api";
import { el } from "date-fns/locale";
const PriceProfile = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [image, setImage] = useState('');
   
    const [price, setPrice] = useState(0);
    
    const info = useSelector((state)=> state.Reducers.arrUser)
   
    const [errImage, setErrImage] = useState(false);
    const [errPrice, setErrPrice] = useState(false);
   
    const [errMessage , setErrMessage] = useState('')
   
     useEffect(() => {
       
      }, []);
      useEffect(()=>{
        const data = {
            id: info.id,  
         }
       
   
    },[isFocused])
    
       handleImage =async ()=>{
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
           
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
                               
                            }else{
                               
                            }
                            setImage(res.data.secure_url)
                         
                        
                    }).catch((err) =>{console.log(err)});
                    
    
                }
        }
        
        
        
        }
  
  
      const  checkForCameraRollPermission=async()=>{
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert("Please grant camera roll permissions inside your system's settings");
        }else{
          console.log('Media Permissions are granted')
        }
  }
  
   const submit = async()=>{
        if(price <= 0){
            setErrPrice(true) 
            setErrMessage("Vui lòng nhập số tiền")
            return
        }else{
            setErrPrice(false)
        }
        if(image){
            setErrImage(false)
        }else{
            setErrImage(true);
            setErrMessage("Vui lòng chọn ảnh vừa giao dịch")
            return
        }
      
        data = {
            anhCK: image,
            idUser: info.id,
            tienNap: price,
            status: 0
            

        }
        await axios.post(NAPTIENMEMBER,data)
        .then((response)=>{
            if(response.data.errCode ===0){
                alert("Tiền của bạn đã đc nạp, bạn hãy chờ để admin xét duyệt")
                navigation.goBack()
            }
        
        })
        .catch((error)=>console.log(error))
           
       
        
        
   }
    const tien =(price)=>{
        if(price){
            let x = price;
            x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            return  x;

        }else{
            return  null;
        }
       
    }
    return (
        <ScrollView style={[styles.container,{flex:1}]} showsVerticalScrollIndicator={false}>
            <View style={{marginTop:40}}>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize: 17, fontWeight:'600'}}>
                        Bạn hãy chuyển khoản số tiền cần nạp vào tài khoản ngân hàng dưới đây

                    </Text>
                    <Text>
                        TPBANK: 
                    </Text>

                    <Image
                        source={require('../Screen/image/tpBank.png')}
                        style={{width:300, height:400}}>
                    </Image>
                </View>
                <View style={{marginLeft:10,marginTop:10}}>
                    <Text style={{fontSize:17, fontWeight:"600"}}>
                        Số tiền nạp: <Text style={{color:"red"}}>  {tien(parseInt(price))}</Text>
                    </Text>
                </View>
                <View style={[styles.action,{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding:10
                }]}>
                   
                    <FontAwesome 
                        name="dollar" size={21}  style={{
                            
                        }}
                    />
                        <TextInput
                        placeholder="Nhập số tiền vừa chuyển khoản"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        keyboardType='number-pad'
                        value={price.toString()}
                        onChangeText={(text)=>setPrice(text)}
                        style={styles.textInput}/>
                </View>
                {
                    errPrice==true && (<Text style={{marginTop:10,marginLeft:40,color:'red'}}>{errMessage}</Text>)
                }
                <View style={{padding: 10}}>
                    <Text style={{fontSize: 17, fontWeight:'600'}}>
                        Chọn ảnh xác minh giao dịch vừa chuyển khoản
                    </Text>
                </View>
                <Pressable onPress={()=>{handleImage()}} style={{width:"30%",flexDirection:'row', marginTop:15,marginLeft:10,
                       padding:10,borderColor:'#000',borderWidth:1,justifyContent:'center',alignItems:'center',borderRadius:5, backgroundColor:"#ccccccc"}}>
                    
                        <>
                            <Text style={{marginRight:5}}>Chọn ảnh</Text>
                        </>
                        <FontAwesome 
                        name="download" size={21}  style={{
                            
                        }}
                    />
                  
                </Pressable>
                {
                    errImage==true && (<Text style={{marginTop:10,marginLeft:40,color:'red'}}>{errMessage}</Text>)
                }
                {image ?
                    <View style={[styles.action,{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding:10
                    }]}>
                        <ImageBackground
                               source={{ uri: image }}
                                style={{
                                    width:400,height:400
                                    
                                }}
                                imageStyle={{borderRadius:15,backgroundColor:'#000',borderColor:'#000',borderWidth:.5,}}
                            />
                    </View>
                    :null
                }
                
                
                
                
                <Pressable style={styles.commandButton} onPress={()=>{submit()}}>
                        <Text style={styles.panelButtonTitle}>Submit</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}
export default PriceProfile;
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