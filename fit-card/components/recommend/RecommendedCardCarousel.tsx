import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Card } from "@/interfaces/Card";

interface RecommendedCardCarouselProps {
  cards: Card[];
}

const RecommendedCardCarousel = ({ cards }: RecommendedCardCarouselProps) => {
  const width = 300; // Adjust based on your design

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        width={width}
        height={200} // Adjust based on your card size
        data={cards}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.cardImage} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.cardName}</Text>
            <View>
              {item.CardBenefit.map((benefit, index) => (
                <Text key={index} style={styles.cardBenefit}>
                  {benefit}
                </Text>
              ))}
            </View>
          </View>
        )}
        mode="parallax" // Can be changed based on your preference
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    overflow: "hidden",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  card: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: 120,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardBenefit: {
    fontSize: 14,
    color: "#555",
  },
});

export default RecommendedCardCarousel;
