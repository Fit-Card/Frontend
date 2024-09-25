import React from "react";
import { TouchableOpacity, View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { StackParamList } from "@/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";

const cardsData = [
  {
    id: 1,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("@/assets/images/temp-card.png"),
  },
  {
    id: 2,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("@/assets/images/temp-card.png"),
  },
  {
    id: 3,
    name: "우리카드 혜택",
    companyId: 2,
    image: require("@/assets/images/temp-card.png"),
  },
  {
    id: 4,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("@/assets/images/temp-card.png"),
  },
  {
    id: 5,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("@/assets/images/temp-card.png"),
  },
  {
    id: 6,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("@/assets/images/temp-card.png"),
  },
  {
    id: 7,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("@/assets/images/temp-card.png"),
  },
  {
    id: 8,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("@/assets/images/temp-card.png"),
  },
];

// StackNavigationProp 정의
type CardListNavigationProp = StackNavigationProp<StackParamList, "CardDetail">;
type CardListRouteProp = RouteProp<StackParamList, "CardList">;

const CardListScreen = () => {
  const route = useRoute<CardListRouteProp>();
  const navigation = useNavigation<CardListNavigationProp>();
  const { companyName, companyId } = route.params;

  // 회사에 맞는 카드 필터링
  const filteredCards = cardsData.filter((card) => card.companyId === companyId);

  // 카드 클릭 시 상세 페이지로 이동
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
              <Text style={styles.cardName}>{item.name}</Text>
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
  cardName: {
    fontSize: 15,
    marginLeft: 10,
    fontFamily: "SUITE-Regular",
  },
});

export default CardListScreen;
