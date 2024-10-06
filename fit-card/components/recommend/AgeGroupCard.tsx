// @/components/recommend/AgeGroup.tsx
import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// AgeGroupCard 컴포넌트의 props 타입 정의
interface AgeGroupCardProps {
  imagePath: any; // 카드 이미지 경로
  cardName: string; // 카드 이름
  benefits: string[]; // 혜택 내용 배열
}

function AgeGroupCard({ imagePath, cardName, benefits }: AgeGroupCardProps) {
  const [imageOrientation, setImageOrientation] = useState<boolean>(false);

  const handleImageLoad = (event: any) => {
    const { width, height } = event.nativeEvent.source;
    // 이미지가 세로로 더 길 경우 회전 여부 설정
    setImageOrientation(height > width);
  };

  return (
    <View style={styles.cardContainer}>
      {/* 카드 이미지 */}
      <Image
        source={imagePath}
        style={[
          imageOrientation
            ? styles.cardImageRotated // 세로로 긴 이미지일 때 회전된 크기 적용
            : styles.cardImage, // 기본 크기 적용
        ]}
        onLoad={handleImageLoad}
        resizeMode="contain"
      />
      {/* 카드 정보(이름 및 혜택) */}
      <View style={styles.cardInfo}>
        {benefits.map((benefit, index) => (
          <Text key={index} style={styles.benefitText}>
            {benefit}
          </Text>
        ))}
        <Text style={styles.cardName}>{cardName}</Text>
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
    height: 50,
    marginRight: 25,
    marginLeft: 9,
    marginVertical: 13,
    // marginTop: 10,
    resizeMode: "contain",
  },
  cardImageRotated: {
    width: 50,
    height: 80,
    marginLeft: 25,
    marginRight: 42,
    transform: [{ rotate: "-90deg" }],
    resizeMode: "contain",
  },

  cardInfo: {
    flex: 1, // 텍스트 부분이 남은 공간을 채우도록
    flexDirection: "column", // 카드 이름과 혜택을 위아래로 배치
    justifyContent: "center",
  },
  cardName: {
    fontFamily: "SUITE-Bold",
  },
  benefitText: {
    marginBottom: 5,
    fontSize: 14,
    fontFamily: "SUITE-Regular",
    color: "#555",
  },
});
