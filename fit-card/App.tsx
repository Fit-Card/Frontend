import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import LoginScreen from "./pages/Login";
import TempScreen from "./pages/Temp";
import MypageScreen from "./pages/Mypage";
import MapScreen from "./pages/Map";

// 앱 시작 시 SplashScreen을 표시하고 로딩이 완료되면 숨김
export default function App() {
  const Stack = createStackNavigator();

  const [fontsLoaded] = useFonts({
    "SUITE-Regular": require("./assets/fonts/SUITE-Regular.ttf"),
    "SUITE-Bold": require("./assets/fonts/SUITE-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // SplashScreen을 보여주는 동안 폰트 로드가 완료될 때까지 대기
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        if (fontsLoaded) {
          // 폰트가 로드되면 SplashScreen을 숨김
          SplashScreen.hideAsync();
        }
      }
    }

    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // 폰트가 로드되지 않은 경우 아무것도 렌더링하지 않음
  }

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
    fontFamily: "SUITE-Regular",
  },
  mainText: {
    fontSize: 50,
    fontFamily: "SUITE-Regular",
  },
});
