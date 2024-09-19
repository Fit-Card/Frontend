import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Loading = ({ navigation }: { navigation: any }) => {
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
        <Image
          source={require("@/assets/images/splash-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.text}> 혜택부터 추천까지 </Text>
      </View>
      <Image
        source={require("@/assets/images/splash-image.png")}
        style={styles.image}
      />
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
    width: 150, // 로고 너비 조정
    height: 140, // 로고 높이 조정
    resizeMode: "contain",
  },
  text: {
    color: "#FFFFFF", // 텍스트 색상 흰색으로 변경
    marginTop: 5, // 로고와 텍스트 사이 간격 조정
    fontSize: 16, // 텍스트 크기 조정
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
