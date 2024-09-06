import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from 'react-native';

import LoginScreen from "./pages/Login";
import TempScreen from './pages/Temp';
import MypageScreen from './pages/Mypage';
import MapScreen from "./pages/Map";

export default function App() {

  
  const Stack = createStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Temp" component={TempScreen} />
        <Stack.Screen name="Mypage" component={MypageScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  mainText: {
    fontSize: 50,
  },
});
