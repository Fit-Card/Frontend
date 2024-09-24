import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "@/interfaces/User";

function ConsumptionPattern({ user }: { user: User }) {
  return (
    <View>
      {/* 사용자 이름과 소비 패턴 텍스트 표시 */}
      <Text style={styles.userName}>{user.name}님의 소비 패턴</Text>
    </View>
  );
}

export default ConsumptionPattern;

const styles = StyleSheet.create({
  userName: {
    fontSize: 20,
    fontFamily: "SUITE-Bold",
  },
});
