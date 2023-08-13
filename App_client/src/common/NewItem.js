import { Text, View ,ScrollView,TouchableOpacity,useWindowDimensions,Image} from "react-native";
import React from "react";
import RenderHtml from 'react-native-render-html';
import Moment from 'moment';
import vi from "moment/locale/vi";
import fr from "moment/locale/fr";
import { useNavigation,useIsFocused } from "@react-navigation/native";
const NewItem = (props) => {
    const id = props.id;
    const item = props.arrNews;
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const tomTatTinTuc = {
        html: `${item.tomTatTinTuc}`
      };
      const formatDate= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("DD/MM/YYYY ");
        return newFr
    }
    newsDetail = (item)=>{
        if(item){
            navigation.navigate('Chi tiết tin tức',{item: item});
        }

    }
    return (
        <TouchableOpacity key={id} onPress={()=>{newsDetail(item)}} style={{flexDirection:'row',width:"100%", padding:5, marginTop:0,borderBottomColor:"#ccc",borderBottomWidth:1}}>
            <View style={{}}>
                <Image
                    source={{uri: item.anhTinTuc}}
                    style={{width:120,height:120}}
                />
            </View>
            <View style={{width:290,paddingLeft:5,paddingRight:5}}>
                <Text style={{fontSize:16,fontWeight:700}}>{item.tieuDe}</Text>
                <Text style={{maxHeight:75,fontSize:12, marginTop:5, color:"grey"}}>{item.tomTatTinTuc}</Text> 
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <View>
                    
                </View>
                <Text style={{marginRight:10, marginTop:3}}>
                    {formatDate(item.createdAt)}
                </Text>
            </View>
               
            </View>
            
        </TouchableOpacity>
    )
}
export default NewItem;