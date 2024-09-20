import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack"; // 추가
import { StackParamList } from "@/navigationTypes"; // StackParamList 임포트

// 카드 데이터
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
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("@/assets/images/temp-card.png"),
    benefit: "영화 10% 할인",
  },
  {
    id: 4,
    name: "신한카드 Z play",
    companyId: 1,
    image: require("@/assets/images/temp-card.png"),
    benefit: "영화 5% 할인",
  },
];

// StackNavigationProp 정의
type CardListNavigationProp = StackNavigationProp<StackParamList, "CardDetail">;

const StoreBenefitCardList = () => {
  const route = useRoute<RouteProp<StackParamList, "CardList">>();
  const { companyName, companyId } = route.params;
  const navigation = useNavigation<CardListNavigationProp>(); // useNavigation에 타입 적용

  const filteredCards = cardsData.filter((card) => card.companyId === companyId);

  // 카드 터치 시 상세보기 화면으로 이동
  const handleCardPress = (cardId: number) => {
    navigation.navigate("CardDetail", { cardId }); // CardDetail로 cardId 전달
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{companyName}</Text>

      <FlatList
        data={filteredCards}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item.id)}>
            <View style={styles.cardContainer}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.name}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.benefit}</Text>
              </View>
            </View>
          </TouchableOpacity>
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
