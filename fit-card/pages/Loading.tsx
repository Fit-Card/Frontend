import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useDispatch } from "react-redux"; // Redux 사용
import { login as loginAction } from "@/store/userSlice"; // User slice의 로그인 액션
import { login } from "@/api/auth";
import { getMember } from "@/api/member";
import { LoginRequest } from "@/interfaces/LoginRequest";
import { User } from "@/interfaces/User";

const Loading = ({ navigation }: { navigation: any }) => {
  // const dispatch = useDispatch();

  // 임시 자동 로그인
  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     try {
  //       const loginRequest: LoginRequest = {
  //         loginId: "test",
  //         password: "test",
  //       };
  //       const response = await login(loginRequest);

  //       // accessToken과 refreshToken을 받아옴
  //       const { accessToken, refreshToken } = response.data;

  //       // accessToken으로 사용자 정보 요청 후 전역 상태 저장
  //       const userData: User = await getMember(accessToken);
  //       dispatch(loginAction({ user: userData, accessToken, refreshToken }));

  //       // 메인 화면으로 이동
  //       navigation.navigate("Main");
  //     } catch (error) {
  //       console.error("자동 로그인 실패", error);
  //       // 로그인 실패 시 로그인 화면으로 이동
  //       navigation.replace("Login");
  //     }
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [dispatch, navigation]);

  // 로그인 코드
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={["#5483FC", "#3E0CCE"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/images/splash-logo.png")} style={styles.logo} />
        <Text style={styles.text}> 혜택부터 추천까지 </Text>
      </View>
      <Image source={require("@/assets/images/splash-image.png")} style={styles.image} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center", // 컨테이너 내부 요소 정렬
    marginTop: 150, // 상단 여백 조정
  },
  logo: {
    width: 135, // 로고 너비 조정
    height: 140, // 로고 높이 조정
    resizeMode: "contain",
  },
  text: {
    color: "#FFFFFF", // 텍스트 색상 흰색으로 변경
    marginTop: 5, // 로고와 텍스트 사이 간격 조정
    fontSize: 18, // 텍스트 크기 조정
    fontFamily: "SUITE-Bold",
  },
  image: {
    marginBottom: 50, // 하단 여백 조정
    width: 250, // 이미지 너비 조정
    height: 250, // 이미지 높이 조정
    resizeMode: "contain",
  },
});

export default Loading;
