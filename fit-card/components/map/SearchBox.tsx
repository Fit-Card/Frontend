import React, { useState } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { mockUser } from "@/mock/mockUser";
import * as Location from "expo-location";

type SearchBoxProps = {
  onSubmit: (results: any[], page: number) => void; // page를 추가
  location: Location.LocationObject | null;
};

const SearchBox = ({ onSubmit, location }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleSearchSubmit = async (page: number = 1) => {
    if (searchQuery.length > 0 && location && location.coords) {
      try {
        const response = await axios.post(
          `http://j11a405.p.ssafy.io:8081/branches/search-page?pageNo=${page}`,
          {
            merchantNameKeyword: searchQuery,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          {
            headers: {
              Authorization: `Bearer ${mockUser.token}`,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
          }
        );

        // Call the onSubmit prop with the response data and page number
        onSubmit(response.data.data.branchResponses, page);
      } catch (error) {
        console.error("API request failed: ", error);
      }
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
        onSubmitEditing={() => handleSearchSubmit()} // 기본 페이지 1로 호출
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
