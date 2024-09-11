import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import Header from "./components/Header";

import LoginScreen from "./pages/Login";
import MainScreen from "./pages/Home";
import MypageScreen from "./pages/Mypage";
import MapScreen from "./pages/Map";
import AddcardScreen from "./pages/Addcard";
import SearchScreen from "./pages/Search";
import CardScreen from "./pages/Card";
import DeletecardScreen from "./pages/Deletecard";

import common from "./styles/Common";
import KeyColors from "./styles/KeyColor";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          let iconType = "ionicon";

          if (route.name === "홈") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "혜택검색") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "지도검색") {
            iconName = focused ? "location" : "location-outline";
          } else if (route.name === "카드추천") {
            iconName = focused ? "card" : "card-outline";
          } else if (route.name === "My") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <Icon name={iconName} type={iconType} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#5253F0",
        tabBarInactiveTintColor: "#4D4D4D",
        tabBarLabelStyle: {
          fontFamily: "SUITE-Bold",
          fontSize: 11,
          marginBottom: 4,
        },
      })}
    >
      <Tab.Screen
        name="홈"
        component={MainScreen}
        options={{ header: () => <Header title="홈" /> }}
      />
      <Tab.Screen
        name="혜택검색"
        component={SearchScreen}
        options={{ header: () => <Header title="혜택 검색" /> }}
      />
      <Tab.Screen
        name="지도검색"
        component={MapScreen}
        options={{ header: () => <Header title="혜택 지도" /> }}
      />
      <Tab.Screen
        name="카드추천"
        component={CardScreen}
        options={{ header: () => <Header title="카드 추천" /> }}
      />
      <Tab.Screen
        name="My"
        component={MypageScreen}
        options={{ header: () => <Header title="마이 페이지" /> }}
      />
    </Tab.Navigator>
  );
}

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
  // 헤더 안보이게 하기 ... options={{headerShown: false}}
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Card" component={CardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Mypage" component={MypageScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Addcard" component={AddcardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Deletecard" component={DeletecardScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
