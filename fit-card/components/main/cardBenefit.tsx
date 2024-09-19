import React, { useState } from "react";
import ButtonComponent from "@/components/category/ButtonComponent";
import { View, Text, StyleSheet } from "react-native";

type Benefit = {
  index: number;
  category: string[]; // 음식점, 카페, 편의점, 문화, 주유소
  logo: any;
  franchiseName: string;
  info: string[][]; // 각 카테고리별 혜택 리스트
};

const CardBenefit = (benefit: Benefit) => {
  // 활성화된 탭을 관리하는 state
  const [activeTab, setActiveTab] = useState(benefit.index);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.titleText}>이런 혜택은 어떠세요?</Text>

      <View style={styles.tabContainer}>
        {benefit.category.map((category, idx) => (
          <ButtonComponent
            key={idx}
            title={category}
            isSelected={activeTab === idx}
            onPress={() => setActiveTab(idx)}
            customStyle={styles.customButton} // 크기를 줄이는 스타일
            textStyle={styles.customButtonText} // 텍스트 스타일도 전달
          />
        ))}
      </View>

      {/* 선택된 탭에 해당하는 혜택 3개 */}
      <View style={styles.benefitContainer}>
        {benefit.info[activeTab].slice(0, 3).map((item, idx) => (
          <View key={idx} style={styles.benefitItem}>
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    borderRadius: 20,
    width: "100%",
  },
  titleText: {
    marginLeft: 20,
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "SUITE-Bold",
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 17,
  },
  customButton: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 15,
  },
  customButtonText: {
    fontSize: 12,
  },
  benefitContainer: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  benefitItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#ccc",
    width: "100%",
  },
  benefitText: {
    fontSize: 14,
    fontFamily: "SUITE-Bold",
  },
});

export default CardBenefit;
