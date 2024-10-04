import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useDispatch } from "react-redux"; // Redux 사용
import { login } from "@/store/userSlice"; // User slice의 로그인 액션
import { mockLogin } from "@/mock/mockLogin"; // mockLogin 함수 불러오기

const Loading = ({ navigation }: { navigation: any }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     try {
  //       // mockLogin을 통해 비동기적으로 로그인 검증 및 mockUser 정보 반환
  //       const userData = await mockLogin({ loginId: "test", password: "test" });
  //       // 성공 시 사용자 정보를 store에 저장
  //       dispatch(login(userData));
  //       // 메인 화면으로 이동
  //       navigation.replace("Main");
  //     } catch (error) {
  //       console.error("자동 로그인 실패", error);
  //       // 로그인 실패 시 로그인 화면으로 이동
  //       navigation.replace("Login");
  //     }
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [dispatch, navigation]);

  // 임시 로그인 코드
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
    justifyContent: "space-between",
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
