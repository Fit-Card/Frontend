import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ToggleButton from "@/components/benefit/ToggleButton";
import StoreSearch from "@/components/benefit/store/StoreSearch";
import CardSearch from "@/components/benefit/card/CardSearch";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigationTypes";

// 네비게이션 타입 정의
type SearchScreenNavigationProp = StackNavigationProp<StackParamList, "Search">;

export default function SearchScreen() {
  const [selected, setSelected] = useState("가맹점");
  const navigation = useNavigation<SearchScreenNavigationProp>();

  // 카드사 클릭 시 CardListScreen으로 이동하고 파라미터 전달
  const handleCardPress = (companyId: number, companyName: string) => {
    navigation.navigate("CardList", { companyId, companyName });
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <ToggleButton selected={selected} setSelected={setSelected} />
      </View>

      <View style={styles.contentContainer}>
        {selected === "가맹점" ? (
          <StoreSearch />
        ) : (
          <CardSearch onCardPress={handleCardPress} /> // 카드사 클릭 시 handleCardPress 실행
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  toggleContainer: {
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});
