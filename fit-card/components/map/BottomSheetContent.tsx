import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import CardList from "./BottomSheetCardList";

type Location = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

interface BottomSheetContentProps {
  selectedLocation: Location | null;
}

const BottomSheetContent = ({ selectedLocation }: BottomSheetContentProps) => {
  const [showPaymentInput, setShowPaymentInput] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");

  const dummyCards = [
    {
      id: 1,
      image: require("../../assets/images/temp-card.png"),
      name: "카드 이름 어쩌구 저쩌구2222",
      description: "카드 혜택 어쩌구 저쩌구 어쩌구 저쩌구!!",
    },
    {
      id: 2,
      image: require("../../assets/images/temp-card.png"),
      name: "카드 이름 어쩌구 저쩌구",
      description: "카드 혜택 어쩌구 저쩌구 어쩌구 저쩌구!!",
    },
    {
      id: 3,
      image: require("../../assets/images/temp-card.png"),
      name: "카드 이름 어쩌구 저쩌구",
      description: "카드 혜택 어쩌구 저쩌구 어쩌구 저쩌구!!",
    },
    {
      id: 4,
      image: require("../../assets/images/temp-card.png"),
      name: "카드 이름 어쩌구 저쩌구",
      description: "카드 혜택 어쩌구 저쩌구 어쩌구 저쩌구!!",
    },
    {
      id: 5,
      image: require("../../assets/images/temp-card.png"),
      name: "카드 이름 어쩌구 저쩌구",
      description: "카드 혜택 어쩌구 저쩌구 어쩌구 저쩌구!!",
    },
    {
      id: 6,
      image: require("../../assets/images/temp-card.png"),
      name: "카드 이름 어쩌구 저쩌구",
      description: "카드 혜택 어쩌구 저쩌구 어쩌구 저쩌구!!",
    },
  ];

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
                onPress={() => setShowPaymentInput(!showPaymentInput)} // 버튼 클릭 시 상태 변경
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

          <CardList cards={dummyCards} />
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
