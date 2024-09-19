import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import SearchInput from "@/components/benefit/TextInputBox";
import BasicImage from "@/components/benefit/BasicImage";

interface Theater {
  id: number;
  name: string;
  image: any;
}

const theaters: Theater[] = [
  { id: 1, name: "롯데시네마", image: require("../../assets/images/logo.png") },
  { id: 2, name: "CGV", image: require("../../assets/images/logo.png") },
  { id: 3, name: "롯데시네마2", image: require("../../assets/images/logo.png") },
];

export default function StoreSearch() {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredTheaters, setFilteredTheaters] = useState<Theater[]>(theaters);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      const filtered = theaters.filter((theater) =>
        theater.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTheaters(filtered);
    } else {
      setFilteredTheaters(theaters);
    }
  };

  const renderTheaterItem = ({ item }: { item: Theater }) => (
    <TouchableOpacity style={styles.theaterItem}>
      <Image source={item.image} style={styles.cardImage} />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchInput value={searchText} onChangeText={handleSearch} />
      {searchText === "" ? (
        <BasicImage />
      ) : (
        <FlatList
          data={filteredTheaters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTheaterItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    padding: 10,
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 0,
    marginTop: 10,
  },
  theaterItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cardImage: {
    width: 45,
    height: 45,
    marginRight: 30,
  },
});
