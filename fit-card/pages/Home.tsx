import React, { useState } from "react";
import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import CardUsage from "@/components/main/cardUsage";
import Benefit from "@/components/main/cardBenefit";
import { useSelector } from "react-redux"; // Redux의 useSelector 사용
import { RootState } from "@/store"; // RootState 타입
import { mockCardInfo } from "@/mock/mockUser";
import { dummyBenefit } from "@/mock/mockData";

export default function MainScreen() {
  // Redux 스토어에서 user 정보 가져오기
  const user = useSelector((state: RootState) => state.user.user);
  const [benefitData, setBenefitData] = useState(dummyBenefit);
  const [refreshing, setRefreshing] = useState(false);

  // 새로고침 동작 처리
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      refreshBenefit(); // Trigger the refresh in CardBenefit
      setRefreshing(false);
    }, 1000);
  };

  let previousIndex = benefitData.index;

  // Simulated refresh function that changes the benefit index
  const refreshBenefit = () => {
    let randomIndex = Math.floor(Math.random() * benefitData.category.length);

    while (randomIndex === previousIndex) {
      randomIndex = Math.floor(Math.random() * benefitData.category.length);
    }

    console.log(randomIndex);
    setBenefitData((prevBenefit) => ({
      ...prevBenefit,
      index: randomIndex, // Update index with new random value
    }));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.innerContainer}>
        {user && <CardUsage {...user} {...mockCardInfo} />}
        <Benefit benefit={benefitData} refreshBenefit={refreshBenefit} />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
