import { View, Text, Alert, Image, TouchableOpacity } from "react-native";
// import { Avatar } from "react-native-paper";
import React, { useEffect } from "react";
import axios from "axios";
import { GETCARTUSER, POSTCARTUSER } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Foundation";
const MyProductItem = (props) => {
  const item = props.item;
  const navigation = useNavigation();
  useEffect(() => {});
  const info = useSelector((state) => state.Reducers.arrUser);
  showImage = (image) => {
    if (image) {
      let list = JSON.parse(image);
      let url = "";
      for (let i = 0; i < list.length; i++) {
        if (list[0]) {
          url = list[0];
        }
      }
      return url;
    }
  };
  const price = (price) => {
    let x = price;
    x = x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
    return x;
  };
  onAddToCart = async (item) => {
    let id = info.id;
    // console.log("Ok")
    if (id && item.id) {
      if (item.soLuong > 0) {
        let data = {
          idUser: id,
          idSP: item.id,
          size: "32gb",
          soLuong: 1,
        };
        await axios.post(POSTCARTUSER, data).then((res) => {
          if (res.data.errCode === 0) {
            Alert.alert("Thông báo", "Đơn hàng đã được thêm vào giỏ hàng", [
              {
                text: "OK",
                onPress: () => {
                  props.addCart();
                },
              },
            ]);
            // props.addCart();
          }
        });
      } else {
        Alert.alert(
          "Thông báo",
          "Xin lỗi quý khách vì sản phẩm đã không còn hàng, chúng tôi sẽ cố gắng nhập hàng sớm nhất có thể",
          [{ text: "OK", onPress: () => {} }]
        );
      }
    }
  };
  handleDetailProduct = (id) => {
    navigation.navigate(
      "Chi tiết sản phẩm",
      { id: id },
      { handleDetailProduct: { handleDetailProduct } }
    );
  };
  return (
    <TouchableOpacity
      onPress={() => {
        handleDetailProduct(item.id);
      }}
      style={{
        width: 200,
        height: "auto",
        borderRadius: 10,
        elevation: 5,
        backgroundColor: "#fff",
        marginLeft: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: showImage(item.image) }}
          style={{
            width: 180,
            height: 180,
            resizeMode: "contain",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 3,
          }}
        />
      </View>

      <Text
        style={{
          marginLeft: 0,
          marginTop: 8,
          fontSize: 15,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        {item.tenSp}
      </Text>
      <View
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          marginTop: 5,
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        {item.sale <= 0 ? (
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              color: "red",
              textAlign: "center",
            }}
          >
            {price(item.giaSanPham)}
          </Text>
        ) : (
          <View
            style={{
              flexDirection: "",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "red",
                textAlign: "center",
              }}
            >
              {price(item.giaSanPham - item.giaSanPham * (item.sale / 100))}
            </Text>
            {/* <Text
              style={{
                fontSize: 10,
                marginLeft: 2,
                marginRight: 2,
                textAlign: "center",
              }}
            >
              -
            </Text> */}
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: "#696969",
                textDecorationLine: "line-through",
                textAlign: "center",
              }}
            >
              {price(item.giaSanPham)}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 10,
            paddingBottom: 10,
            paddingTop: 7,
          }}
          onPress={() => {
            onAddToCart(item);
          }}
        >
          <Text style={{ textAlign: "center" }}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      {item.sale > 0 && (
        <View
          style={{
            borderRadius: 20,
            position: "absolute",
            top: -5,
            right: 25,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              position: "relative",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="burst" title="sadd" size={55} color={"#DD0000"} />
            <Text
              style={{
                color: "#fff",
                position: "absolute",
                top: "50%",
                transform: [{ translateY: -11 }],
                marginLeft: 5,
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              -{item.sale}%
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MyProductItem;
