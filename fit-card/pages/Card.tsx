// @/pages/Card.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from "react-native";
import ConsumptionPattern from "@/components/recommend/ConsumptionPattern";
import RecommendedCardCarousel from "@/components/recommend/RecommendedCardCarousel";
import AgeGroupCard from "@/components/recommend/AgeGroupCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { mockConsumptionPattern } from "@/mock/mockData";
import { getAgeSpecificCards, getRecommendCards } from "@/api/members";
import { getPaymentCategory } from "@/api/members";
import { ConsumptionCategory } from "@/interfaces/ConsumptionCategory";
import { RecommendCard } from "@/interfaces/Card";

export default function CardScreen() {
  const user = useSelector((state: RootState) => state.user.user);
  const [consumptionPattern, setConsumptionPattern] = useState<ConsumptionCategory>();
  const [ageSpecificCards, setAgeSpecificCards] = useState<any[]>([]);
  const [recommendCards, setRecommendCards] = useState<RecommendCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentCategory = async () => {
      try {
        const response = await getPaymentCategory();
        setConsumptionPattern(response);
      } catch (error) {
        setConsumptionPattern(mockConsumptionPattern);
      }
    };

    const fetchRecommendCards = async () => {
      try {
        const response = await getRecommendCards();
        setRecommendCards(response.data.memberCardRecommendResponses);
      } catch (error) {
        console.error("Error fetching recommend cards:", error);
      }
    };

    const fetchAgeSpecificCards = async () => {
      try {
        const response = await getAgeSpecificCards(3);
        setAgeSpecificCards(response.data.memberCardGetByAgeSpecificResponses);
        for (
          let index = 0;
          index < response.data.memberCardGetByAgeSpecificResponses.length;
          index++
        ) {
          const element = response.data.memberCardGetByAgeSpecificResponses[index];
          console.log("cardId:", element.cardId);
        }
      } catch (error) {
        console.error("Error fetching age-specific cards:", error);
      }
    };

    const fetchAllData = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchPaymentCategory(), fetchRecommendCards(), fetchAgeSpecificCards()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>데이터를 불러오는 중입니다...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 소비패턴 Component */}
      <View style={styles.componentWrapper}>
        <View style={styles.inner}>
          {consumptionPattern && parseInt(consumptionPattern.totalAmount) > 0 ? (
            <ConsumptionPattern user={user!} consumptionCategory={consumptionPattern} />
          ) : (
            <View style={styles.exceptionContainer}>
              <Text style={styles.exceptionText}>지출내역이 존재하지 않습니다.</Text>
            </View>
          )}
        </View>
      </View>

      {/* 추천 카드 Component */}
      <View style={styles.componentWrapper}>
        <Text style={styles.headText}>{user!.name}님의 카드 vs 추천 카드</Text>
        {recommendCards.length > 0 ? (
          <View style={styles.carouselInner}>
            <RecommendedCardCarousel cards={recommendCards} />
          </View>
        ) : (
          <View style={styles.inner}>
            <View style={styles.exceptionContainer}>
              <Text style={styles.exceptionText}>카드를 등록해주세요.</Text>
            </View>
          </View>
        )}
      </View>

      {/* 연령대의 카드 Component */}
      <View style={styles.componentWrapper}>
        <Text style={styles.headText}>{user!.name}님 나이대에서 많이 사용하는 카드</Text>
        {ageSpecificCards.length > 0 ? (
          ageSpecificCards.map((card) => (
            <View key={card.cardId} style={styles.ageGroup}>
              <AgeGroupCard
                cardId={card.cardId}
                imagePath={{ uri: card.cardImageUrl }}
                cardName={card.cardName}
                benefits={[`${card.cardCompanyName} 카드`]}
              />
            </View>
          ))
        ) : (
          <View style={styles.inner}>
            <Text style={styles.exceptionText}>카드를 등록해주세요.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  exceptionContainer: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  exceptionText: {
    fontFamily: "SUITE-Bold",
    marginBottom: 10,
    fontSize: 18,
  },
  container: {
    flexGrow: 1,
    // justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F7F7F7", // 배경색 설정
    // padding: 20,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  componentWrapper: {
    width: "100%", // 각 컴포넌트를 감싸는 View의 너비를 전체로 설정
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  inner: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingBottom: 15,
    borderRadius: 10,
    marginBottom: 10,
    minHeight: 150,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#e1e1e1",
  },
  carouselInner: {
    width: "90%", // 상자의 너비 (화면의 90%)
    backgroundColor: "#FFFFFF", // 상자의 배경색
    padding: 20, // 상자 내부 여백
    paddingBottom: 15,
    borderRadius: 10, // 상자 모서리 둥글게
    marginBottom: 10, // 컴포넌트 간의 간격
    alignContent: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2.5,
    borderColor: "#e1e1e1",
  },
  headText: {
    fontFamily: "SUITE-Bold",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: "5%",
    fontSize: 18,
  },
  ageGroup: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    minHeight: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 2.5,
    borderColor: "#e1e1e1",
  },
});
