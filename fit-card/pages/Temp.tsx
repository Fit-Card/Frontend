import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import CustomButton from "../components/button/CustomButton";

export default function TempScreen() {
  // NavigationProp 타입 지정
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>다른 페이지로 가보기</Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="임시"
          onPress={() => navigation.navigate("Temp")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="마이페이지"
          onPress={() => navigation.navigate("Mypage")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton title="지도" onPress={() => navigation.navigate("Map")} />
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
  },
  title: {
    fontSize: 24,
    fontFamily: "SUITE-Regular", // 폰트 적용
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
