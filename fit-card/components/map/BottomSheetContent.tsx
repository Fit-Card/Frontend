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

  const fetchCardsWithoutPayment = async () => {
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

      setCards(fetchedCards);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
  };

  const fetchCardsWithPayment = async (amount: number) => {
    try {
      const response = await axios.post(
        "http://j11a405.p.ssafy.io:8081/branches/get/membercard-benefit",
        {
          merchantBranchId: merchantId,
          money: paymentAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      const fetchedCards = response.data.data.branchCalculateBenefitResponses.map((card: any) => ({
        id: card.cardVersionId,
        image: { uri: card.cardImg },
        name: card.cardName,
        description: card.benefitDescription,
        benefitAmount: card.benefitValue,
      }));
      //console.log(fetchedCards);

      setCards(fetchedCards);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
  };

  useEffect(() => {
    if (!showPaymentInput) {
      fetchCardsWithoutPayment();
    }
  }, [merchantId, showPaymentInput]);

  const handleConfirmPayment = () => {
    const amount = parseInt(paymentAmount, 10);
    if (!isNaN(amount)) {
      fetchCardsWithPayment(amount);
    } else {
      console.error("Invalid payment amount");
    }
  };

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
                maxLength={10}
                onSubmitEditing={handleConfirmPayment}
              />
            </View>
          )}
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
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  paymentLabel: {
    fontSize: 16,
    fontFamily: "SUITE-Bold",
    marginRight: 10,
  },
  paymentInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: "SUITE-Bold",
  },
});
