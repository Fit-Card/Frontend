import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import CustomButton from "../components/button/CustomButton";
import MapComponent from "../components/map/MapComponent";

export default function MapScreen() {
  // NavigationProp 타입 지정
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return <MapComponent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontFamily: "SUITE-Regular",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
