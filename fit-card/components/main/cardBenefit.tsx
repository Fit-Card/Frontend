import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

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

      {/* 카테고리 탭 */}
      <ScrollView horizontal style={styles.tabContainer}>
        {benefit.category.map((cat, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveTab(index)}
            style={[
              styles.tabButton,
              { backgroundColor: activeTab === index ? "#5253F0" : "gray" },
            ]}
          >
            <Text style={styles.tabButtonText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
    alignItems: "flex-start",
    padding: 30,
    // backgroundColor: "#ffffff",
    borderRadius: 20,
    width: "100%",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "SUITE-Bold", // Font 적용
  },
  tabContainer: {
    marginVertical: 10,
  },
  tabButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  tabButtonText: {
    color: "white",
    fontFamily: "SUITE-Bold", // Font 적용
  },
  benefitContainer: {
    marginTop: 20,
  },
  benefitItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  benefitText: {
    fontSize: 14,
    fontFamily: "SUITE-Bold", // Font 적용
  },
});

export default CardBenefit;
