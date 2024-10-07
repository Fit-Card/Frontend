import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CardItem from "./BottomSheetCardItem";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "@/navigationTypes";

interface CardListProps {
  cards: {
    id: number;
    image: string;
    name: string;
    description: string;
    benefitAmount?: number;
  }[];
}

const CardList = ({ cards }: CardListProps) => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  // 카드 클릭 시 상세 페이지로 이동하는 함수
  const handleCardPress = (cardId: number) => {
    navigation.navigate("CardDetail", { cardId });
  };

  return (
    <View style={styles.cardListWrapper}>
      {cards.map((card) => (
        <CardItem
          key={card.id}
          image={card.image}
          name={card.name}
          description={card.description}
          benefitAmount={card.benefitAmount}
          onPress={() => handleCardPress(card.id)} // 클릭 시 상세 페이지로 이동
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardListWrapper: {
    flex: 1,
  },
  cardListContainer: {
    padding: 5,
  },
});

export default CardList;
