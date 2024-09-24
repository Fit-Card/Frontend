import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

function RecommendedCard() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/temp-card.png")} style={styles.image} />
      <Text style={styles.text}>카드 이름 나와주세요</Text>
      <Text style={styles.info}>카페 15%</Text>
      <Text style={styles.info}>영화 25%</Text>
      <Text style={styles.info}>교통 10%</Text>
      <Text style={styles.info}>기타 15%</Text>
    </View>
  );
}

export default RecommendedCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center", // 컴포넌트 중앙 정렬
  },
  text: {
    fontFamily: "SUITE-Bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 12,
    fontFamily: "SUITE-Regular",
    marginBottom: 3,
  },
  image: {
    width: 100, // 이미지의 너비
    height: 60, // 이미지의 높이
    resizeMode: "contain", // 이미지 비율을 유지하면서 크기 조정
    marginBottom: 10,
  },
});
