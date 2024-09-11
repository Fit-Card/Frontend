import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "@/navigationTypes";
import CardUsage from "@/components/main/cardUsage";
import Benefit from "@/components/main/cardBenefit";

export default function MainScreen() {
  // NavigationProp 타입 지정
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  // 더미 데이터
  const dummyUser = {
    name: "현경찬",
    cardImage: require("@/assets/images/temp-card.png"), // 이미지 경로
    cardName: "Fit Card 어쩌구저쩌구",
    currentUsage: 202115,
    goalUsage: 300000,
  };

  // 더미 혜택
  const dummyBenefit = {
    index: 0,
    category: ["음식점", "카페", "편의점", "문화", "주유소"],
    logo: null,
    franchiseName: "프랜차이즈 이름",
    info: [
      ["음식점 혜택 1", "음식점 혜택 2", "음식점 혜택 3"], // 음식점 혜택
      ["카페 혜택 1", "카페 혜택 2", "카페 혜택 3"], // 카페 혜택
      ["편의점 혜택 1", "편의점 혜택 2", "편의점 혜택 3"], // 편의점 혜택
      ["문화 혜택 1", "문화 혜택 2", "문화 혜택 3"], // 문화 혜택
      ["주유소 혜택 1", "주유소 혜택 2", "주유소 혜택 3"], // 주유소 혜택
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <CardUsage {...dummyUser} />
        <Benefit {...dummyBenefit} />
      </View>

      {/* <View style={styles.buttonContainer}>
        <Button title="로그인 화면 이동" onPress={() => navigation.navigate("Login")} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    paddingHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
