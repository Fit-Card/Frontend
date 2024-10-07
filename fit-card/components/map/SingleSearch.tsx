import React, { RefObject } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import MapView from "react-native-maps"; // MapView를 import
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "@/navigationTypes";

type SearchComponentProps = {
  location: { latitude: number; longitude: number }; // null이 될 수 없으므로 타입 수정
  mapRef: RefObject<MapView>; // mapRef를 RefObject로 정의
};

const SearchComponent = ({ location }: SearchComponentProps) => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const handlePress = () => {
    // SearchPage로 이동하며 현재 위치를 전달
    navigation.navigate("SearchPage", {
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  return (
    <TouchableOpacity style={styles.searchContainer} onPress={handlePress}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력하세요."
          editable={false} // 직접 입력은 못하고 터치하면 SearchPage로 이동
          maxLength={10}
        />
        <Image
          source={require("@/assets/images/x-icon.png")} // 검색 아이콘
          style={styles.searchIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    elevation: 3,
  },
  searchInput: {
    height: 35,
    width: "100%",
    fontSize: 14,
    fontFamily: "SUITE-Bold",
    paddingLeft: 10,
  },
  searchIcon: {
    width: 17,
    height: 17,
  },
});

export default SearchComponent;
