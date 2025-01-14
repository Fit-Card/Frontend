import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import * as Progress from "react-native-progress";
import { MainCard } from "@/interfaces/Card";
import { categoriesWithIcons } from "@/components/map/LocationType";
import Ionicons from "react-native-vector-icons/Ionicons";

interface MainCarouselProps {
  cards: MainCard[];
  loading: boolean;
}

const MainCarousel = ({ cards, loading }: MainCarouselProps) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5253F0" />
      </View>
    );
  }

  if (cards.length === 0) {
    return (
      <View style={styles.exceptionContainer}>
        <Image style={styles.exceptionImage} source={require("@/assets/icons/icon_no.png")} />
        <Text style={styles.exceptionTitle}>표시할 카드가 없습니다.</Text>
        <Text style={styles.exceptionText}>카드를 갱신해주세요.</Text>
      </View>
    );
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [imageOrientation, setImageOrientation] = useState<{ [key: number]: boolean }>({});
  const carouselRef = useRef<any>(null);

  const onLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const width = Dimensions.get("window").width * 0.9;
  const height = Dimensions.get("window").height * 0.6;

  const handleImageLoad = (id: number, event: any) => {
    const { width, height } = event.nativeEvent.source;
    setImageOrientation((prev) => ({
      ...prev,
      [id]: height > width,
    }));
  };

  const getIconForCategory = (merchantName: string) => {
    const category = categoriesWithIcons.find((cat) => cat.title === merchantName);
    return category ? category.icon : "help-outline";
  };

  const renderItem = ({ item }: { item: MainCard }) => {
    const usagePercentage =
      item.memberCardPaymentStatus.totalPayment / item.memberCardPaymentStatus.performanceEnd;

    return (
      <View style={styles.carouselInner}>
        <View style={styles.cardContainer}>
          <Image
            source={{ uri: item.cardImage }}
            style={[
              styles.cardImage,
              imageOrientation[item.cardId] && { transform: [{ rotate: "-90deg" }] },
            ]}
            onLoad={(event) => handleImageLoad(item.cardId, event)}
            resizeMode="contain"
          />

          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{item.cardName}</Text>
            {item.memberCardPaymentStatus.performanceEnd -
              item.memberCardPaymentStatus.totalPayment >
            0 ? (
              <View>
                <Text style={styles.cardPerfomanceTitle}>
                  <Text style={styles.highlightedText}>
                    {(
                      item.memberCardPaymentStatus.performanceEnd -
                      item.memberCardPaymentStatus.totalPayment
                    ).toLocaleString()}
                    원
                  </Text>
                  을 더 사용하면
                </Text>
                <Text style={styles.cardPerfomanceTitle}>
                  다음달{" "}
                  <Text style={styles.highlightedText}>
                    {item.memberCardPaymentStatus.performanceLevel}구간
                  </Text>{" "}
                  혜택을 받을 수 있어요!
                </Text>
              </View>
            ) : (
              <Text style={styles.exceedPerformenceTitle}>목표 실적을 달성했어요!</Text>
            )}
          </View>
        </View>

        <View style={styles.progressBarWrapper} onLayout={onLayout}>
          <Progress.Bar
            progress={usagePercentage}
            width={containerWidth}
            height={12}
            color={"#5253F0"}
            unfilledColor={"#e0e0e0"}
            borderWidth={0}
            borderRadius={10}
          />

          <Image
            source={require("@/assets/images/flag.png")}
            style={[
              styles.flagIcon,
              {
                right: -10,
              },
            ]}
          />

          <View style={styles.progressTextContainer}>
            <Text style={styles.startText}>{item.memberCardPaymentStatus.performanceStart}원</Text>
            <Text style={styles.endText}>
              {item.memberCardPaymentStatus.totalPayment.toLocaleString()}원/
              {item.memberCardPaymentStatus.performanceEnd.toLocaleString()}원
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.recommendComment}>이런 혜택은 어떠세요?</Text>
        </View>

        <View style={styles.benefitsContainer}>
          {item.cardBenefits.benefitSimples.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <Ionicons
                name={getIconForCategory(benefit.merchantCategory)}
                size={24}
                color={"#5253F0"}
                style={styles.benefitIcon}
              />
              <View style={styles.benefitTextContainer}>
                <Text style={styles.merchantName}>{benefit.merchantName}</Text>
                <Text style={styles.discountInfo}>{benefit.discountInfo}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        width={width}
        height={700}
        data={cards}
        renderItem={renderItem}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        overscrollEnabled={false}
        onSnapToItem={(index) => {
          setCurrentIndex(index);
        }}
      />

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
  loadingContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 588,
  },
  exceptionContainer: {
    marginTop: 100,
    marginBottom: 150,
    alignItems: "center",
  },
  exceptionImage: {
    width: 80,
    height: 80,
  },
  exceptionTitle: {
    fontFamily: "SUITE-Bold",
    fontSize: 22,
    marginVertical: 5,
  },
  exceptionText: {
    fontFamily: "SUITE-Bold",
    fontSize: 16,
    color: "#333",
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  carouselContainer: {
    width: "90%",
    height: "90%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    // paddingHorizontal: 10,
  },
  carouselInner: {
    width: "100%",
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  cardImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    // marginRight: 20,
    // marginBottom: 200,
  },
  cardDetails: {
    alignItems: "center",
    // flex: 1,
    // justifyContent: "center",
    // textAlign: "center",
  },
  cardTitle: {
    fontFamily: "SUITE-Bold",
    fontSize: 15,
    marginBottom: 10,
    color: "#000",
    height: 30,
  },
  progressBarWrapper: {
    position: "relative",
    marginTop: 30,
  },
  flagIcon: {
    position: "absolute",
    top: -30,
    width: 35,
    height: 30,
    resizeMode: "contain",
  },
  progressTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
  },
  startText: {
    fontSize: 13,
    color: "#333",
    fontFamily: "SUITE-Bold",
  },
  endText: {
    fontSize: 13,
    color: "#333",
    fontFamily: "SUITE-Bold",
  },
  benefitsContainer: {
    marginTop: 15,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  benefitTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  benefitIcon: {
    marginRight: 10,
    marginLeft: 5,
  },
  merchantName: {
    fontSize: 16,
    color: "#000",
    fontFamily: "SUITE-Regular",
  },
  discountInfo: {
    fontSize: 16,
    color: "#000",
    fontFamily: "SUITE-Regular",
    textAlign: "right",
    marginRight: 5,
  },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
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
  recommendComment: {
    fontSize: 18,
    color: "#000",
    fontFamily: "SUITE-Bold",
    marginTop: 30,
  },
  cardPerfomanceTitle: {
    fontFamily: "SUITE-Bold",
    fontSize: 12,
    marginBottom: 5,
    color: "#686E74",
  },
  exceedPerformenceTitle: {
    fontFamily: "SUITE-Bold",
    fontSize: 18,
    marginBottom: 5,
    color: "#686E74",
  },
  highlightedText: {
    color: "#5253F0",
    fontFamily: "SUITE-Bold",
  },
});

export default MainCarousel;
