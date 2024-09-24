// @/components/recommend/AgeGroup.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// AgeGroupCard 컴포넌트의 props 타입 정의
interface AgeGroupCardProps {
  imagePath: any; // 카드 이미지 경로
  cardName: string; // 카드 이름
  benefits: string[]; // 혜택 내용 배열
}

function AgeGroupCard({ imagePath, cardName, benefits }: AgeGroupCardProps) {
  return (
    <View style={styles.cardContainer}>
      {/* 카드 이미지 */}
      <Image source={imagePath} style={styles.cardImage} />
      {/* 카드 정보(이름 및 혜택) */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{cardName}</Text>
        {benefits.map((benefit, index) => (
          <Text key={index} style={styles.benefitText}>
            - {benefit}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default AgeGroupCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%", // 카드의 너비를 부모 View에 맞게 설정
  },
  cardImage: {
    width: 80,
    height: 45,
    resizeMode: "contain",
    marginRight: 25, // 이미지와 텍스트 간의 간격
  },
  cardInfo: {
    flex: 1, // 텍스트 부분이 남은 공간을 채우도록
    flexDirection: "column", // 카드 이름과 혜택을 위아래로 배치
    justifyContent: "center",
  },
  cardName: {
    fontFamily: "SUITE-Bold",
    marginBottom: 3,
  },
  benefitText: {
    fontSize: 14,
    fontFamily: "SUITE-Regular",
    color: "#555",
  },
});
