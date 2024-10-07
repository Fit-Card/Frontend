import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BankCardItem from "@/components/benefit/store/BankCardItem";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "@/navigationTypes";

interface BankCard {
  cardCompanyId: number;
  bankName: string;
  bankImgUrl: string;
  count: number;
}

interface BankCardListProps {
  bankCards: BankCard[];
  storeId: number;
  isMine: boolean;
}

type StoreBenefitCardListNavigationProp = StackNavigationProp<
  StackParamList,
  "StoreBenefitCardList"
>;

const BankCardList = ({ bankCards, storeId, isMine }: BankCardListProps) => {
  const navigation = useNavigation<StoreBenefitCardListNavigationProp>();

  const handlePress = (bankName: string, companyId: number) => {
    navigation.navigate("StoreBenefitCardList", {
      companyName: bankName,
      companyId: companyId,
      storeId: storeId,
      isMine: isMine,
    });
  };

  return (
    <View style={styles.listContainer}>
      {bankCards.map((bank) => (
        <BankCardItem
          key={bank.cardCompanyId}
          companyId={bank.cardCompanyId}
          bankName={bank.bankName}
          bankLogo={{ uri: bank.bankImgUrl }}
          cardCount={bank.count}
          onPress={() => handlePress(bank.bankName, bank.cardCompanyId)} // onPress 속성 전달
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
