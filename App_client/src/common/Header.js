import { Image, Text, TouchableOpacity, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconSearch from "react-native-vector-icons/FontAwesome";
import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Header = ({ title, show }) => {
  const navigation = useNavigation();
  const editProfile = () => {
    navigation.navigate("EditProfile");
  };
  const searchProducts = () => {
    navigation.navigate("Tìm kiếm");
  };

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showsearchProducts, setShowsearchProducts] = useState(false);
  return (
    <View
      style={{
        height: 60,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 0.2,
        borderBottomColor: "#8e8e8e",
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          fontSize: 20,
          color: "#000",
          marginLeft: 15,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        {title}{" "}
      </Text>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Pressable
          onPress={() => {
            searchProducts();
          }}
        >
          <View style={{ marginRight: 5, marginTop: 5 }}>
            <IconSearch name="search" size={20} color="#000" />
          </View>
        </Pressable>
        {showEditProfile ? (
          <Pressable
            onPress={() => {
              editProfile();
            }}
          >
            <View style={{ paddingHorizontal: 10, marginTop: 0 }}>
              <Icon name="account-edit" size={29} color="#000" />
            </View>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};
export default Header;
