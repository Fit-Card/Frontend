import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as Progress from "react-native-progress"; // ProgressBar 라이브러리

type User = {
  name: string;
  cardImage: any;
  cardName: string;
  currentUsage: number;
  goalUsage: number;
};

const CardUsage = (user: User) => {
  const [containerWidth, setContainerWidth] = useState(0);

  // 실적 퍼센티지 계산
  const usagePercentage = user.currentUsage / user.goalUsage;
  const filledWidth = usagePercentage * containerWidth;

  const onLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const getTextPosition = () => {
    const textWidth = 50; // Assuming the width of the currentUsageText is about 50px
    const adjustedLeft = Math.max(0, filledWidth - textWidth / 2); // Ensure it doesn't go beyond the left edge
    return Math.min(adjustedLeft, containerWidth - textWidth); // Ensure it doesn't go beyond the right edge
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={{ marginBottom: 10 }}>
        <Text style={styles.userName}>{user.name + " "}</Text>
        님의 카드 실적 현황
      </Text>

      <View style={styles.cardInfo}>
        <Image source={user.cardImage} style={styles.cardImage} />
        <Text style={styles.cardName}>{user.cardName}</Text>
      </View>

      <View style={styles.usageContainer} onLayout={onLayout}>
        {/* Progress Bar */}
        <View style={{ position: "relative", width: containerWidth }}>
          <Progress.Bar
            progress={usagePercentage}
            width={containerWidth} // 원하는 너비로 설정
            height={10}
            color={"#5253F0"} // Progress Bar 색상 설정
            unfilledColor={"#ccc"}
            borderWidth={0}
          />
          <Text
            style={[
              styles.currentUsageText,
              {
                left: getTextPosition(), // Ensure the text doesn't exceed the bar edges
              },
            ]}
          >
            {user.currentUsage}원
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "flex-start",
    padding: 30,
    // backgroundColor: "#fff",
    width: "100%",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "SUITE-Bold", // Font 적용
  },
  cardInfo: {
    flexDirection: "row",
  },
  cardImage: {
    width: 100,
    height: 60,
    marginBottom: 10,
    resizeMode: "contain",
  },
  cardName: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 20,
    fontFamily: "SUITE-Bold", // Font 적용
  },
  usageContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  currentUsageText: {
    position: "absolute",
    top: -20, // Position it above the progress bar
    fontSize: 12,
    fontFamily: "SUITE-Bold",
    color: "#5253F0", // Text color matching progress bar color
  },
});

export default CardUsage;
