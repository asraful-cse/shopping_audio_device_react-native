import { StatusBar } from "expo-status-bar";
// import {  Text, View } from 'react-native';
// import { COLOURS } from './components/database/Database';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import ProductInfo from "./screens/ProductInfo";
import { SafeAreaView, StyleSheet } from "react-native";
import MyCart from "./screens/MyCart";

// ----------------------------------------------------------------------------
// copy to the native doc -----------------------------------------------------
// ---------------------------------------------------------------------------
// copy and install this package____
// npm install @react-navigation/native-stack
// npm i react-native-screens
// npm install @react-navigation/native
// ---------------------------------------------------------------------------
const Stack = createNativeStackNavigator();
// ----------------------------------------------------------------------------

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MyCart" component={MyCart} />
          <Stack.Screen name="ProductInfo" component={ProductInfo} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  }
});