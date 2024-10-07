import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Define the props type for the SearchInput component
interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  clearSearch: () => void; // 추가: 검색어 및 결과를 지우는 함수
}

export default function SearchInput({
  value,
  onChangeText,
  onSubmitEditing,
  clearSearch,
}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#686E74" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="가맹점 이름을 검색해보세요."
        placeholderTextColor="#686E74"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        maxLength={10}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={clearSearch}>
          <Image source={require("@/assets/images/x-icon.png")} style={styles.clearIcon} />
        </TouchableOpacity>
      )}
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
    width: "90%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    fontSize: 14,
    color: "#000",
    fontFamily: "SUITE-Bold",
    flex: 1,
    padding: 0,
    minWidth: 0,
  },
  clearIcon: {
    width: 18,
    height: 18,
    marginLeft: 10,
  },
});
