import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import CardList from "./BottomSheetCardList";

type Location = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

interface BottomSheetContentProps {
  selectedLocation: Location | null;
}

const BottomSheetContent = ({ selectedLocation }: BottomSheetContentProps) => {
  const dummyCards = [
    {
      id: "1",
      image: require("../../assets/images/temp-card.png"),
      name: "카드 이름 어쩌구 저쩌구",
      description: "카드 혜택 어쩌구 저쩌구 어쩌구 저쩌구!!",
    },
    {
      id: "2",
      image: require("../../assets/images/temp-card.png"),
      name: "카드 이름 어쩌구 저쩌구",
      description: "카드 혜택 어쩌구 저쩌구 어쩌구 저쩌구!!",
    },
    {
      id: "3",
      image: require("../../assets/images/temp-card.png"),
      name: "카드 이름 어쩌구 저쩌구",
      description: "카드 혜택 어쩌구 저쩌구 어쩌구 저쩌구!!",
    },
    {
      id: "4",
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
              <TouchableOpacity style={styles.iconButton}>
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
});
