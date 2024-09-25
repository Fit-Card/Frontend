import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import ConsumptionPattern from "@/components/recommend/ConsumptionPattern";
import RecommendedCardCarousel from "@/components/recommend/RecommendedCardCarousel";
import AgeGroupCard from "@/components/recommend/AgeGroupCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { recommendedCards } from "@/mock/mockData";

export default function CardScreen() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 소비패턴 Component */}
      <View style={styles.componentWrapper}>
        <View style={styles.inner}>
          <ConsumptionPattern user={user!} />
        </View>
      </View>

      {/* 추천 카드 Component */}
      <View style={styles.componentWrapper}>
        <Text style={styles.headText}>{user!.name}님의 카드 vs AI 추천 카드</Text>
        <View style={styles.carouselInner}>
          <RecommendedCardCarousel cards={recommendedCards} />
        </View>
      </View>

      {/* 연령대의 카드 Component */}
      <View style={styles.componentWrapper}>
        <Text style={styles.headText}>{user!.name}님 나이대에서 많이 사용하는 카드</Text>
        <View style={styles.ageGroup}>
          <AgeGroupCard
            imagePath={require("@/assets/images/temp-card-2.png")}
            cardName="카드이름 들어가주세요 1"
            benefits={["10% 할인", "적립 혜택"]}
          />
        </View>
      </View>
      <View style={styles.componentWrapper}>
        <View style={styles.ageGroup}>
          <AgeGroupCard
            imagePath={require("@/assets/images/temp-card-3.png")}
            cardName="카드이름 들어가주세요 2"
            benefits={["무료 배송", "포인트 적립"]}
          />
        </View>
      </View>
      <View style={styles.componentWrapper}>
        <View style={styles.ageGroup}>
          <AgeGroupCard
            imagePath={require("@/assets/images/temp-card-4.png")}
            cardName="카드이름 들어가주세요 3"
            benefits={["캐시백 혜택", "쇼핑 할인"]}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F7F7F7", // 배경색 설정
    padding: 20, // 여백 설정
  },
  componentWrapper: {
    width: "100%", // 각 컴포넌트를 감싸는 View의 너비를 전체로 설정
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  inner: {
    width: "90%", // 상자의 너비 (화면의 90%)
    backgroundColor: "#FFFFFF", // 상자의 배경색
    padding: 20, // 상자 내부 여백
    paddingBottom: 15,
    borderRadius: 10, // 상자 모서리 둥글게
    shadowColor: "#000", // 그림자 효과
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.1, // 그림자 불투명도
    shadowRadius: 4, // 그림자 반경
    elevation: 3, // 안드로이드 그림자 효과
    marginBottom: 10, // 컴포넌트 간의 간격
    minHeight: 150, // 각 컴포넌트 상자의 최소 높이
    justifyContent: "center", // 상자 내부의 컴포넌트 세로 정렬
    alignItems: "center",
  },
  carouselInner: {
    width: "90%", // 상자의 너비 (화면의 90%)
    backgroundColor: "#FFFFFF", // 상자의 배경색
    padding: 20, // 상자 내부 여백
    paddingBottom: 15,
    borderRadius: 10, // 상자 모서리 둥글게
    shadowColor: "#000", // 그림자 효과
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.1, // 그림자 불투명도
    shadowRadius: 4, // 그림자 반경
    elevation: 3, // 안드로이드 그림자 효과
    marginBottom: 10, // 컴포넌트 간의 간격
    alignContent: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  headText: {
    fontFamily: "SUITE-Bold",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  ageGroup: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    minHeight: 80,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // 그림자 효과
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.1, // 그림자 불투명도
    shadowRadius: 4, // 그림자 반경
    elevation: 3, // 안드로이드 그림자 효과
  },
});
