// @/components/recommend/AgeGroup.tsx
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "@/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";

type CardListNavigationProp = StackNavigationProp<StackParamList, "CardDetail">;

interface AgeGroupCardProps {
  cardId: number;
  imagePath: any;
  cardName: string;
  benefits: string[];
}

function AgeGroupCard({ cardId, imagePath, cardName, benefits }: AgeGroupCardProps) {
  const handleCardPress = (cardId: number) => {
    navigation.navigate("CardDetail", { cardId });
  };

  const navigation = useNavigation<CardListNavigationProp>();
  const [imageOrientation, setImageOrientation] = useState<boolean>(false);

  const handleImageLoad = (event: any) => {
    const { width, height } = event.nativeEvent.source;
    setImageOrientation(height > width);
  };

  return (
    <TouchableOpacity onPress={() => handleCardPress(cardId)}>
      <View style={styles.cardContainer}>
        {/* 카드 이미지 */}
        <Image
          source={imagePath}
          style={[imageOrientation ? styles.cardImageRotated : styles.cardImage]}
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
    </TouchableOpacity>
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
    width: 100,
    height: 100,
    marginRight: 25,
    marginHorizontal: 20,
    resizeMode: "contain",
  },
  cardImageRotated: {
    width: 100,
    height: 100,
    marginRight: 25,
    marginHorizontal: 20,
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
