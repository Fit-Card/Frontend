import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface CardItemProps {
  image: any;
  name: string;
  description: string;
}

const CardItem = ({ image, name, description }: CardItemProps) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{name}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "#ddd",
  },
  cardImage: {
    width: 60,
    height: 40,
    borderRadius: 5,
    marginRight: 20,
    marginLeft: 5,
  },
  cardInfo: {
    marginLeft: 10,
  },
  cardName: {
    fontSize: 14,
    fontFamily: "SUITE-Bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#555",
    fontFamily: "SUITE-Bold",
  },
});

export default CardItem;
