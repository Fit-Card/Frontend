import React from "react";
import { View, Text, Image, StyleSheet, Switch, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackParamList } from "@/navigationTypes";
import CardCarousel from "./CardCarousel";
import BankCardList from "@/components/benefit/store/BankCardList";

type StoreDetailRouteProp = RouteProp<StackParamList, "StoreDetail">;

const cardData = [
  {
    id: 1,
    name: "신한카드 Mr.Life",
    discount: "영화 10% 할인",
    details: "공과금 10% 할인\n마트, 편의점 10% 할인\n식음료 10% 할인",
    image: require("@/assets/images/temp-card.png"),
  },
  {
    id: 2,
    name: "신한카드 Love",
    discount: "영화 8% 할인",
    details: "온라인 쇼핑 5% 할인\n카페 10% 할인",
    image: require("@/assets/images/temp-card.png"),
  },
  {
    id: 3,
    name: "삼성카드 어쩌구",
    discount: "영화 7% 할인",
    details: "마트 5% 할인\n편의점 3% 할인",
    image: require("@/assets/images/temp-card.png"),
  },
];

export default function StoreDetail() {
  const route = useRoute<StoreDetailRouteProp>();
  const { storeName, storeImage } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={storeImage} style={styles.storeImage} />
        <View style={styles.textContainer}>
          <Text style={styles.storeName}>{storeName}</Text>
          <Text style={styles.description}>여기구 저기구 설명 설명</Text>
          <View style={styles.switchInlineContainer}>
            <Text style={styles.switchLabel}>내 카드만 보기</Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>
        </View>
      </View>

      {/* 캐로셀 컴포넌트 추가 */}
      <View style={styles.BankCardContainer}>
        <BankCardList />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 2.5,
    borderColor: "#5253F0",
  },
  storeImage: {
    width: 70,
    height: 70,
    marginRight: 25,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontFamily: "SUITE-Bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: "#666",
    fontFamily: "SUITE-Regular",
    marginBottom: 5,
  },
  switchInlineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 14,
    fontFamily: "SUITE-Bold",
    marginRight: 10,
  },
  BankCardContainer: {
    marginBottom: 50,
  },
});
