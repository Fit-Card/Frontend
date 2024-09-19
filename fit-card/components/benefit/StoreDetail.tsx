import React from "react";
import { View, Text, Image, StyleSheet, Switch } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackParamList } from "@/navigationTypes";

type StoreDetailRouteProp = RouteProp<StackParamList, "StoreDetail">;

export default function StoreDetail() {
  const route = useRoute<StoreDetailRouteProp>();
  const { storeName, storeImage } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={storeImage} style={styles.theaterImage} />
        <View style={styles.textContainer}>
          <Text style={styles.theaterName}>{storeName}</Text>
          <Text style={styles.description}>여기구 저기구 설명 설명</Text>
          {/* 스위치가 설명 옆에 위치하도록 배치 */}
          <View style={styles.switchInlineContainer}>
            <Text style={styles.switchLabel}>내 카드만 보기</Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>
        </View>
      </View>
    </View>
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
    backgroundColor: "#EDEDED",
  },
  theaterImage: {
    width: 70,
    height: 70,
    marginRight: 25,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
  },
  theaterName: {
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
});
