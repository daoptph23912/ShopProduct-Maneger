import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import Button from "../components/Button";
import Checkbox from "expo-checkbox";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Text,
  View,
  ToastAndroid,
  Pressable,
  ImageBackground,
} from "react-native";
import CustomButton from "../common/CustomButton";
import CustomTextInput from "../common/CustomTextInput";
import { LOGIN } from "../../api";
import { updateEmail } from "../redux/action/Actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("Thanhdaodd@gmail.com");
  const [password, setPassWord] = useState("123456");
  const [err, setErr] = useState(false);
  const info = useSelector((state) => state.Reducers.arrUser);
  const [showPassWord1, setShowPass1] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setErr(false);
  }, []);
  const showPass1 = () => {
    setShowPass1(!showPassWord1);
  };
  const validate = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const data = {
      email: email,
      password: password,
    };

    if (email || password) {
      if (reg.test(email) === true) {
        axios
          .post(LOGIN, data)
          .then((res) => {
            if (res.data.errCode === 0) {
              if (res.data.user.status !== 2) {
                setErr(false);
                ToastAndroid.showWithGravity(
                  "Chào mừng: " + res.data.user.tenThanhVien,
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  10,
                  100
                );

                dispatch(updateEmail(res.data.user, true));
                navigation.navigate("Home");
              } else {
                alert("Tài khoản của bạn đã bị khóa");
                return;
              }
            } else {
              setErrMessage(res.data.message);

              setErr(true);
            }
          })
          .catch((err) => console.log(err));
      } else {
        setErrMessage("Email không đúng định dạng");
        setErr(true);
      }
    } else {
      setErrMessage("Email và password không được để trống");
      setErr(true);
    }
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.color5, COLORS.color4]}
    >
      <Image
        source={require("../Screen/image/mobile-shop.png")}
        style={{
          width: 130,
          height: 130,
          alignSelf: "center",
          marginTop: 50,
          borderRadius: 130,
          marginBottom: 20,
        }}
      ></Image>

      {/* <Text
        style={{
          marginTop: 50,
          alignSelf: "center",
          fontSize: 24,
          fontWeight: 600,
          color: COLORS.white,
        }}
      >
        Hi Welcome Back ! 👋 Login
      </Text> */}
      <CustomTextInput
        placeholder={"Xin Nhập Tài Email"}
        icon={require("../Screen/image/email.png")}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      ></CustomTextInput>

      <View style={{ position: "relative" }}>
        <CustomTextInput
          value={password}
          onChangeText={(text) => {
            setPassWord(text);
          }}
          type={showPassWord1 ? "password" : "texxt"}
          placeholder={"Xin Nhập Mật Khẩu"}
          icon={require("../Screen/image/pass.png")}
        ></CustomTextInput>

        <Pressable
          style={{ position: "absolute", right: 50, top: 31 }}
          onPress={() => showPass1()}
        >
          {showPassWord1 ? (
            <Image
              style={{ width: 20, height: 20, marginTop: 4 }}
              source={require("../Screen/image/eye.png")}
            />
          ) : (
            <Image
              style={{ width: 20, height: 20, marginTop: 4 }}
              source={require("../Screen/image/hidden.png")}
            />
          )}
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          marginStart: 250,
        }}
      >
        <Checkbox
          style={{ marginRight: 8 }}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? COLORS.black : undefined}
        />

        <Text>Remember Me</Text>
      </View>

      {err == true && (
        <Text style={{ marginTop: 10, marginLeft: 40, color: "red" }}>
          {errMessage}
        </Text>
      )}

      <CustomButton
        style={{}}
        title={"Login"}
        bgColor={"white"}
        textColor={"black"}
        onPress={() => {
          validate();
        }}
      ></CustomButton>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: COLORS.grey,
            marginHorizontal: 10,
          }}
        />
        <Text style={{ fontSize: 14 }}>Or Login with</Text>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: COLORS.grey,
            marginHorizontal: 10,
          }}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => console.log("Pressed")}
          style={{
            flex: 1,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            height: 52,
            borderWidth: 1,
            borderColor: COLORS.grey,
            marginRight: 4,
            borderRadius: 10,
            marginLeft: 30,
          }}
        >
          <Image
            source={require("./image/facebook1.png")}
            style={{
              height: 36,
              width: 36,
              marginRight: 8,
            }}
            resizeMode="contain"
          />

          <Text>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Pressed")}
          style={{
            flex: 1,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            height: 52,
            borderWidth: 1,
            borderColor: COLORS.grey,
            marginRight: 4,
            borderRadius: 10,
            marginRight: 30,
          }}
        >
          <Image
            source={require("./image/google.png")}
            style={{
              height: 36,
              width: 36,
              marginRight: 8,
            }}
            resizeMode="contain"
          />

          <Text>Google</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
export default Login;
