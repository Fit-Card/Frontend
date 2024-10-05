import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { StackParamList } from "@/navigationTypes"; // StackParamList 경로 수정
import SearchInput from "@/components/benefit/TextInputBox";
import BasicImage from "@/components/benefit/store/BasicImage";
import { mockUser } from "@/mock/mockUser";
import { ActivityIndicator } from "react-native";

const categoriesWithIcons: Array<{
  name: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}> = [
  { name: "FD6", title: "음식점", icon: "restaurant-outline" },
  { name: "CE7", title: "카페", icon: "cafe-outline" },
  { name: "CS2", title: "편의점", icon: "cart-outline" },
  { name: "CT1", title: "문화시설", icon: "film-outline" },
  { name: "OL7", title: "주유소", icon: "car-outline" },
];

// Navigation 타입 정의
type SearchScreenNavigationProp = StackNavigationProp<StackParamList, "StoreDetail">;

interface Store {
  merchantId: number;
  name: string;
  category: string;
}

const getCategoryIcon = (categoryName: string) => {
  const category = categoriesWithIcons.find((cat) => cat.name === categoryName);
  return category ? category.icon : "help-outline";
};

export default function StoreSearch() {
  const [searchText, setSearchText] = useState<string>("");
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<SearchScreenNavigationProp>();

  const handleSearch = async () => {
    if (searchText.length > 0) {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://j11a405.p.ssafy.io:8081/merchant/info/search",
          { merchantNameKeyword: searchText },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${mockUser.token}`, // Add your authorization token
            },
          }
        );

        const data = response.data;
        if (data && data.data && data.data.merchantResponses) {
          setStores(data.data.merchantResponses);
        } else {
          setStores([]);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    } else {
      setStores([]);
    }
  };

  const renderStoreItem = ({ item }: { item: Store }) => (
    <TouchableOpacity
      style={styles.storeItem}
      onPress={() =>
        navigation.navigate("StoreDetail", { storeName: item.name, storeImage: item.category })
      }
    >
      <Ionicons
        name={getCategoryIcon(item.category)}
        size={24}
        color="#5250F0"
        style={styles.icon}
      />
      <Text style={styles.storeItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchInput value={searchText} onChangeText={setSearchText} onSubmitEditing={handleSearch} />
      {searchText === "" ? (
        <BasicImage />
      ) : loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5250F0" style={styles.largeLoader} />
        </View>
      ) : (
        <FlatList
          data={stores}
          keyExtractor={(item) => item.merchantId.toString()}
          renderItem={renderStoreItem}
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
  storeItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  storeItemText: {
    fontFamily: "SUITE-Bold",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  largeLoader: {
    transform: [{ scale: 1.5 }],
  },
});
