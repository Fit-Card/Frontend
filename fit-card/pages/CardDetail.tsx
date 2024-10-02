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
import axios from "axios"; // Import axios
import { mockUser } from "@/mock/mockUser";

import { StackParamList } from "@/navigationTypes";

type CardDetailRouteProp = RouteProp<StackParamList, "CardDetail">;

const CardDetailScreen = () => {
  const route = useRoute<CardDetailRouteProp>();
  const { cardId } = route.params;

  const [cardData, setCardData] = useState<any>(null);
  const [cardDetailData, setCardDetailData] = useState<any[]>([]); // Ensure it's an array to hold categories
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [cardName, setCardName] = useState<string | null>(null);
  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://j11a405.p.ssafy.io:8081/cards/performance/get",
        2278,
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      setCardData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching card data: ", error);
    }
  };

  const fetchDetailData = async () => {
    try {
      const response = await axios.post(
        "http://j11a405.p.ssafy.io:8081/cards/benefits/get",
        {
          cardId: 2278,
          level: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      console.log(response.data.data.categories);

      setCardDetailData(response.data.data.categories); // Save categories from API response
      setCardName(response.data.data.cardName);
      setCardImageUrl(response.data.data.cardImage);
    } catch (error) {
      console.error("Error fetching card details: ", error);
    }
  };

  // Fetch both data and detail data when the component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      await fetchData();
      await fetchDetailData();
      setLoading(false); // Set loading to false once both requests are complete
    };
    fetchAllData();
  }, []);

  const toggleCategory = (index: number) => {
    if (expandedCategories.includes(index)) {
      setExpandedCategories(expandedCategories.filter((i) => i !== index));
    } else {
      setExpandedCategories([...expandedCategories, index]);
    }
  };

  const renderButtons = () => {
    if (!cardData || !cardData.data) {
      return null;
    }

    return cardData.data.map((item: any, index: number) => (
      <TouchableOpacity key={index} style={styles.button}>
        <Text style={styles.buttonText}>{index + 1}</Text>
      </TouchableOpacity>
    ));
  };

  // If loading is true, show a loading indicator
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5253F0" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  // Once loading is complete, render the actual content
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Conditionally render the card image from the URL */}
      {cardImageUrl ? (
        <Image source={{ uri: cardImageUrl }} style={styles.cardImage} />
      ) : (
        <Image source={require("@/assets/images/temp-card.png")} style={styles.cardImage} />
      )}

      <Text style={styles.cardName}>{cardName || "Loading card name..."}</Text>

      <View style={styles.buttonContainer}>{renderButtons()}</View>

      <View style={styles.accordionContainer}>
        {cardDetailData.map((category: any, index: number) => (
          <View key={index} style={styles.accordionItem}>
            <TouchableOpacity onPress={() => toggleCategory(index)} style={styles.accordionHeader}>
              <View style={styles.categoryIconContainer}>
                {/* You can customize this icon based on the category */}
                <Ionicons name="folder-outline" size={20} color="#5253F0" style={styles.icon} />
                <Text style={styles.categoryTitle}>{category.name}</Text>
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
                {/* Render the details of the category */}
                <Text style={styles.categoryDetails}>{category.details}</Text>
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
  },
  cardImage: {
    width: 130,
    height: 90,
    marginBottom: 20,
    resizeMode: "contain",
  },
  cardName: {
    fontSize: 20,
    fontFamily: "SUITE-Bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  button: {
    padding: 10,
    backgroundColor: "#5253F0",
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  accordionContainer: {
    width: "100%",
    marginTop: 20,
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
  categoryDetails: {
    fontSize: 14,
    color: "#666",
    fontFamily: "SUITE-Regular",
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardDetailScreen;
