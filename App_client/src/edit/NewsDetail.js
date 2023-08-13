import { Text, View ,ScrollView,Dimensions,FlatList,useWindowDimensions,Image} from "react-native";
import React, {useEffect,useState} from "react";
import Moment from 'moment';
import fr from "moment/locale/fr";
import RenderHtml from 'react-native-render-html';
const NewPaper = (props) => {
    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;
    const route = props.route;
    const { width } = useWindowDimensions();
    let item  = route.params.item
    const tomTatTinTuc = {
        html: `${item.moTa}`
      };
      const formatDate= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("DD/MM/YYYY ");
        return newFr
    }
    return (
        <ScrollView style={{margin:10}}>
            <Text style={{fontSize:17,fontWeight:"600"}}>
                {item.tieuDe}
            </Text>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <View></View>
                <Text style={{marginRight:10, marginTop:3}}>
                    {formatDate(item.createdAt)}
                </Text>
            </View>
            <Image
                    source={{uri: item.anhTinTuc}}
                    style={{ width: WIDTH,
                        height:300, marginTop:3, marginBottom:3, }}
                />
            <Text style={{fontSize:15, fontWeight:"600"}}>
            {item.tomTatTinTuc}
            </Text>
            
            <View>
            <RenderHtml
                contentWidth={width}
                source={tomTatTinTuc}
                
                />
            </View>
        </ScrollView>
    )
}
export default NewPaper;