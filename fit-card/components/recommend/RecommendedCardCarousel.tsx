// @/components/recommend/RecommendedCardCarousel.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { RecommendCard } from "@/interfaces/Card";

interface RecommendedCardCarouselProps {
  cards: RecommendCard[];
}

const RecommendedCardCarousel = ({ cards }: RecommendedCardCarouselProps) => {
  const screenWidth = Dimensions.get("window").width * 0.9;
  const [imageOrientation, setImageOrientation] = useState<{ [key: number]: boolean }>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageLoad = (id: number, event: any) => {
    const { width, height } = event.nativeEvent.source;
    setImageOrientation((prev) => ({
      ...prev,
      [id]: height > width,
    }));
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        width={screenWidth}
        height={260}
        data={cards}
        renderItem={({ item }) => (
          <View style={styles.carouselInner}>
            {/* 내 카드 */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>[ 내 카드 ]</Text>
              <Image
                source={{ uri: item.memberCardImageUrl }}
                style={[
                  styles.cardImage,
                  imageOrientation[item.memberCardId] && { transform: [{ rotate: "-90deg" }] },
                ]}
                onLoad={(event) => handleImageLoad(item.memberCardId, event)}
              />
              <Text style={styles.cardTitle}>{item.memberCardName.replace(" ", "\n")}</Text>
              <Text>할인 금액: {item.memberCardBenefitAmount}원</Text>
            </View>

            {/* 추천 카드 */}
            {item.recommendCardPerformanceId !== 0 ? (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>[ 추천 카드 ]</Text>
                <Image
                  source={{ uri: item.recommendCardImage }}
                  style={[
                    styles.cardImage,
                    imageOrientation[item.recommendCardPerformanceId] && {
                      transform: [{ rotate: "-90deg" }],
                    },
                  ]}
                  onLoad={(event) => handleImageLoad(item.recommendCardPerformanceId, event)}
                />
                <Text style={styles.cardTitle}>{item.recommendCardName.replace(" ", "\n")}</Text>
                <Text>할인 금액: {item.recommendCardBenefitAmount}원</Text>
              </View>
            ) : (
              <View style={styles.card}>
                <Text style={styles.bestTitle}>
                  할인 혜택을{"\n"}잘 사용하고{"\n"}계십니다!
                </Text>
              </View>
            )}
          </View>
        )}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onSnapToItem={(index) => {
          setCurrentIndex(index);
        }}
      />
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
        }}
      >
        {cards.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot, index === currentIndex ? styles.activeDot : null]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    overflow: "hidden",
    height: 230,
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: "SUITE-Bold",
    marginBottom: 5,
    textAlign: "center",
  },
  bestTitle: {
    fontSize: 18,
    fontFamily: "SUITE-Bold",
    marginBottom: 5,
    textAlign: "center",
    paddingTop: 50,
  },
  cardBenefit: {
    fontSize: 14,
    color: "#555",
    fontFamily: "SUITE-Bold",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#5253F0",
  },
});

export default RecommendedCardCarousel;
