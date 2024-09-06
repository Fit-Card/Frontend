import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import CustomButton from "../components/button/CustomButton";

export default function MypageScreen() {
  // NavigationProp 타입 지정
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>마이페이지 화면입니다!</Text>

      <View>
        <CustomButton title="임시" onPress={() => navigation.navigate("Temp")} />
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
    fontFamily: "SUITE-Regular",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
