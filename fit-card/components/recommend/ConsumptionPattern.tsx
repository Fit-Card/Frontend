// @/components/recommend/ConsumptionPattern.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "@/interfaces/User";
import { ConsumptionCategory } from "@/interfaces/ConsumptionCategory";

interface consumptionPatternProps {
  user: User;
  consumptionCategory: ConsumptionCategory;
}

function ConsumptionPattern({ user, consumptionCategory }: consumptionPatternProps) {
  // 각 카테고리별 비율 (식비, 교통, 쇼핑, 기타)
  const totalAmount = parseFloat(consumptionCategory.totalAmount);

  const expenseData = [
    {
      label: "음식점",
      percentage: (parseFloat(consumptionCategory.restaurant) / totalAmount).toFixed(2),
      color: "#7292FF",
    },
    {
      label: "카페",
      percentage: (parseFloat(consumptionCategory.cafe) / totalAmount).toFixed(2),
      color: "#FAE9BD",
    },
    {
      label: "편의점",
      percentage: (parseFloat(consumptionCategory.convenienceStores) / totalAmount).toFixed(2),
      color: "#FF8F68",
    },
    {
      label: "영화",
      percentage: (parseFloat(consumptionCategory.culture) / totalAmount).toFixed(2),
      color: "#FF6B6B",
    },
    {
      label: "주유",
      percentage: (parseFloat(consumptionCategory.gasStations) / totalAmount).toFixed(2),
      color: "#FFB74D",
    },
    {
      label: "기타",
      percentage: (parseFloat(consumptionCategory.other) / totalAmount).toFixed(2),
      color: "#D9D9D9",
    },
  ];

  const leftLabels = expenseData.slice(0, 3);
  const rightLabels = expenseData.slice(3, 6);

  return (
    <View>
      {/* 사용자 이름과 소비 패턴 텍스트 표시 */}
      <Text style={styles.textContainer}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={{ fontFamily: "SUITE-Bold" }}>님의 소비 패턴{"\n"}</Text>
        <Text style={styles.smallText}>전체 합산 지출 내역입니다.</Text>
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
                width: `${parseFloat(item.percentage) * 100}%`,
                backgroundColor: item.color,
              },
            ]}
          />
        ))}
      </View>

      {/* 라벨 표시 - 왼쪽과 오른쪽 3개씩 나누어서 표시 */}
      <View style={styles.labelWrapper}>
        <View style={styles.labelContainer}>
          <View style={styles.labelInnerContainer}>
            {leftLabels.map((item, index) => (
              <View key={index} style={styles.labelItem}>
                <View style={[styles.labelColorBox, { backgroundColor: item.color }]} />
                <Text style={styles.labelText}>
                  {item.label}
                  <Text style={styles.percentageText}>
                    {" "}
                    {Math.round(parseFloat(item.percentage) * 100)}%
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.labelContainer}>
          <View style={styles.labelInnerContainer}>
            {rightLabels.map((item, index) => (
              <View key={index} style={styles.labelItem}>
                <View style={[styles.labelColorBox, { backgroundColor: item.color }]} />
                <Text style={styles.labelText}>
                  {item.label}
                  <Text style={styles.percentageText}>
                    {" "}
                    {Math.round(parseFloat(item.percentage) * 100)}%
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

export default ConsumptionPattern;

const styles = StyleSheet.create({
  // container: {},
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
  smallText: {
    fontFamily: "SUITE-Bold",
    color: "#555",
    fontSize: 10,
  },
  headerText: {
    fontFamily: "SUITE-Bold", // 폰트 적용
    fontSize: 16,
    marginVertical: 7, // marginBottom 적용
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
  labelWrapper: {
    flexDirection: "row",
    marginTop: 15,
  },
  labelContainer: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    // paddingLeft: 20,
  },
  labelInnerContainer: {
    flexDirection: "column",
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
