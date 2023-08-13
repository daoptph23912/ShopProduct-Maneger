import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import AuthStack from "./src/navigation/AuthStack.js";

import { store } from "./src/redux/store";

export default function App() {
  return (
    <View>
      <Text>xasxsxsxs</Text>
    </View>
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <AuthStack />
    //   </NavigationContainer>
    // </Provider>
  );
}

//csjcsuns
