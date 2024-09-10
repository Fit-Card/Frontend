import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "@/navigationTypes";
import CardUsage from "@/components/main/cardUsage";

export default function MainScreen() {
  // NavigationProp 타입 지정
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  // 더미 데이터
  const dummyUser = {
    name: "현경찬",
    cardImage: require("@/assets/images/temp-card.png"), // 이미지 경로
    cardName: "Fit Card 어쩌구저쩌구",
    currentUsage: 300000,
    goalUsage: 300000,
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <CardUsage {...dummyUser} />
        {/*   <Benefit /> */}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="로그인 화면 이동"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  innerContainer: {
    flex: 1, // 내부 콘텐츠가 차지할 수 있도록 설정
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20, // 둥근 모서리 설정
    backgroundColor: "#f0f0f0", // 배경 색상 설정 (필요시 변경 가능)
    width: "100%", // 부모의 padding이 반영되도록 설정
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
