import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, useIsFocused } from "@react-navigation/native";
// import ManChao from "../Screen/ManChao";
import Login from "../Screen/Login";
import SearchProducts from "../Screen/SearchProducts";
import { GET_ONE_MEMBER } from "../../api";
import NewAccount from "../Screen/NewAccount";
import Home from "../Screen/Home";
import EditProfile from "../edit/EditProfile";
import PriceProfile from "../edit/PriceProfile";
import LichSuNapTien from "../edit/LichSuNapTien";
import LichSuOrders from "../edit/LichSuOrders";
import OrderDetail from "../edit/OrderDetail";
import NewsDetail from "../edit/NewsDetail";
import Welcome from "../Screen/Welcome";
import DetailProduct from "../common/DetailProduct";
import DanhSachSanPham from "../common/DanhSachSanPham";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const isFocused = useIsFocused();
  const [infoUser, setInfoUser] = useState({});
  const info = useSelector((state) => state.Reducers.arrUser);
  const isloading = useSelector((state) => state.Reducers.isloading);
  const getMember = async () => {
    await axios
      .get(`${GET_ONE_MEMBER}?id=${info.id}`)
      .then((res) => {
        if (res.data.errCode === 0) {
          setInfoUser(res.data.member);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMember();
  }, [isFocused]);

  return (
    <>
      {infoUser.status !== 2 && (
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Welcome"
            component={Welcome}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="NewAccount"
            component={NewAccount}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: true }}
            name="EditProfile"
            component={EditProfile}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: true }}
            name="PriceProfile"
            component={PriceProfile}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: true }}
            name="LichSuNapTien"
            component={LichSuNapTien}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: true }}
            name="Lịch Sử Mua Hàng"
            component={LichSuOrders}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: true }}
            name="Chi tiết đơn hàng"
            component={OrderDetail}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: true }}
            name="Chi tiết sản phẩm"
            component={DetailProduct}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: true }}
            name="Danh Sách sản phẩm"
            component={DanhSachSanPham}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: true }}
            name="Chi tiết tin tức"
            component={NewsDetail}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: true }}
            name="Tìm kiếm"
            component={SearchProducts}
          ></Stack.Screen>
        </Stack.Navigator>
      )}
    </>
  );
};
export default AuthStack;
