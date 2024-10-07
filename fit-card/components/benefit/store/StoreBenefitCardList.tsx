import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { StackParamList } from "@/navigationTypes";

type CardListNavigationProp = StackNavigationProp<StackParamList, "CardDetail">;

interface CardBenefit {
  cardVersionId: number;
  cardName: string;
  cardImg: string;
  benefitDescription: string;
}

const StoreBenefitCardList = () => {
  const route = useRoute<RouteProp<StackParamList, "StoreBenefitCardList">>();
  const { companyName, companyId, storeId, isMine } = route.params;
  const navigation = useNavigation<CardListNavigationProp>();

  const [loading, setLoading] = useState<boolean>(false);
  const [cardBenefits, setCardBenefits] = useState<CardBenefit[]>([]);
  const [imageOrientation, setImageOrientation] = useState<{ [key: number]: boolean }>({});

  const fetchCardBenefits = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://j11a405.p.ssafy.io:8081/merchant/card/info/get/benefits",
        {
          merchantId: storeId,
          cardCompanyId: companyId,
          isMine: isMine ? 1 : 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwibWVtYmVySWQiOiIzIiwiaWF0IjoxNzI3MzM1MTgyLCJleHAiOjE3MzczMzg3ODJ9.DQCrqiRDmF5qtBdadizEIxOgF0Bz_Om9-u3l0vJC1UI`,
          },
        }
      );

      if (response.data && response.data.data && response.data.data.merchantCardBenefitResponse) {
        setCardBenefits(response.data.data.merchantCardBenefitResponse);
      } else {
        setCardBenefits([]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch card benefits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardBenefits();
  }, [isMine]);

  const handleCardPress = (cardVersionId: number) => {
    navigation.navigate("CardDetail", { cardId: cardVersionId });
  };

  const handleImageLoad = (id: number, event: any) => {
    const { width, height } = event.nativeEvent.source;
    setImageOrientation((prev) => ({
      ...prev,
      [id]: height > width,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{companyName}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#5250F0" />
      ) : (
        <FlatList
          data={cardBenefits}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCardPress(item.cardVersionId)}>
              <View style={styles.cardContainer}>
                <Image
                  source={{ uri: item.cardImg }}
                  style={[
                    styles.cardImage,
                    imageOrientation[item.cardVersionId] && { transform: [{ rotate: "-90deg" }] },
                  ]}
                  onLoad={(event) => handleImageLoad(item.cardVersionId, event)}
                  resizeMode="contain"
                />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{item.cardName}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.benefitDescription}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.cardVersionId.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "SUITE-Bold",
    marginLeft: 16,
    marginBottom: 15,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#e6e6e6",
  },
  cardImage: {
    width: 70,
    height: 70,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 14,
    color: "#333",
    fontFamily: "SUITE-Bold",
  },
  badge: {
    backgroundColor: "#EFF3FF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    color: "#4176FF",
    fontFamily: "SUITE-Bold",
  },
});

export default StoreBenefitCardList;
