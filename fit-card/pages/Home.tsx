import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "@/navigationTypes";
import CardUsage from "@/components/main/cardUsage";
import Benefit from "@/components/main/cardBenefit";

import { useSelector } from "react-redux"; // Redux의 useSelector 사용
import { RootState } from "@/store"; // RootState 타입
import { mockCardInfo } from "@/mock/mockUser";

export default function MainScreen() {
  // NavigationProp 타입 지정
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  // Redux 스토어에서 user 정보 가져오기
  const user = useSelector((state: RootState) => state.user.user);

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
        {user && <CardUsage {...user} {...mockCardInfo} />}
        <Benefit {...dummyBenefit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    padding: 10,
    paddingHorizontal: 20,
  },
  innerContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
    width: "100%",
    paddingBottom: 30,
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
