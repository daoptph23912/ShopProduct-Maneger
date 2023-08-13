import {  View,RefreshControl,FlatList,Text,StyleSheet,TouchableOpacity,Alert } from "react-native";
import {React,useState,useEffect} from "react";
import { ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {useDispatch, useSelector} from 'react-redux'
import { RadioButton } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { format } from 'date-fns'
import { useNavigation,useIsFocused } from "@react-navigation/native";
import axios from "axios";
import Moment from 'moment';
import vi from "moment/locale/vi";
import fr from "moment/locale/fr";
import {DELETE_TIEN_DA_NAP,LICHSUNAPTIENMEMBER} from "../../api";
import { onChange } from "react-native-reanimated";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
const LichSuNapTien = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [image, setImage] = useState('');
   
    const [arrprice, setArPrice] = useState([]);
    
    const info = useSelector((state)=> state.Reducers.arrUser)
    const [refreshing, setRefreshing] = useState(false);
        onRefresh = () => {
            getLichSuNapTien()
            setRefreshing(true)
            
        }
    const data = {
        id: info.id  
     }
    const getLichSuNapTien = ()=>{
        axios.get(`${LICHSUNAPTIENMEMBER}?id=${data.id}`).then((response)=>{
           
           if(response.data.errCode ===0){
                setArPrice(response.data.data.reverse())
                setRefreshing(false)
           }
       }).catch((error)=>{console.log(error)});
    }
     
      useEffect(()=>{
        getLichSuNapTien()
   
    },[isFocused])
    
     
  
const formatDate= (date)=>{
    const newFr = Moment(date).locale("vi", fr).format("DD/MM/YYYY");
    return newFr
}
const formatTime= (time)=>{
    const newFr = Moment(time).locale("vi", fr).format("HH:mm:ss");
    return newFr
} 
const price =(price)=>{
    let x = price;
    x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    return  x;
} 
DeleteNapTien = (id)=>{
    Alert.alert('Delete orders', 'Bạn có chắc muốn xóa hóa đơn này', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: async() => {
            await axios.delete(`${DELETE_TIEN_DA_NAP}?id=${id}`).then((res) => {
                if(res.data.errCode == 0){
                    Alert.alert('Thông báo', 'Đã xóa thành công', [
                        {text: 'OK', onPress: () => {
                            getLichSuNapTien()
                        }},
                      ]);
                }else{
                    alert("Hóa đơn không tồn tại")
                }

             }).catch((err) => {console.log(err)});
        }},
      ]);
}
  
    return (
        <View style={[styles.container,{flex:1, backgroundColor:'npm#FFFAF0'}]} showsVerticalScrollIndicator={false}>
            <View style={{flexDirection:'row', justifyContent:'space-between',padding:10, borderBottomColor:"#ccc",borderBottomWidth:1}}>
                <Text style={{fontSize:19,fontWeight:'bold' }}>Số tiền nạp</Text>
                <Text style={{fontSize:19,fontWeight:'bold' }}>Ngày Nạp</Text>
                <Text style={{fontSize:19,fontWeight:'bold' }}>Trạng thái</Text>
            </View>
                <FlatList
                     refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => { onRefresh() }}
                        />
                    }
                     data={arrprice} 
                     // item là giao diện trả về sau mỗi vòng lặp 
                     renderItem={({item})=>(
                         <TouchableOpacity onLongPress={()=>{item.status != 0&&DeleteNapTien(item.id)}} style={styles.listView}>
                             <View style={styles.listView_Text}>
                                {item.status === 1?
                                    <Text style={{width:'40%',color:'#228B22',fontSize:16,fontWeight:'600'}}> +{price(item.tienNap)}</Text>
                                    :
                                    <Text style={{width:'40%',color:'#B22222',fontSize:16,fontWeight:'600',textDecorationLine:item.status === 2?"line-through":"none"}}> {price(item.tienNap)}</Text>
                                }
                               
                               <View style={styles.dateTime}>
                               <Text style={{color:'#000',fontSize:16,fontWeight:'600'}}> {formatDate(item.createdAt)} </Text>
                               <Text style={{color:'#000',fontSize:16,fontWeight:'600'}}> {formatTime(item.createdAt)} </Text>
                               </View>
                               {item.status === 0&& 
                                     <Text style={{width:'33.3333%',textAlign:'right',color:'#FFA500',fontSize:16,fontWeight:'600'}}> Chờ xét duyệt </Text>
                               }
                                {item.status === 1&& 
                                     <Text style={{width:'33.3333%',textAlign:'right',color:'#008000',fontSize:16,fontWeight:'600'}}>Nạp tiền thành công </Text>
                               }
                               {item.status === 2&& 
                                     <Text style={{width:'33.3333%',textAlign:'right',color:'#8B0000',fontSize:16,fontWeight:'600'}}>Nạp tiền thất bại </Text>
                               }
                              
                             </View>
                            
                            
                             
                             
                         </TouchableOpacity>
                     )}
                     // key là giá trị duy nhất trả về sau mỗi vòng lặp
                     keyExtractor={(item) => item.id}
                 />
               

              
        </View>
    )
}
export default LichSuNapTien;
const styles = StyleSheet.create({
    listView:{
        padding:10
    },
    listView_Text:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:"space-between",
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        paddingBottom:10
    },
   
})