// @/components/main/RandomBenefit.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";

interface RandomBenefitProps {
  cardId: number;
}

const RandomBenefit = ({ cardId }: RandomBenefitProps) => {
  const [benefits, setBenefits] = useState<string[]>([]);

  //   const fetchRandomBenefits = async () => {
  //     try {
  //       const response = await axios.get("http://j11a405.p.ssafy.io:8081/cards/benefits/random");
  //       const randomBenefits = response.data; // 서버에서 응답 받은 랜덤 혜택들
  //       setBenefits(randomBenefits.slice(0, 3)); // 혜택 3가지만 표시
  //     } catch (error) {
  //       console.error("Failed to fetch random benefits", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchRandomBenefits(); // 컴포넌트 마운트 시 요청
  //   }, []);

  return (
    <View style={styles.benefitContainer}>
      <Text style={styles.cardName}>cardId: {cardId}</Text>
      <Text style={styles.benefitTitle}>랜덤 혜택:</Text>
      {benefits.map((benefit, index) => (
        <Text key={index} style={styles.benefitText}>
          {benefit}
        </Text>
      ))}
      {/* 새로고침 버튼 */}
      {/* <Button title="새로고침" onPress={fetchRandomBenefits} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  benefitContainer: {
    marginTop: 20,
    padding: 10,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  benefitTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  benefitText: {
    fontSize: 14,
    marginBottom: 3,
  },
});

export default RandomBenefit;
