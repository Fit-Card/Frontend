import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import * as Progress from "react-native-progress";
import { MainCard } from "@/interfaces/Card";
import RandomBenefit from "./RandomBenefit";

interface MainCarouselProps {
  cards: MainCard[];
}

const MainCarousel = ({ cards }: MainCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const carouselRef = useRef<any>(null); // 캐러셀 참조 추가

  const onLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const width = 300; // 디자인에 맞게 조정

  const renderItem = ({ item }: { item: MainCard }) => {
    const usagePercentage = item.currentUsage / item.goalUsage;

    return (
      <View style={styles.carouselInner}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.cardName}</Text>
          <Image source={item.cardImage} style={styles.cardImage} />

          <View style={styles.usageContainer} onLayout={onLayout}>
            {/* Progress Bar */}
            <View style={{ position: "relative", width: containerWidth }}>
              <Progress.Bar
                progress={usagePercentage}
                width={containerWidth}
                height={10}
                color={"#5253F0"}
                unfilledColor={"#ccc"}
                borderWidth={0}
              />
              <Text
                style={[
                  styles.currentUsageText,
                  {
                    left: usagePercentage * containerWidth - 30,
                  },
                ]}
              >
                {item.currentUsage}원
              </Text>
            </View>
          </View>

          <RandomBenefit cardId={cards[currentIndex].cardId} />

          {/* <View>
            {item.cardBenefit.map((benefit, index) => (
              <Text key={index} style={styles.cardBenefit}>
                {benefit}
              </Text>
            ))}
          </View> */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      {/* Carousel */}
      <Carousel
        ref={carouselRef}
        width={width}
        height={250}
        data={cards}
        renderItem={renderItem}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        overscrollEnabled={false} // Prevent overscroll
        onSnapToItem={(index) => {
          setCurrentIndex(index);
        }}
      />

      {/* 페이지 인디케이터 */}
      <View style={styles.paginationContainer}>
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
    width: "80%",
    overflow: "hidden",
    height: "85%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  carouselInner: {
    width: "100%",
    flexDirection: "row",
    alignContent: "space-between",
  },
  card: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    // height: 230,
    // justifyContent: "center",
  },
  cardImage: {
    width: 120,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: "SUITE-Bold",
    fontSize: 16,
    marginBottom: 5,
  },
  usageContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  currentUsageText: {
    position: "absolute",
    top: -20,
    fontSize: 12,
    fontFamily: "SUITE-Bold",
    color: "#5253F0",
  },
  cardBenefit: {
    fontSize: 14,
    color: "#555",
    fontFamily: "SUITE-Bold",
    marginVertical: 2,
  },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
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

export default MainCarousel;
