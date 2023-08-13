import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Cart from "../bottom/Cart";
import Contact from "../bottom/Contact";
import Main from "../bottom/Main";
import NewPaper from "../bottom/NewPaper";
import Profile from "../bottom/Profile";
import CartItem from "../common/CartItem";
import { GETCARTUSER } from "../../api";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesStart } from "../redux/action/Actions";
import axios from "axios";
const Home = (props) => {
  const info = useSelector((state) => state.Reducers.arrUser);
  const isFocused = useIsFocused();
  const navigation = props.navigation;
  const [selectTab, setSelectetab] = useState(0);

  const data = useSelector((state) => state);
  const [lenght, setLenght] = useState(0);
  const dispatch = useDispatch();

  const arlenght = (item) => {};
  const listCart = async () => {
    let count = 0;
    if (info.id) {
      let idUser = info.id;
      await axios.get(`${GETCARTUSER}?id=${idUser}`).then((res) => {
        if (res.data.errCode == 0) {
          res.data.Carts.map((item) => {
            count = count + 1;
          });
        }
      });
    }
    setLenght(count);
  };
  const deleteCart = () => {
    listCart();
  };
  const addCart = () => {
    listCart();
  };
  useEffect(() => {
    listCart();
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      {selectTab == 0 ? (
        <Main addCart={addCart} />
      ) : selectTab == 1 ? (
        <NewPaper />
      ) : selectTab == 2 ? (
        <Cart deleteCart={deleteCart} />
      ) : selectTab == 3 ? (
        <Contact />
      ) : (
        <Profile />
      )}

      <View
        style={{
          width: "100%",
          height: 55,
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setSelectetab(0);
          }}
        >
          <Image
            source={require("../Screen/image/home.png")}
            style={{
              width: 24,
              height: 24,
              tintColor: selectTab == 0 ? "#000" : "#8e8e8e",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setSelectetab(1);
          }}
        >
          <Image
            source={require("../Screen/image/newspaper.png")}
            style={{
              width: 24,
              height: 24,
              tintColor: selectTab == 1 ? "#000" : "#8e8e8e",
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              backgroundColor: selectTab == 2 ? "#FF9900" : "#000",
              borderRadius: 22,
            }}
            onPress={() => {
              setSelectetab(2);
            }}
          >
            <Image
              source={require("../Screen/image/bag.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: selectTab == 2 ? "#000033" : "#fff",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 10,
              }}
            />
            {lenght > 0 && (
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "red",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {lenght}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setSelectetab(3);
          }}
        >
          <Image
            source={require("../Screen/image/contact.png")}
            style={{
              width: 24,
              height: 24,
              tintColor: selectTab == 3 ? "#000" : "#8e8e8e",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setSelectetab(4);
          }}
        >
          <Image
            source={require("../Screen/image/user-menu.png")}
            style={{
              width: 24,
              height: 24,
              tintColor: selectTab == 4 ? "#000" : "#8e8e8e",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;
