// @/components/recommend/ConsumptionPattern.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "@/interfaces/User";

function ConsumptionPattern({ user }: { user: User }) {
  // 각 카테고리별 비율 (식비, 교통, 쇼핑, 기타)
  const expenseData = [
    { label: "식비", percentage: 0.46, color: "#7292FF" }, // 40%
    { label: "카페", percentage: 0.14, color: "#FAE9BD" }, // 30%
    { label: "쇼핑", percentage: 0.3, color: "#FF8F68" }, // 20%
    { label: "기타", percentage: 0.1, color: "#D9D9D9" }, // 10% 기타 항목
  ];

  return (
    <View style={styles.container}>
      {/* 사용자 이름과 소비 패턴 텍스트 표시 */}
      <Text style={styles.textContainer}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={{ fontFamily: "SUITE-Bold" }}>님의 소비 패턴</Text>
      </Text>

      <Text style={styles.headerText}>9월 지출 내역</Text>

      <View style={styles.barContainer}>
        {/* 하나의 막대 안에 각 카테고리를 겹쳐서 표시 */}
        {expenseData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.progressBar,
              {
                width: `${item.percentage * 100}%`,
                backgroundColor: item.color,
                // borderTopLeftRadius: index === 0 ? 10 : 0,
                // borderBottomLeftRadius: index === 0 ? 10 : 0,
                // borderTopRightRadius: index === expenseData.length - 1 ? 0 : 10,
                // borderBottomRightRadius:
                //   index === expenseData.length - 1 ? 0 : 10,
              },
            ]}
          />
        ))}
      </View>

      {/* 라벨 표시 */}
      <View style={styles.labelContainer}>
        {expenseData.map((item, index) => (
          <View key={index} style={styles.labelItem}>
            <View
              style={[styles.labelColorBox, { backgroundColor: item.color }]}
            />
            <Text style={styles.labelText}>
              {item.label}
              <Text style={styles.percentageText}>
                {" "}
                {Math.round(item.percentage * 100)}%
              </Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default ConsumptionPattern;

const styles = StyleSheet.create({
  container: {},
  textContainer: {
    fontSize: 16,
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontFamily: "SUITE-Bold",
    marginBottom: 20,
    color: "#5253F0",
  },
  headerText: {
    fontFamily: "SUITE-Bold", // 폰트 적용
    fontSize: 14,
    marginBottom: 5, // marginBottom 적용
  },
  barContainer: {
    flexDirection: "row",
    height: 20,
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
  labelContainer: {
    flexDirection: "column",
    marginTop: 15,
    justifyContent: "flex-start",
  },
  labelItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  labelColorBox: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  labelText: {
    fontSize: 12,
    fontFamily: "SUITE-Bold",
  },
  percentageText: {
    marginLeft: 5, // 라벨 텍스트와 퍼센트 사이의 간격
  },
});
