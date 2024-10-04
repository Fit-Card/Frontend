// @/pages/Card.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import ConsumptionPattern from "@/components/recommend/ConsumptionPattern";
import RecommendedCardCarousel from "@/components/recommend/RecommendedCardCarousel";
import AgeGroupCard from "@/components/recommend/AgeGroupCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { recommendedCards } from "@/mock/mockData";
import { getAgeSpecificCards } from "@/api/members";

export default function CardScreen() {
  const user = useSelector((state: RootState) => state.user.user);
  const [ageSpecificCards, setAgeSpecificCards] = useState<any[]>([]); // 연령대별 카드 상태

  // API 호출 및 데이터 설정
  useEffect(() => {
    const fetchAgeSpecificCards = async () => {
      try {
        const response = await getAgeSpecificCards(1); // size 1로 API 호출
        console.log(response.data.memberCardGetByAgeSpecificResponses);
        setAgeSpecificCards(response.data.memberCardGetByAgeSpecificResponses);
      } catch (error) {
        console.error("Error fetching age-specific cards:", error);
      }
    };

    fetchAgeSpecificCards();
  }, []);

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
        <Text style={styles.headText}>{user!.name}님의 카드 vs 추천 카드</Text>
        <View style={styles.carouselInner}>
          <RecommendedCardCarousel cards={recommendedCards} />
        </View>
      </View>

      {/* 연령대의 카드 Component */}
      <View style={styles.componentWrapper}>
        <Text style={styles.headText}>{user!.name}님 나이대에서 많이 사용하는 카드</Text>
        {ageSpecificCards.length > 0 ? (
          ageSpecificCards.map((card) => (
            <View key={card.cardId} style={styles.ageGroup}>
              <AgeGroupCard
                imagePath={{ uri: card.cardImageUrl }} // cardImageUrl을 이미지 경로로 설정
                cardName={card.cardName} // cardName 설정
                benefits={[`${card.cardCompanyName} 카드`, "연령대별 인기 카드"]}
              />
            </View>
          ))
        ) : (
          <View style={styles.inner}>
            <Text>연령대별 카드를 불러오는 중입니다...</Text>
          </View>
        )}
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
