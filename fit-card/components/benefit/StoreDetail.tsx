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
        </View>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>내 카드만 보기</Text>
        <Switch value={false} onValueChange={() => {}} />
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
    backgroundColor: "#F9F9F9",
  },
  theaterImage: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  theaterName: {
    fontSize: 18,
    fontFamily: "SUITE-Bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    fontFamily: "SUITE-Regular",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 14,
    fontFamily: "SUITE-Bold",
    marginRight: 10,
  },
});
