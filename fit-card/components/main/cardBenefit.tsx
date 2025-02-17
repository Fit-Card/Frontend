import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

type BenefitProps = {
  benefit: {
    index: number;
    category: string[]; // 음식점, 카페, 편의점, 문화, 주유소, 기타
    logo: any;
    franchiseName: string;
    info: string[][]; // 각 카테고리별 혜택 리스트
  };
  refreshBenefit: () => void;
};

const CardBenefit = ({ benefit }: BenefitProps) => {
  // 활성화된 탭을 관리하는 state
  const [activeTab, setActiveTab] = useState(benefit.index);

  useEffect(() => {
    setActiveTab(benefit.index);
  }, [benefit.index]);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.titleText}>이런 혜택은 어떠세요?</Text>

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
