import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React from "react";
import Header from "../common/Header";
const Contact = () => {
  return (
    <ScrollView>
      <Header title={"Contact"} />
      <View>
        <Image
          source={require("../Screen/image/shop.jpg")}
          style={{
            width: "94%",
            height: 200,
            borderRadius: 10,
            alignSelf: "center",
            marginTop: 1,
          }}
        />

        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* <Image source={require('../Screen/image/shopping.png')} style={{ width: 24, height: 24 }}></Image>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            marginLeft: 20
                        }}>Shopping Fashion Men</Text> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 4,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 15,
                fontWeight: "600",
                letterSpacing: 0.5,
                marginVertical: 4,
                maxWidth: "84%",
              }}
            >
              Liên Hệ Với Chúng Tôi
            </Text>
            <Image
              source={require("../Screen/image/link.png")}
              style={{
                width: 30,
                height: 30,
                marginLeft: 50,
                borderRadius: 100,
                backgroundColor: "#4da6ff",
              }}
            ></Image>
          </View>

          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              letterSpacing: 1,
              opacity: 0.5,
              lineHeight: 20,
              maxWidth: "85%",
              maxHeight: 44,
              marginBottom: 0,
            }}
          >
            Khi Bạn Gặp Bất Cứ Sự Cố gì hãy liên hệ với Chúng tôi Qua các phương
            thức bên dưới
          </Text>
          <View
            style={{
              padding: 10,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 2,
              borderBottomWidth: 1,
              backgroundColor: "#e6e6e6",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: 100,
                  marginRight: 10,
                  backgroundColor: "#D3D3D3",
                }}
              >
                <Image
                  source={require("../Screen/image/diachi.png")}
                  style={{ width: 24, height: 24 }}
                ></Image>
              </View>
              <Text>Đại Học Mỏ Khu B , Cổ Nhuế 2 , Bắc Từ LIêm , Hà Nội</Text>
            </View>
            <Image
              source={require("../Screen/image/next.png")}
              style={{ width: 12, height: 12 }}
            ></Image>
          </View>
          <View
            style={{
              padding: 10,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 14,
              borderBottomWidth: 1,
              backgroundColor: "#e6e6e6",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: 100,
                  marginRight: 10,
                  backgroundColor: "#D3D3D3",
                }}
              >
                <Image
                  source={require("../Screen/image/phone.png")}
                  style={{ width: 24, height: 24 }}
                ></Image>
              </View>
              <Text>0979022810</Text>
            </View>
            <Image
              source={require("../Screen/image/next.png")}
              style={{ width: 12, height: 12 }}
            ></Image>
          </View>
          <View
            style={{
              padding: 10,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 14,
              borderBottomWidth: 1,
              backgroundColor: "#e6e6e6",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: 100,
                  marginRight: 10,
                  backgroundColor: "#D3D3D3",
                }}
              >
                <Image
                  source={require("../Screen/image/mail.png")}
                  style={{ width: 24, height: 24 }}
                ></Image>
              </View>
              <Text>Thanhdao02dd@gmail.com</Text>
            </View>
            <Image
              source={require("../Screen/image/next.png")}
              style={{ width: 12, height: 12 }}
            ></Image>
          </View>

          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                marginBottom: 4,
              }}
            >
              Cảm Ơn Bạn Đã Tin Tưởng Chúng Tôi
            </Text>
            <Text>- Đội Ngũ Shop</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#555555",
          height: 100,
          padding: 20,
          borderRadius: 20,
          marginTop: 20,
          marginBottom: 100,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            source={require("../Screen/image/fb.png")}
            style={{ width: 50, height: 50 }}
          ></Image>
          <Text
            style={{
              color: "#fff",
              marginLeft: 10,
              fontSize: 15,
              fontWeight: "600",
              marginTop: 17,
            }}
          >
            Fashion Men
          </Text>
          <Image
            source={require("../Screen/image/instagram.png")}
            style={{ width: 50, height: 50, marginLeft: 40 }}
          ></Image>
          <Text
            style={{
              color: "#fff",
              marginLeft: 10,
              fontSize: 15,
              fontWeight: "600",
              marginTop: 17,
            }}
          >
            Pham Thanh Dao
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default Contact;
