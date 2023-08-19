import {
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../common/Header";

import MyProductItem from "../common/MyProductItem";
import ItemLuotMua from "../common/ItemLuotMua";
import { useDispatch, useSelector } from "react-redux";
import Swiper from "react-native-swiper";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { GETCATEGORIES, GETALLPRODUCTS } from "../../api";
const Main = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [tshirtList, setTshirtList] = useState([]);
  const [luotMuaNhieu, setArrLuotMuaNhieu] = useState([]);
  const [hotSale, setHotSale] = useState([]);
  //const arrCategories = useSelector(state => state.Reducers.categoties);

  const loadAllProducts = async () => {
    await axios
      .get(GETALLPRODUCTS)
      .then((res) => {
        if (res && res.data.errCode === 0) {
          setTshirtList(res.data.totalProducts);
          ``;
          setArrLuotMuaNhieu(res.data.sanPhamMuaNhieu);
          setHotSale(res.data.sale);
          setRefreshing(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadCategories = async () => {
    await axios
      .get(GETCATEGORIES)
      .then((res) => {
        if (res && res.data.errCode === 0) {
          setCategoryList(res.data.data);

          setRefreshing(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadAllProducts();
    loadCategories();
  }, [isFocused]);

  onRefresh = () => {
    setRefreshing(true);
    loadCategories();
    loadAllProducts();
  };

  const addCart = () => {
    props.addCart();
  };

  listDanhSach = (id) => {
    return (
      <>
        <FlatList
          data={tshirtList.filter((p) => p.idDanhSach === id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          extraData={id}
          renderItem={({ item }) => {
            return <MyProductItem item={item} addCart={addCart} />;
          }}
        />
      </>
    );
  };
  danhSachSabPham = (id, name) => {
    navigation.navigate("Danh Sách sản phẩm", { id: id, name: name });
  };
  const litProducts = () => {
    return categoryList.map((item, i) => {
      return (
        <TouchableOpacity
          onPress={() => {
            danhSachSabPham(item.id, item.name);
          }}
          key={item.id}
          style={{
            padding: 5,
            borderWidth: 0.5,
            marginLeft: 9,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "#000" }}>{item.name}</Text>
        </TouchableOpacity>
      );
    });
  };
  return (
    <>
      <Header style={{}} title={"Home"} />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              onRefresh();
            }}
          />
        }
        nestedScrollEnabled={true}
        style={{ flex: 0, marginBottom: 10 }}
      >
        <View style={{ flex: 1, marginBottom: 0 }}>
          <Swiper style={styles.wrapper} autoplay={false}>
            <View style={styles.slide}>
              <Image
                source={require("../../image_shopmobie/banner/banner2.jpg")}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../../image_shopmobie/banner/banner1.jpg")}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../../image_shopmobie/banner/banner3.jpg")}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../../image_shopmobie/banner/banner4.jpg")}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </Swiper>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
          >
            {litProducts()}
          </ScrollView>
          <ScrollView></ScrollView>
          {hotSale && (
            <View style={{ marginTop: 6 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 1,
                  marginRight: 9,
                  paddingBottom: 5,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Hot Sale
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    danhSachSabPham("hotSale", "Hot Sale");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      textDecorationLine: "underline",
                      fontStyle: "italic",
                      color: "#3399FF",
                    }}
                  >
                    Xem tất cả
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 20, resizeMode: "contain" }}
              >
                {hotSale &&
                  hotSale.map((item) => {
                    return (
                      <ItemLuotMua
                        key={item.id}
                        item={item}
                        addCart={addCart}
                      />
                    );
                  })}
              </ScrollView>
            </View>
          )}
          {luotMuaNhieu && (
            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 1,
                  marginRight: 9,
                  paddingBottom: 5,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Lượt mua nhiều nhất
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    danhSachSabPham("luotMuaNhieu", "Lượt mua nhiều nhất");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      textDecorationLine: "underline",
                      fontStyle: "italic",
                      color: "#3399FF",
                    }}
                  >
                    Xem tất cả
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 20 }}
              >
                {luotMuaNhieu &&
                  luotMuaNhieu.map((item) => {
                    return (
                      <ItemLuotMua
                        key={item.id}
                        item={item}
                        addCart={addCart}
                      />
                    );
                  })}
              </ScrollView>
            </View>
          )}

          <ScrollView style={{ marginTop: 10 }}>
            {categoryList.map((item, index) => {
              return (
                <View key={index}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottomColor: "#ccc",
                      borderBottomWidth: 1,
                      marginRight: 9,
                      paddingBottom: 5,
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      {item.name}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        danhSachSabPham(item.id, item.name);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          textDecorationLine: "underline",
                          fontStyle: "italic",
                          color: "#3399FF",
                        }}
                      >
                        Xem tất cả
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginTop: 15 }}>{listDanhSach(item.id)}</View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    resizeMode: "contain",
    height: 200,
    marginTop: 5,
  },
  slide: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "94%",
    height: 200,
    borderRadius: 10,
  },
});
export default Main;
