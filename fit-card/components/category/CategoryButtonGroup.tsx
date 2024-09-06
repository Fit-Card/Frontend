import React from "react";
import { View, StyleSheet } from "react-native";
import ButtonComponent from "./ButtonComponent";

type CategoryButtonGroupProps = {
  selectedButton: string | null;
  onButtonPress: (title: string) => void;
};

const CategoryButtonGroup = ({ selectedButton, onButtonPress }: CategoryButtonGroupProps) => {
  return (
    <View style={styles.buttonGroup}>
      <ButtonComponent
        title="음식점"
        isSelected={selectedButton === "음식점"}
        onPress={() => onButtonPress("음식점")}
      />
      <ButtonComponent
        title="카페"
        isSelected={selectedButton === "카페"}
        onPress={() => onButtonPress("카페")}
      />
      <ButtonComponent
        title="편의점"
        isSelected={selectedButton === "편의점"}
        onPress={() => onButtonPress("편의점")}
      />
      <ButtonComponent
        title="문화"
        isSelected={selectedButton === "문화"}
        onPress={() => onButtonPress("문화")}
      />
      <ButtonComponent
        title="주유소"
        isSelected={selectedButton === "주유소"}
        onPress={() => onButtonPress("주유소")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderRadius: 20,
  },
});

export default CategoryButtonGroup;
