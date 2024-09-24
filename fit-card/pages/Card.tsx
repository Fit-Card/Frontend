import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import ConsumptionPattern from "@/components/recommend/ConsumptionPattern";
import RecommendedCard from "@/components/recommend/RecommendedCard";
import AgeGroupCard from "@/components/recommend/AgeGroupCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function CardScreen() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 소비패턴 Component */}
      <View style={styles.inner}>
        <ConsumptionPattern user={user!} />
      </View>

      {/* 추천 카드 Component */}
      <View style={styles.componentWrapper}>
        <Text style={styles.headText}>{user!.name}님 소피 패턴에 맞춘 카드를 추천해드릴게요.</Text>
        <View style={styles.inner}>
          <RecommendedCard />
        </View>
      </View>

      {/* 연령대의 카드 Component */}
      <View style={styles.componentWrapper}>
        <Text style={styles.headText}>{user!.name}님 나이대에서 많이 사용하는 카드</Text>
        <View style={styles.inner}>
          <AgeGroupCard />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7", // 배경색 설정
    padding: 20, // 여백 설정
  },
  componentWrapper: {
    width: "100%", // 각 컴포넌트를 감싸는 View의 너비를 전체로 설정
    alignItems: "center", // 컴포넌트 중앙 정렬
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
    marginBottom: 20, // 컴포넌트 간의 간격
    minHeight: 150, // 각 컴포넌트 상자의 최소 높이
    justifyContent: "center", // 상자 내부의 컴포넌트 세로 정렬
    alignItems: "center", // 상자 내부의 컴포넌트 가로 정렬
  },
  headText: {
    fontFamily: "SUITE-Bold",
    marginBottom: 10,
    alignSelf: "flex-start", // 텍스트 왼쪽 정렬
    marginLeft: "5%",
  },
});
