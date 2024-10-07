// @/components/recommend/RecommendedCardCarousel.tsx
import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Card } from "@/interfaces/Card";
import { mockCardInfo } from "@/mock/mockUser";

interface RecommendedCardCarouselProps {
  cards: Card[];
}

const RecommendedCardCarousel = ({ cards }: RecommendedCardCarouselProps) => {
  const width = Dimensions.get("window").width * 0.8; // Adjust based on your design

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        width={width}
        height={200} // Adjust based on your card size
        data={cards}
        renderItem={({ item }) => (
          <View style={styles.carouselInner}>
            {/* 내 카드 */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>[ 내 카드 ]</Text>
              <Image source={mockCardInfo.cardImage} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{mockCardInfo.cardName}</Text>
              <View>
                {mockCardInfo.cardBenefit.map((benefit, index) => (
                  <Text key={index} style={styles.cardBenefit}>
                    {benefit}
                  </Text>
                ))}
              </View>
            </View>

            {/* 추천 카드 */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>[ 추천 카드 ]</Text>
              <Image source={item.cardImage} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.cardName}</Text>
              <View>
                {item.cardBenefit.map((benefit, index) => (
                  <Text key={index} style={styles.cardBenefit}>
                    {benefit}
                  </Text>
                ))}
              </View>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  carouselInner: {
    width: "100%",
    flexDirection: "row",
    alignContent: "space-between",
  },
  card: {
    width: "50%",
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
    // fontSize: 14,
    // fontWeight: "bold",
    fontFamily: "SUITE-Bold",
    marginBottom: 5,
  },
  cardBenefit: {
    fontSize: 14,
    color: "#555",
    fontFamily: "SUITE-Bold",
  },
});

export default RecommendedCardCarousel;
