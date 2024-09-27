import React, { useDebugValue, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { StackParamList } from "@/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { mockUser } from "@/mock/mockUser";

type CardListNavigationProp = StackNavigationProp<StackParamList, "CardDetail">;
type CardListRouteProp = RouteProp<StackParamList, "CardList">;

interface CardInfo {
  id: number;
  name: string;
  image: string;
}

const CardListScreen = () => {
  const route = useRoute<CardListRouteProp>();
  const navigation = useNavigation<CardListNavigationProp>();
  const { companyName, companyId } = route.params;
  const [cardsData, setCardsData] = useState<CardInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleCardPress = (cardId: number) => {
    navigation.navigate("CardDetail", { cardId });
  };

  useEffect(() => {
    const fetchCardListData = async () => {
      try {
        setLoading(true);

        const response = await axios.post(
          `http://j11a405.p.ssafy.io:8081/cards/get/${companyId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${mockUser.token}`,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
          }
        );

        const cardList = response.data.data.cardInfoGetResponses.map((card: any) => ({
          id: card.cardId,
          name: card.cardName,
          image: card.cardImageUrl,
        }));

        setCardsData(cardList);
      } catch (error) {
        console.error("Error fetching card companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardListData();
  }, [companyId]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{companyName}</Text>

      <FlatList
        data={cardsData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item.id)}>
            <View style={styles.cardContainer}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
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
    borderRadius: 3,
  },
  cardName: {
    fontSize: 15,
    marginLeft: 10,
    fontFamily: "SUITE-Regular",
  },
});

export default CardListScreen;
