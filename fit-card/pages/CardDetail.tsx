import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { mockUser } from "@/mock/mockUser";
import { StackParamList } from "@/navigationTypes";

type CardDetailRouteProp = RouteProp<StackParamList, "CardDetail">;

const CardDetailScreen = () => {
  const route = useRoute<CardDetailRouteProp>();
  const { cardId } = route.params;

  const [cardData, setCardData] = useState<any>(null);
  const [cardDetailData, setCardDetailData] = useState<any[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [cardName, setCardName] = useState<string | null>(null);
  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(0); // 선택된 버튼의 인덱스를 관리하는 상태
  const [imageOrientation, setImageOrientation] = useState<boolean>(false);

  const categoriesWithIcons: Array<{
    name: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
  }> = [
    { name: "FD6", title: "음식점", icon: "restaurant-outline" },
    { name: "CE7", title: "카페", icon: "cafe-outline" },
    { name: "CS2", title: "편의점", icon: "cart-outline" },
    { name: "CT1", title: "문화시설", icon: "film-outline" },
    { name: "OL7", title: "주유소", icon: "car-outline" },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://j11a405.p.ssafy.io:8081/cards/performance/get",
        cardId,
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      setCardData(response.data);
    } catch (error) {
      console.error("Error fetching card data: ", error);
    }
  };

  const fetchDetailData = async (level: number) => {
    try {
      const response = await axios.post(
        "http://j11a405.p.ssafy.io:8081/cards/benefits/get",
        {
          cardId: cardId,
          level: level,
        },
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      setCardDetailData(response.data.data.categories);
      setCardName(response.data.data.cardName);
      setCardImageUrl(response.data.data.cardImage);
    } catch (error) {
      console.error("Error fetching card details: ", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchData();
      await fetchDetailData(selectedButtonIndex + 1);
      setLoading(false);
    };
    fetchAllData();
  }, [selectedButtonIndex]);

  const handleImageLoad = (event: any) => {
    const { width, height } = event.nativeEvent.source;
    // 이미지가 세로로 더 길 경우 회전 여부 설정
    setImageOrientation(height > width);
  };

  const toggleCategory = (index: number) => {
    if (expandedCategories.includes(index)) {
      setExpandedCategories(expandedCategories.filter((i) => i !== index));
    } else {
      setExpandedCategories([...expandedCategories, index]);
    }
  };

  const getCategoryIcon = (name: string) => {
    const category = categoriesWithIcons.find((cat) => cat.name === name);
    return category ? category.icon : "folder-outline";
  };

  const getCategoryTitle = (name: string) => {
    const category = categoriesWithIcons.find((cat) => cat.name === name);
    return category ? category.title : "기타";
  };

  const renderButtons = () => {
    if (!cardData || !cardData.data) {
      return null;
    }

    return cardData.data.map((item: any, index: number) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.button,
          selectedButtonIndex === index ? styles.selectedButton : styles.unselectedButton,
        ]}
        onPress={() => setSelectedButtonIndex(index)}
      >
        <Text style={styles.buttonText}>{index + 1}</Text>
      </TouchableOpacity>
    ));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5253F0" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {cardImageUrl ? (
        <Image
          source={{ uri: cardImageUrl }}
          style={[
            imageOrientation
              ? styles.cardImageRotated // 세로로 긴 이미지일 때 회전된 크기 적용
              : styles.cardImage, // 기본 크기 적용
          ]}
          onLoad={handleImageLoad}
          resizeMode="contain"
        />
      ) : (
        <Image source={require("@/assets/images/temp-card.png")} style={styles.cardImage} />
      )}

      <Text style={styles.cardName}>{cardName || "Loading card name..."}</Text>

      <View style={styles.buttonContainer}>{renderButtons()}</View>

      <View>
        <Text style={styles.partText}>
          {cardData && cardData.data
            ? `이용 금액 : ${cardData.data[selectedButtonIndex].amount.toLocaleString()}원 이상`
            : "No amount available"}
        </Text>
        <Text style={styles.partText}>
          {cardData && cardData.data
            ? `할인 한도 : 월 ${cardData.data[selectedButtonIndex].benefitLimit.toLocaleString()}원`
            : "No amount available"}
        </Text>
      </View>

      <View style={styles.accordionContainer}>
        {cardDetailData.map((category: any, index: number) => (
          <View key={index} style={styles.accordionItem}>
            <TouchableOpacity onPress={() => toggleCategory(index)} style={styles.accordionHeader}>
              <View style={styles.categoryIconContainer}>
                <Ionicons
                  name={getCategoryIcon(category.name)}
                  size={20}
                  color="#5253F0"
                  style={styles.icon}
                />
                <Text style={styles.categoryTitle}>{getCategoryTitle(category.name)}</Text>
              </View>
              <Ionicons
                name={
                  expandedCategories.includes(index) ? "chevron-up-outline" : "chevron-down-outline"
                }
                size={24}
                color="#333"
              />
            </TouchableOpacity>

            {expandedCategories.includes(index) && (
              <View style={styles.accordionContent}>
                {category.benefits.map((benefit: any, benefitIndex: number) => (
                  <View key={benefitIndex} style={styles.benefitContainer}>
                    <Text style={styles.benefitTitle}>
                      {benefit.merchantName === "기타" ? "모든 카테고리" : benefit.merchantName}{" "}
                      {benefit.discount}
                    </Text>

                    <Text style={styles.benefitDetail}>
                      금액 한도: {benefit.amountLimit === "None" ? "없음" : benefit.amountLimit}
                    </Text>
                    <Text style={styles.benefitDetail}>
                      횟수 한도: {benefit.countLimit === "None" ? "없음" : benefit.countLimit}
                    </Text>
                    <Text style={styles.benefitDetail}>
                      최소 결제 금액:{" "}
                      {benefit.minPayment > 0
                        ? `${benefit.minPayment.toLocaleString()}원`
                        : "제한 없음"}
                    </Text>
                    <Text style={styles.benefitDetail}>
                      예외 사항:{" "}
                      {benefit.exceptionTypes !== "None" ? benefit.exceptionTypes : "없음"}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: "#fff",
    flex: 1,
  },
  cardImage: {
    width: 120,
    height: 80,
    marginBottom: 30,
    marginTop: 10,
    resizeMode: "contain",
  },
  cardImageRotated: {
    width: 80,
    height: 120,
    transform: [{ rotate: "-90deg" }],
    resizeMode: "contain",
  },
  cardName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  button: {
    padding: 5,
    margin: 5,
    borderRadius: 20,
    fontFamily: "SUITE-Bold",
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  selectedButton: {
    backgroundColor: "#5253F0",
  },
  unselectedButton: {
    backgroundColor: "#CCCCCC",
  },
  accordionContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 50,
  },
  accordionItem: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  categoryIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: "SUITE-Bold",
    color: "#666",
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  accordionContent: {
    backgroundColor: "#F7F9FC",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E1E5EB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  partText: {
    fontFamily: "SUITE-Regular",
    fontSize: 14,
  },
  benefitTitle: {
    fontFamily: "SUITE-Bold",
    fontSize: 14,
    color: "#5250F0",
  },
  benefitDetail: {
    fontFamily: "SUITE-Regular",
    fontSize: 12,
  },
  benefitContainer: {
    paddingLeft: 15,
    marginBottom: 5,
  },
});

export default CardDetailScreen;
