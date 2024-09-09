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
import TempScreen from "./pages/Temp";
import MypageScreen from "./pages/Mypage";
import MapScreen from "./pages/Map";
import AddcardScreen from "./pages/Addcard";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "home";
          let iconType: string = "ionicon";

          if (route.name === "Temp") {
            iconName = "home";
            iconType = "ionicon";
          } else if (route.name === "Search") {
            iconName = "search";
            iconType = "ionicon";
          } else if (route.name === "Map") {
            iconName = "map-marker-alt";
            iconType = "font-awesome-5";
          } else if (route.name === "Card") {
            iconName = "credit-card";
            iconType = "font-awesome";
          } else if (route.name === "Mypage") {
            iconName = "user";
            iconType = "font-awesome";
          }
          return (
            <Icon name={iconName} type={iconType} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "#5253F0",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={TempScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={TempScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Card"
        component={TempScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Mypage"
        component={MypageScreen}
        options={{ headerShown: false }}
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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Temp" component={TempScreen} />
        <Stack.Screen name="Mypage" component={MypageScreen} />
        <Stack.Screen name="Addcard" component={AddcardScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Temp"
          component={TabNavigator}
          options={{ header: () => <Header title="Temp" /> }}
        />
        <Stack.Screen
          name="Mypage"
          component={MypageScreen}
          options={{ header: () => <Header title="MyPage" /> }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ header: () => <Header title="Map" /> }}
        />
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
