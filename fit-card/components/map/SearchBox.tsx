import React from "react";
import { TextInput, StyleSheet, View, TouchableOpacity, Image } from "react-native";

type SearchBoxProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onClear: () => void;
};

const SearchBox = ({ value, onChangeText, onSubmit, onClear }: SearchBoxProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="검색어를 입력하세요."
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Image
            source={require("../../assets/images/x-icon.png")}
            style={{ width: 16, height: 16 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
  },
  searchInput: {
    height: 40,
    paddingLeft: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
    width: "100%",
    fontFamily: "SUITE-Bold",
  },
  clearButton: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    paddingRight: 10,
  },
});

export default SearchBox;
