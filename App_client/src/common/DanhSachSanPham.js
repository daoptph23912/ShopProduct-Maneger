import { Text, View,RefreshControl ,ScrollView} from "react-native";
import React, { useEffect,useState } from "react";
import { GETCATEGORIES, GET_DANH_SACH_SAN_PHAM_MEMBER } from "../../api"
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import ItemDanhSach from "../common/ItemDanhSach";

const DanhSachSanPham = (props) => {
    
    const isFocused = useIsFocused();
    const route = props.route;
    let id = route.params.id
    let name = route.params.name
    const [arrProducts, setArrProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    
        onRefresh = () => {
            setRefreshing(true)
            loadAllProducts
        }
    useEffect(()=>{
        loadAllProducts()
    },[isFocused])
    
    const loadAllProducts = async () => {
        console.log(id)
        if(id === "luotMuaNhieu"){
            await axios.get(`${GET_DANH_SACH_SAN_PHAM_MEMBER}?id=${id}`).then((res) => {

                if (res && res.data.errCode === 0) {
                    //console.log(res.data.products,"OK")
                    setArrProducts(res.data.getAllLuotMuaNhieu)
                    setRefreshing(false)
                }
            }).catch((error) => { console.log(error) });
        }else if(id === "hotSale"){
            await axios.get(`${GET_DANH_SACH_SAN_PHAM_MEMBER}?id=${id}`).then((res) => {
                if (res && res.data.errCode === 0) {
                    //console.log(res.data.products,"OK")
                    setArrProducts(res.data.getHotSaleAll)
                    setRefreshing(false)
                }
            }).catch((error) => { console.log(error) });
        }else{
            await axios.get(`${GET_DANH_SACH_SAN_PHAM_MEMBER}?id=${id}`).then((res) => {

                if (res && res.data.errCode === 0) {
                    setArrProducts(res.data.products)
                    setRefreshing(false)
                    
    
                }
            }).catch((error) => { console.log(error) });
        }
        
    }
  
    return (
        <View style={{backgroundColor:"#fff",height:"100%"}}>
            <View style={{backgroundColor:"gray",paddingTop:6,paddingBottom:6 }}>
                <Text style={{fontSize:20,color:"#fff",textAlign:"center"}}>{name}</Text>
            </View>
                 <ScrollView 
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={() => { onRefresh() }}
            />
        }
        >
            <View  style={{flexDirection:"row",flexWrap:"wrap",width:"100%"}}>
                
                {
                arrProducts.map((item)=>{
                    return(
                        <View key={item.id} style={{width:"50%"}}>{
                            <ItemDanhSach 
                            
                            item={item}
                               
                        // addCart = {addCart}
                        />
                            }</View>
                       
                    )
                })
            }
               
           
            </View>
            
        </ScrollView>
        </View>
       
    )
}
export default DanhSachSanPham;