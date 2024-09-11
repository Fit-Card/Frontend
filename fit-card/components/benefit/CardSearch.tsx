import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

interface CardCompany {
  id: number;
  name: string;
  image: any;
}

const cardCompanies: CardCompany[] = [
  { id: 1, name: "신한", image: require("../../assets/images/logo.png") },
  { id: 2, name: "우리", image: require("../../assets/images/logo.png") },
  { id: 3, name: "하나", image: require("../../assets/images/logo.png") },
  { id: 4, name: "삼성", image: require("../../assets/images/logo.png") },
  { id: 5, name: "국민", image: require("../../assets/images/logo.png") },
  { id: 6, name: "기업", image: require("../../assets/images/logo.png") },
  { id: 7, name: "농협", image: require("../../assets/images/logo.png") },
  { id: 8, name: "우리", image: require("../../assets/images/logo.png") },
  { id: 9, name: "기업", image: require("../../assets/images/logo.png") },
];

interface CardCompanyItemProps {
  item: CardCompany;
  onCardPress: (companyId: number, companyName: string) => void;
}

const CardCompanyItem = ({ item, onCardPress }: CardCompanyItemProps) => {
  return (
    <TouchableOpacity onPress={() => onCardPress(item.id, item.name)}>
      <View style={styles.cardContainer}>
        <Image source={item.image} style={styles.cardImage} />
        <Text style={styles.cardText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CardSearch = ({
  onCardPress,
}: {
  onCardPress: (companyId: number, companyName: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={cardCompanies}
        renderItem={({ item }) => <CardCompanyItem item={item} onCardPress={onCardPress} />}
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
