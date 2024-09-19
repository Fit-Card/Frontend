import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import common from "@/styles/Common";

export default function SignUp() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <Text style={styles.description}>
        여기에 회원가입 관련 내용을 추가하세요.
      </Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>뒤로 가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "SUITE-Regular",
    color: common.textBlue.color,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#686E74",
    textAlign: "center",
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: common.textBlue.color,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    fontFamily: "SUITE-Regular",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
