import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { StackParamList } from "../../navigationTypes";

const cardsData = [
  {
    id: 1,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("../../assets/images/temp-card.png"),
  },
  {
    id: 2,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("../../assets/images/temp-card.png"),
  },
  {
    id: 3,
    name: "우리카드 혜택",
    companyId: 2,
    image: require("../../assets/images/temp-card.png"),
  },
  {
    id: 4,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("../../assets/images/temp-card.png"),
  },
  {
    id: 5,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("../../assets/images/temp-card.png"),
  },
  {
    id: 6,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("../../assets/images/temp-card.png"),
  },
  {
    id: 7,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("../../assets/images/temp-card.png"),
  },
  {
    id: 8,
    name: "신한카드 Mr.Life",
    companyId: 1,
    image: require("../../assets/images/temp-card.png"),
  },
];

type CardListRouteProp = RouteProp<StackParamList, "CardList">;

const CardListScreen = () => {
  const route = useRoute<CardListRouteProp>();
  const { companyName, companyId } = route.params;

  const filteredCards = cardsData.filter((card) => card.companyId === companyId);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{companyName}</Text>

      <FlatList
        data={filteredCards}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardName}>{item.name}</Text>
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
    borderColor: "#E1E1E1",
    borderWidth: 2.5,
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