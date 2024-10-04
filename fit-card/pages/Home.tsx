import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import CardUsage from "@/components/main/cardUsage";
import Benefit from "@/components/main/cardBenefit";
import { useSelector } from "react-redux"; // Redux의 useSelector 사용
import { RootState } from "@/store"; // RootState 타입
import { recommendedCards } from "@/mock/mockData";
import { mockCardInfo } from "@/mock/mockUser";
import { dummyBenefit } from "@/mock/mockData";
import MainCarousel from "@/components/main/MainCarousel";
import { mainCards } from "@/mock/mockData";

export default function MainScreen() {
  // Redux 스토어에서 user 정보 가져오기
  const user = useSelector((state: RootState) => state.user.user);
  // const accessToken = useSelector((state: RootState) => state.user.accessToken);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.title}>
          {/* {user && (
          )} */}
          <Text style={styles.userName}>
            {user!.name} <Text style={styles.context}>님의 카드 실적 현황</Text>
          </Text>
        </View>

        <MainCarousel cards={mainCards} />
        {/* {user && <CardUsage {...user} {...mockCardInfo} />} */}
        {/* <Benefit benefit={benefitData} refreshBenefit={refreshBenefit} /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#EDEDED",
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
  },
  title: {
    // fontSize: 24,
    // fontWeight: "bold",
    // marginBottom: 20,
    width: "100%",
    justifyContent: "flex-start",
    padding: 20,
  },
  userName: {
    fontSize: 20,
    // marginBottom: 10,
    fontFamily: "SUITE-Bold", // Font 적용
  },
  context: {
    fontSize: 16,
    fontFamily: "SUITE-Regular",
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
