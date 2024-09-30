import React, { useState } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity, Image } from "react-native";

type SearchBoxProps = {
  onSubmit: (query: string) => void; // 검색어가 제출될 때 실행되는 함수
};

const SearchBox = ({ onSubmit }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.length > 0) {
      onSubmit(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="검색어를 입력하세요."
        value={searchQuery}
        onChangeText={handleSearchChange}
        onSubmitEditing={handleSearchSubmit}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
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
