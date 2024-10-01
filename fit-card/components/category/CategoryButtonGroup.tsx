import React from "react";
import { View, StyleSheet } from "react-native";
import ButtonComponent from "@/components/category/ButtonComponent";
import { Category } from "@/components/map/LocationType";

type CategoryButtonGroupProps = {
  selectedButton: string | null;
  onButtonPress: (id: string) => void;
};

export const categories: Category[] = [
  { id: 0, title: "음식점", code: "FD6" },
  { id: 1, title: "카페", code: "CE7" },
  { id: 2, title: "편의점", code: "CS2" },
  { id: 3, title: "문화시설", code: "CT1" },
  { id: 4, title: "주유소", code: "OL7" },
];

const CategoryButtonGroup = ({ selectedButton, onButtonPress }: CategoryButtonGroupProps) => {
  return (
    <View style={styles.buttonGroup}>
      {categories.map((category) => (
        <ButtonComponent
          key={category.id}
          title={category.title}
          isSelected={selectedButton === category.code}
          onPress={() => onButtonPress(category.code)}
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
