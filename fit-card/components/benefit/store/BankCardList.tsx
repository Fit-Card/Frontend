import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BankCardItem from "@/components/benefit/store/BankCardItem";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "@/navigationTypes";

type StoreBenefitCardListNavigationProp = StackNavigationProp<
  StackParamList,
  "StoreBenefitCardList"
>;

const bankData = [
  {
    companyId: 1,
    bankName: "신한 은행",
    bankLogo: require("@/assets/images/logo.png"),
    cardCount: 2,
  },
  {
    companyId: 2,
    bankName: "우리 은행",
    bankLogo: require("@/assets/images/logo.png"),
    cardCount: 17,
  },
  {
    companyId: 3,
    bankName: "기업 은행",
    bankLogo: require("@/assets/images/logo.png"),
    cardCount: 4,
  },
  {
    companyId: 4,
    bankName: "농협 은행",
    bankLogo: require("@/assets/images/logo.png"),
    cardCount: 1,
  },
];

const BankCardList = () => {
  const navigation = useNavigation<StoreBenefitCardListNavigationProp>();

  const handlePress = (bankName: string, companyId: number) => {
    navigation.navigate("StoreBenefitCardList", {
      companyName: bankName,
      companyId: companyId,
    });
  };

  return (
    <View style={styles.listContainer}>
      {bankData.map((bank) => (
        <BankCardItem
          key={bank.companyId}
          companyId={bank.companyId}
          bankName={bank.bankName}
          bankLogo={bank.bankLogo}
          cardCount={bank.cardCount}
          onPress={() => handlePress(bank.bankName, bank.companyId)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

export default BankCardList;
