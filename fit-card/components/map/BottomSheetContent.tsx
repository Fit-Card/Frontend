import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import axios from "axios";
import CardList from "./BottomSheetCardList";
import { mockUser } from "@/mock/mockUser";

type Location = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

interface BottomSheetContentProps {
  selectedLocation: Location | null;
  merchantId: number;
}

const BottomSheetContent = ({ selectedLocation, merchantId }: BottomSheetContentProps) => {
  const [showPaymentInput, setShowPaymentInput] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.post(
          "http://j11a405.p.ssafy.io:8081/branches/get/membercard",
          { merchantBranchId: merchantId },
          {
            headers: {
              Authorization: `Bearer ${mockUser.token}`,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
          }
        );

        const fetchedCards = response.data.data.branchMemberCardResponseList.map((card: any) => ({
          id: card.cardVersionId,
          image: { uri: card.cardImg },
          name: card.cardName,
          description: card.benefitDescription,
        }));

        console.log(fetchCards);

        setCards(fetchedCards);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    };

    if (merchantId) {
      fetchCards();
    }
  }, [merchantId]);

  return (
    <View style={styles.bottomSheetContent}>
      {selectedLocation ? (
        <>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.storeName}>{selectedLocation.name}</Text>
              <Text style={styles.storeAddress}>{selectedLocation.address}</Text>
            </View>

            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowPaymentInput(!showPaymentInput)}
              >
                <Image source={require("../../assets/images/calculator.png")} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Image
                  source={require("../../assets/images/kakaomap-icon.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {showPaymentInput && (
            <View style={styles.paymentContainer}>
              <Text style={styles.paymentLabel}>결제 예정 금액:</Text>
              <TextInput
                style={styles.paymentInput}
                keyboardType="numeric"
                value={paymentAmount}
                onChangeText={setPaymentAmount}
                placeholder="결제할 금액을 입력하세요."
              />
            </View>
          )}

          {/* Replace dummy cards with the fetched cards */}
          <CardList cards={cards} />
        </>
      ) : (
        <Text>No location selected</Text>
      )}
    </View>
  );
};

export default BottomSheetContent;

const styles = StyleSheet.create({
  bottomSheetContent: {
    backgroundColor: "white",
    padding: 10,
    paddingBottom: 50,
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  storeName: {
    fontSize: 20,
    fontFamily: "SUITE-Bold",
    marginLeft: 10,
  },
  storeAddress: {
    fontSize: 12,
    color: "#555",
    fontFamily: "SUITE-Bold",
    marginTop: 8,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: "row",
    marginRight: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  paymentContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  paymentLabel: {
    fontSize: 16,
    fontFamily: "SUITE-Bold",
    marginBottom: 5,
  },
  paymentInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: "SUITE-Bold",
  },
});
