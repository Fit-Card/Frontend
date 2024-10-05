import React, { useState, useEffect } from "react";
import { View, Text, Switch, ScrollView, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackParamList } from "@/navigationTypes";
import BankCardList from "@/components/benefit/store/BankCardList";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { categoriesWithIcons } from "@/components/map/LocationType";

type StoreDetailRouteProp = RouteProp<StackParamList, "StoreDetail">;

interface BankCard {
  cardCompanyId: number;
  bankName: string;
  bankImgUrl: string;
  count: number;
}

export default function StoreDetail() {
  const route = useRoute<StoreDetailRouteProp>();
  const { storeName, storeId, storeCategory } = route.params;

  const [isMine, setIsMine] = useState(false);
  const [bankCards, setBankCards] = useState<BankCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBankCards = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://j11a405.p.ssafy.io:8081/merchant/card/info/get/banks",
        {
          merchantId: storeId,
          isMine: isMine ? 1 : 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwibWVtYmVySWQiOiIzIiwiaWF0IjoxNzI3MzM1MTgyLCJleHAiOjE3MzczMzg3ODJ9.DQCrqiRDmF5qtBdadizEIxOgF0Bz_Om9-u3l0vJC1UI`,
          },
        }
      );
      console.log(response.data);

      if (response.data.data.merchantCardCardCompanyResponses) {
        setBankCards(response.data.data.merchantCardCardCompanyResponses);
      } else {
        setBankCards([]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch bank card data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankCards();
  }, [isMine]);

  const categoryIcon = categoriesWithIcons.find((cat) => cat.name === storeCategory)?.icon;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <View style={styles.storeTitleContainer}>
            {categoryIcon && (
              <Ionicons name={categoryIcon} size={24} color="#5250F0" style={styles.icon} />
            )}
            <Text style={styles.storeName} numberOfLines={1} ellipsizeMode="tail">
              {storeName}
            </Text>
          </View>
          <View style={styles.switchInlineContainer}>
            <Text style={styles.switchLabel}>내 카드만 보기</Text>
            <Switch
              value={isMine}
              onValueChange={setIsMine}
              thumbColor={isMine ? "#f4f3f4" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#5253F0" }}
            />
          </View>
        </View>
      </View>

      <View style={styles.BankCardContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#5250F0" />
        ) : (
          <BankCardList bankCards={bankCards} />
        )}
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
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  storeTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontFamily: "SUITE-Bold",
    marginLeft: 5,
    flex: 1,
    flexShrink: 1,
  },
  icon: {
    marginRight: 8,
  },
  switchInlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexShrink: 0,
  },
  switchLabel: {
    fontSize: 13,
    fontFamily: "SUITE-Bold",
  },
  BankCardContainer: {
    marginBottom: 50,
  },
});
