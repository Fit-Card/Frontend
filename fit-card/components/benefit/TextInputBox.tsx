import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Define the props type for the SearchInput component
interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchInput({ value, onChangeText }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#686E74" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="가맹점 이름을 검색해보세요."
        placeholderTextColor="#686E74"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#4D4D4D",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#FFF",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    fontSize: 14,
    color: "#000",
    fontFamily: "SUITE-Bold",
    marginRight: 75,
  },
});
