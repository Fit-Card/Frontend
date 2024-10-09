import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MainCarousel from "@/components/main/MainCarousel";
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
      } catch (error) {
        console.error("Error fetching card data", error);
        setLoading(true);
      }
    };

    setLoading(true);
    fetchCardData();
    setLoading(false);
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
    height: 700,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 10,
    paddingHorizontal: 20,
  },
  innerContainer: {
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
    width: "100%",
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
