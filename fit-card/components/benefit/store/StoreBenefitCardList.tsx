import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { StackParamList } from "@/navigationTypes";

// 카드 데이터에 benefit 추가
const cardsData = [
  {
    id: 1,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("@/assets/images/temp-card.png"),
    benefit: "영화 10% 할인",
  },
  {
    id: 2,
    name: "신한카드 Z play",
    companyId: 1,
    image: require("@/assets/images/temp-card.png"),
    benefit: "영화 5% 할인",
  },
  {
    id: 3,
    name: "우리카드 혜택",
    companyId: 2,
    image: require("@/assets/images/temp-card.png"),
    benefit: "영화 10% 캐시백",
  },
  {
    id: 4,
    name: "신한카드 ZERO",
    companyId: 1,
    image: require("@/assets/images/temp-card.png"),
    benefit: "영화 10% 적립",
  },
];

// Route type 정의
type CardListRouteProp = RouteProp<StackParamList, "CardList">;

const StoreBenefitCardList = () => {
  const route = useRoute<CardListRouteProp>();
  const { companyName, companyId } = route.params;

  // 회사 ID에 따라 필터링된 카드 목록
  const filteredCards = cardsData.filter((card) => card.companyId === companyId);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{companyName}</Text>

      <FlatList
        data={filteredCards}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{item.name}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.benefit}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "SUITE-Bold",
    marginLeft: 16,
    marginBottom: 15,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#e6e6e6",
    elevation: 1,
  },
  cardImage: {
    width: 60,
    height: 40,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 14,
    color: "#333",
    fontFamily: "SUITE-Bold",
  },
  badge: {
    backgroundColor: "#EFF3FF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    color: "#4176FF",
    fontFamily: "SUITE-Bold",
  },
});

export default StoreBenefitCardList;
