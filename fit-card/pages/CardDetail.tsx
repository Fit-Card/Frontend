import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // 화살표 및 카테고리 아이콘 사용

import { StackParamList } from "@/navigationTypes";

// 카드 데이터
const cardsData: Array<{
  id: number;
  name: string;
  image: any;
  categories: Record<number, string>;
}> = [
  {
    id: 1,
    name: "신한카드 Mr.Life",
    image: require("@/assets/images/temp-card.png"),
    categories: {
      0: "버거킹 10% 할인\n도미노피자 10% 할인\n엽기떡볶이 10% 할인",
      1: "스타벅스 10% 할인\n이디야 5% 할인",
      2: "CU 10% 할인\nGS25 5% 할인",
      3: "CGV 10% 할인\n롯데시네마 5% 할인",
      4: "SK 주유소 10% 적립\nGS 주유소 5% 적립",
    },
  },
];

// Route type 정의
type CardDetailRouteProp = RouteProp<StackParamList, "CardDetail">;

const CardDetailScreen = () => {
  const route = useRoute<CardDetailRouteProp>();
  const { cardId } = route.params;

  const card = cardsData.find((item) => item.id === cardId);

  // 카테고리별로 아코디언 상태를 관리하기 위한 상태
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  // 카테고리 목록과 아이콘
  const categoriesWithIcons: Array<{ name: string; icon: keyof typeof Ionicons.glyphMap }> = [
    { name: "음식점", icon: "restaurant-outline" },
    { name: "카페", icon: "cafe-outline" },
    { name: "편의점", icon: "cart-outline" },
    { name: "문화", icon: "film-outline" },
    { name: "주유소", icon: "car-outline" },
  ];

  // 아코디언 토글 함수
  const toggleCategory = (index: number) => {
    if (expandedCategories.includes(index)) {
      setExpandedCategories(expandedCategories.filter((i) => i !== index));
    } else {
      setExpandedCategories([...expandedCategories, index]);
    }
  };

  if (!card) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text>카드 정보를 찾을 수 없습니다.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={card.image} style={styles.cardImage} />
      <Text style={styles.cardName}>{card.name}</Text>

      <View style={styles.accordionContainer}>
        {categoriesWithIcons.map((category, index) => (
          <View key={index} style={styles.accordionItem}>
            <TouchableOpacity onPress={() => toggleCategory(index)} style={styles.accordionHeader}>
              <View style={styles.categoryIconContainer}>
                <Ionicons name={category.icon} size={20} color="#5253F0" style={styles.icon} />
                <Text style={styles.categoryTitle}>{category.name}</Text>
              </View>
              <Ionicons
                name={
                  expandedCategories.includes(index) ? "chevron-up-outline" : "chevron-down-outline"
                }
                size={24}
                color="#333"
              />
            </TouchableOpacity>
            {expandedCategories.includes(index) && (
              <View style={styles.accordionContent}>
                <Text style={styles.categoryDetails}>{card.categories[index]}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center", // 중앙 정렬
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30, // 스크롤 시 아래쪽 패딩 추가
    backgroundColor: "#fff",
  },
  cardImage: {
    width: 130,
    height: 90,
    marginBottom: 20,
    resizeMode: "contain",
  },
  cardName: {
    fontSize: 20,
    fontFamily: "SUITE-Bold",
    marginBottom: 10,
  },
  accordionContainer: {
    width: "100%",
    marginTop: 20,
  },
  accordionItem: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  categoryIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: "SUITE-Bold",
    color: "#666",
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  accordionContent: {
    backgroundColor: "#F7F9FC",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E1E5EB",
  },
  categoryDetails: {
    fontSize: 14,
    color: "#666",
    fontFamily: "SUITE-Regular",
    lineHeight: 22,
  },
});

export default CardDetailScreen;
