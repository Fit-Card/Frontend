import React from "react";
import { View, StyleSheet } from "react-native";
import ButtonComponent from "./ButtonComponent";

type Category = {
  id: number;
  title: string;
};

type CategoryButtonGroupProps = {
  selectedButton: number | null;
  onButtonPress: (id: number) => void;
};

const categories: Category[] = [
  { id: 0, title: "음식점" },
  { id: 1, title: "카페" },
  { id: 2, title: "편의점" },
  { id: 3, title: "문화" },
  { id: 4, title: "주유소" },
];

const CategoryButtonGroup = ({ selectedButton, onButtonPress }: CategoryButtonGroupProps) => {
  return (
    <View style={styles.buttonGroup}>
      {categories.map((category) => (
        <ButtonComponent
          key={category.id}
          title={category.title}
          isSelected={selectedButton === category.id}
          onPress={() => onButtonPress(category.id)}
        />
      ))}
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
