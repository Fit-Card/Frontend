import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import HeaderComponent from "@/components/header/CustomHeader";
import SignUpHeader from "@/components/header/SignUpHeader";

import LoginScreen from "./pages/Login";
import MainScreen from "./pages/Home";
import MypageScreen from "./pages/Mypage";
import MapScreen from "./pages/Map";
import AddcardScreen from "./pages/Addcard";
import SearchScreen from "./pages/Search";
import CardScreen from "./pages/Card";
import DeletecardScreen from "./pages/Deletecard";
import NoticeScreen from "./pages/Notice";
import NoticeDetailScreen from "./pages/NoticeDetail";
import SignUp from "@/pages/SignUp";
import Loading from "@/pages/Loading";

import StoreDetail from "@/components/benefit/store/StoreDetail";
import CardList from "@/components/benefit/card/CardList";
import StoreBenefitCardList from "@/components/benefit/store/StoreBenefitCardList";
import PersonalInfoScreen from "./pages/PersonalInfo";
import CardDetailScreen from "@/pages/CardDetail";
import SearchPage from "@/pages/SearchPage";

import { Provider } from "react-redux";
import store from "@/store";

// 스택 네비게이터 정의
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// SearchScreen과 CardList를 하나의 스택으로 관리
function SearchStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ header: () => <HeaderComponent title="혜택 검색" /> }}
      />
      <Stack.Screen
        name="CardList"
        component={CardList}
        options={{ header: () => <HeaderComponent title="카드 목록" /> }}
      />
      <Stack.Screen
        name="StoreDetail"
        component={StoreDetail}
        options={{ header: () => <HeaderComponent title="혜택 검색" /> }}
      />
      <Stack.Screen
        name="StoreBenefitCardList"
        component={StoreBenefitCardList}
        options={{ header: () => <HeaderComponent title="카드 목록" /> }}
      />
      <Stack.Screen
        name="CardDetail"
        component={CardDetailScreen}
        options={{ header: () => <HeaderComponent title="카드 상세" /> }}
      />
    </Stack.Navigator>
  );
}

function MypageStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mypage"
        component={MypageScreen}
        options={{ header: () => <HeaderComponent title="마이페이지" /> }}
      />
      <Stack.Screen
        name="Addcard"
        component={AddcardScreen}
        options={{ header: () => <HeaderComponent title="카드 갱신" /> }}
      />
      <Stack.Screen
        name="Deletecard"
        component={DeletecardScreen}
        options={{ header: () => <HeaderComponent title="카드 삭제" /> }}
      />
      <Stack.Screen
        name="Notice"
        component={NoticeScreen}
        options={{ header: () => <HeaderComponent title="이벤트 알림" /> }}
      />
      <Stack.Screen
        name="Noticedetail"
        component={NoticeDetailScreen}
        options={{ header: () => <HeaderComponent title="상세 보기" /> }}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfoScreen}
        options={{ header: () => <HeaderComponent title="사용자 정보 관리" /> }}
      />
    </Stack.Navigator>
  );
}

function MapStackNavigator() {
  return (
    <Stack.Navigator>
      <Tab.Screen
        name="혜택 지도"
        component={MapScreen}
        options={{ header: () => <HeaderComponent title="혜택 지도" /> }}
      />
      <Stack.Screen
        name="CardDetail"
        component={CardDetailScreen}
        options={{ header: () => <HeaderComponent title="카드 상세" /> }}
      />
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{ header: () => <HeaderComponent title="지도 검색" /> }}
      />
    </Stack.Navigator>
  );
}

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
        options={{
          header: () => <HeaderComponent title="홈" backgroundColor="#F7F7F7" />,
        }}
      />
      <Tab.Screen
        name="혜택검색"
        component={SearchStackNavigator} // 스택 네비게이터로 변경
        options={{ headerShown: false }} // 개별 화면에서 헤더를 관리하므로 여기선 false
      />
      <Tab.Screen name="지도검색" component={MapStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen
        name="카드추천"
        component={CardScreen}
        options={{
          header: () => <HeaderComponent title="카드 추천" backgroundColor="#F7F7F7" />,
        }}
      />
      <Tab.Screen name="My" component={MypageStackNavigator} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// 앱 시작 시 SplashScreen을 표시하고 로딩이 완료되면 숨김
export default function App() {
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
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading">
          <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{ header: () => <HeaderComponent title="혜택 지도" /> }}
          />
          <Stack.Screen name="Card" component={CardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Mypage" component={MypageScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Addcard" component={AddcardScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Deletecard"
            component={DeletecardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Notice" component={NoticeScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Noticedetail"
            component={NoticeDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PersonalInfo"
            component={PersonalInfoScreen}
            options={{
              header: () => <HeaderComponent title="사용자 정보 관리" />,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ header: () => <SignUpHeader title="회원가입" /> }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
