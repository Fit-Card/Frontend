import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

type BankCardItemProps = {
  companyId: number;
  bankName: string;
  bankLogo: any;
  cardCount: number;
  onPress: () => void; // 터치 이벤트를 받는 함수
};

const BankCardItem = ({ companyId, bankName, bankLogo, cardCount, onPress }: BankCardItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <Image source={bankLogo} style={styles.bankLogo} />
      <View style={styles.textContainer}>
        <Text style={styles.bankName}>{bankName}</Text>
        <Text style={styles.cardCount}>{cardCount}종</Text>
      </View>
      <Icon name="chevron-forward" type="ionicon" size={24} color="#ccc" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#F7F7F7",
    marginBottom: 12,
    elevation: 1,
  },
  bankLogo: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center", // 이름과 카드 수를 양쪽 끝에 배치
  },
  bankName: {
    fontSize: 16,
    fontFamily: "SUITE-Bold",
  },
  cardCount: {
    fontSize: 12,
    color: "#777",
    fontFamily: "SUITE-Regular",
    marginLeft: 10,
  },
});

export default BankCardItem;
