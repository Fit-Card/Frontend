import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface CardItemProps {
  image: any;
  name: string;
  description: string;
  onPress: () => void; // 클릭 이벤트를 받을 프롭 추가
}

const CardItem = ({ image, name, description, onPress }: CardItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <Image source={image} style={styles.cardImage} />
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{name}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
