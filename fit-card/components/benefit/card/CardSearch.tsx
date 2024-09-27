import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import axios from "axios";
import { mockUser } from "@/mock/mockUser";

const screenWidth = Dimensions.get("window").width;

interface CardCompany {
  id: number;
  name: string;
  image: string;
}

const CardSearch = ({
  onCardPress,
}: {
  onCardPress: (companyId: number, companyName: string) => void;
}) => {
  const [cardCompanies, setCardCompanies] = useState<CardCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCardCompanies = async () => {
      try {
        setLoading(true);

        const response = await axios.post(
          "http://j11a405.p.ssafy.io:8081/cards/companies/get/all",
          {},
          {
            headers: {
              Authorization: `Bearer ${mockUser.token}`,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
          }
        );

        const companies = response.data.data.cardCompanyGetResponses.map((company: any) => ({
          id: company.companyId,
          name: company.companyName,
          image: company.companyImageUrl,
        }));

        setCardCompanies(companies);
      } catch (error) {
        console.error("Error fetching card companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardCompanies();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cardCompanies}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onCardPress(item.id, item.name)}>
            <View style={styles.cardContainer}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    justifyContent: "center",
  },
  cardContainer: {
    width: screenWidth / 3 - 35,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#e1e1e1",
    borderRadius: 15,
    padding: 10,
  },
  cardImage: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontFamily: "SUITE-Bold",
    color: "#000",
    textAlign: "center",
  },
});

export default CardSearch;
