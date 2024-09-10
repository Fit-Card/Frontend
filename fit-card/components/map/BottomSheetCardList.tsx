import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CardItem from "./BottomSheetCardItem";

interface CardListProps {
  cards: {
    id: string;
    image: string;
    name: string;
    description: string;
  }[];
}

const CardList = ({ cards }: CardListProps) => {
  return (
    <View style={styles.cardListWrapper}>
      {cards.map((card) => (
        <CardItem
          key={card.id}
          image={card.image}
          name={card.name}
          description={card.description}
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
