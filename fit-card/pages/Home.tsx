import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import CardUsage from "@/components/main/cardUsage";
import Benefit from "@/components/main/cardBenefit";
import { useSelector } from "react-redux"; // Redux의 useSelector 사용
import { RootState } from "@/store"; // RootState 타입
import { recommendedCards } from "@/mock/mockData";
import { mockCardInfo } from "@/mock/mockUser";
import { dummyBenefit } from "@/mock/mockData";
import MainCarousel from "@/components/main/MainCarousel";
import { mainCards } from "@/mock/mockData";
import axios from "axios";
import { mockUser } from "@/mock/mockUser";

export default function MainScreen() {
  const user = useSelector((state: RootState) => state.user.user);
  const [cardData, setCardData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.post(
          "http://j11a405.p.ssafy.io:8081/members/cards/get/performance-and-benefit/3",
          {},
          {
            headers: {
              Authorization: `Bearer ${mockUser.token}`, // Replace with your actual token
              accept: "*/*",
            },
          }
        );
        const data = response.data.data.memberCardPerformanceAndBenefitResponse;
        setCardData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching card data", error);
        setLoading(false); // Disable loading even if there's an error
      }
    };

    fetchCardData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.title}>
          <Text style={styles.userName}>
            {user!.name} <Text style={styles.context}>님의 카드 실적 현황</Text>
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#5253F0" />
        ) : (
          <MainCarousel cards={cardData} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 10,
    paddingHorizontal: 20,
  },
  innerContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
    width: "100%",
    paddingBottom: 30,
    borderWidth: 2.5,
    borderColor: "#e1e1e1",
  },
  title: {
    width: "100%",
    justifyContent: "flex-start",
    paddingLeft: 20,
    paddingTop: 20,
  },
  userName: {
    fontSize: 20,
    fontFamily: "SUITE-Bold",
    color: "#5253F0",
  },
  context: {
    fontSize: 16,
    fontFamily: "SUITE-Bold",
    color: "#000",
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
