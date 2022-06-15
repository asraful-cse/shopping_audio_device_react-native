import { StatusBar } from "expo-status-bar";
// import {  Text, View } from 'react-native';
// import { COLOURS } from './components/database/Database';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import MyCard from "./screens/MyCard";
import ProductInfo from "./screens/ProductInfo";

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
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MyCard" component={MyCard} />
          <Stack.Screen name="ProductInfo" component={ProductInfo} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
}
