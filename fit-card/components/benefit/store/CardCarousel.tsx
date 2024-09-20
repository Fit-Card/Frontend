import React, { useRef, useState } from "react";
import { View, Text, Image, StyleSheet, Animated, Dimensions, ScrollView } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

// 카드 데이터 타입 정의
type CardItem = {
  id: number;
  name: string;
  discount: string;
  details: string;
  image: any;
};

// CardCarousel 컴포넌트
interface CardCarouselProps {
  cardData: CardItem[];
}

const CardCarousel = ({ cardData }: CardCarouselProps) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false,
  });

  const handleMomentumScrollEnd = (e: any) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        snapToAlignment="center"
        decelerationRate="fast"
        // padding 대신 marginHorizontal을 사용하여 밀림 방지
        contentContainerStyle={styles.scrollContainer}
      >
        {cardData.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.discount}>{item.discount}</Text>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardDetails}>{item.details}</Text>
            </View>
            {/* 카드 내부 인디케이터 */}
            <View style={styles.indicatorContainer}>
              {cardData.map((_, ind) => {
                const isActive = currentIndex === ind;
                return (
                  <View
                    key={ind}
                    style={[
                      styles.indicator,
                      isActive ? styles.activeIndicator : styles.inactiveIndicator,
                    ]}
                  />
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  scrollContainer: {
    marginHorizontal: 0, // 양쪽 여백 없애기
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 10,
    width: screenWidth * 0.85, // 카드 너비 설정
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#5253F0",
    position: "relative",
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 25,
    marginTop: 15,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  discount: {
    fontSize: 14,
    color: "#5253F0",
    marginBottom: 5,
    fontFamily: "SUITE-Bold",
  },
  cardName: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "SUITE-Bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#666",
    lineHeight: 20,
    fontFamily: "SUITE-Regular",
    marginBottom: 10,
  },
  indicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "115%", // 카드 너비 전체에 걸쳐서 중앙 정렬
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "#5253F0",
  },
  inactiveIndicator: {
    backgroundColor: "#ccc",
  },
});

export default CardCarousel;
