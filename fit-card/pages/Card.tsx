import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CardScreen() {
  return (
    <View style={styles.container}>
      <Text>카드 추천 화면입니다!</Text>
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
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
