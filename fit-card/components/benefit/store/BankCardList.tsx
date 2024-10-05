import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BankCardItem from "@/components/benefit/store/BankCardItem";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "@/navigationTypes";

// 상위에서 받은 데이터 타입 정의
interface BankCard {
  cardCompanyId: number;
  bankName: string;
  bankImgUrl: string;
  count: number;
}

interface BankCardListProps {
  bankCards: BankCard[]; // bankCards 배열을 props로 받음
}

type StoreBenefitCardListNavigationProp = StackNavigationProp<
  StackParamList,
  "StoreBenefitCardList"
>;

const BankCardList = ({ bankCards }: BankCardListProps) => {
  const navigation = useNavigation<StoreBenefitCardListNavigationProp>();

  // 카드 아이템을 눌렀을 때 실행될 함수
  const handlePress = (bankName: string, companyId: number) => {
    navigation.navigate("StoreBenefitCardList", {
      companyName: bankName,
      companyId: companyId,
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
