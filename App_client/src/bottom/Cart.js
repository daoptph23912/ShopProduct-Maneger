import {
  FlatList,
  Text,
  Alert,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import CartItem from "../common/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { removeFormCart } from "../redux/action/Actions";
import Header from "../common/Header";
import {
  GETCARTUSER,
  POSTCARTUSER,
  GETALLPRODUCTS,
  DELETECARTUSER,
  UPDATECARTUSER,
  ORDERCARTUSER,
  PROFILEMEMBER,
} from "../../api";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";

const Cart = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [cartList, setCartList] = useState([]);
  const cartData = useSelector((state) => state.Reducers.arrCart);
  const info = useSelector((state) => state.Reducers.arrUser);
  const dispacth = useDispatch();
  const [checkOrder, setCheckedOrder] = useState(false);
  const [load, setIsLoadding] = useState(false);
  const [arrProducts, setArrProducts] = useState();
  const [tongTiens, setTongTien] = useState(0);
  const [profile, setProfile] = useState({});
  const [idCart, setIdCart] = useState([]);
  const getUser = () => {
    let data = {
      id: info.id,
    };
    axios.post(PROFILEMEMBER, data).then((response) => {
      if (response.data.errCode === 0) {
        setProfile({ ...response.data.userMember });
      }
    });
  };
  const loadAllProducts = async (id) => {
    await axios
      .get(GETALLPRODUCTS)
      .then((res) => {
        if (res && res.data.errCode === 0) {
          setArrProducts(res.data.totalProducts);

          setRefreshing(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const price = (price) => {
    let x = price;
    x = x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
    return x;
  };
  const listCart = async () => {
    if (info.id) {
      let idUser = info.id;
      await axios.get(`${GETCARTUSER}?id=${idUser}`).then((res) => {
        if (res.data.errCode == 0) {
          setCartList(res.data.Carts);
          tongTien(res.data.Carts);
          setRefreshing(false);
        }
      });
    }
  };
  useEffect(() => {
    getUser();
    listCart();
    loadAllProducts();
  }, [isFocused]);
  onRefresh = () => {
    setRefreshing(true);
    listCart();
    loadAllProducts();
  };
  // setCartList(cartData);
  const DeleteItemCart = async (id) => {
    await axios
      .delete(`${DELETECARTUSER}?id=${id}`)
      .then((res) => {
        if (res.data.errCode === 0) {
          listCart();
          props.deleteCart();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkId = (id) => {};
  const tongTien = (arr) => {
    let tien = 0;
    arr.map((item) => {
      tien = tien + item.thanhTien;
    });

    setTongTien(tien);
  };
  const updateCart = async (id, sl, size) => {
    let data = {
      id: id,
      soLuong: sl,
      size: size,
    };

    await axios
      .put(UPDATECARTUSER, data)
      .then((res) => {
        if (res.data.errCode === 0) {
          listCart();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const orderProducts = async () => {
    let ids = [];
    cartList.map((item) => {
      ids.push(item.id);
    });

    let ib = JSON.stringify(ids);

    // for(let i=0; i<cartList.length; i){
    //     id.push(cartList[i].id)
    // }

    // console.log(JSON.stringify(id))
    let tienUser = info.tienTk;
    setCheckedOrder(true);
    if (cartList) {
      if (tongTiens < profile.tienTk) {
        data = {
          idCart: ib,
          idUser: info.id,
          tongTien: tongTiens,
        };
        await axios
          .post(ORDERCARTUSER, data)
          .then((res) => {
            if (res.data.errCode === 0) {
              Alert.alert(
                "Đặt Đơn thành công",
                "Đơn hàng của bạn đã được đặt, hãy chờ bên shop xét duyệt",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      setCartList([]);
                      setCheckedOrder(false);
                      listCart();
                      getUser();
                      props.deleteCart();
                    },
                  },
                ]
              );
            } else {
              alert(res.data.errMessage);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return alert("Số dư của bạn không đủ, hãy nạp thêm tiền");
      }
    } else {
      return alert("Không có sản phẩm nào trong giỏ hàng");
    }
  };
  const deleteCart = () => {};
  return (
    <View style={{ flex: 1 }}>
      <Header title={"Cart"} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              onRefresh();
            }}
          />
        }
      >
        {cartList.map((item, index) => {
          return (
            <CartItem
              key={item.id}
              item1={item}
              deteleItem={DeleteItemCart}
              checkid={checkId}
              tongTien={tongTiens}
              updateCart={updateCart}
            />
          );
        })}
      </ScrollView>

      <View
        style={{
          height: 50,

          alignItems: "center",
          flexDirection: "row",
          marginLeft: 10,
          marginRight: 10,
          marginTop: 20,
          borderRadius: 5,
          padding: 10,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Tổng:{" "}
          </Text>
          <Text
            style={{
              color: "red",
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            {price(tongTiens)}
          </Text>
        </View>
        <View>
          <Pressable
            onPress={() => {
              orderProducts();
            }}
            style={{
              borderColor: "#000",
              borderWidth: 1,
              height: 50,
              width: 130,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: "#000",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              {" "}
              Đặt Hàng
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={{ height: 80 }}></View>
    </View>
  );
};
export default Cart;
