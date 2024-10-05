import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { StackParamList } from "@/navigationTypes";
import SearchInput from "@/components/benefit/TextInputBox";
import BasicImage from "@/components/benefit/store/BasicImage";
import { mockUser } from "@/mock/mockUser";
import { ActivityIndicator } from "react-native";
import { categoriesWithIcons } from "@/components/map/LocationType";

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
              Authorization: `Bearer ${mockUser.token}`,
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

  // 검색어 및 결과를 초기화하는 함수
  const clearSearch = () => {
    setSearchText(""); // 검색창 비우기
    setStores([]); // 검색 결과도 초기화
  };

  const renderStoreItem = ({ item }: { item: Store }) => (
    <TouchableOpacity
      style={styles.storeItem}
      onPress={() =>
        navigation.navigate("StoreDetail", {
          storeName: item.name,
          storeId: item.merchantId,
          storeCategory: item.category,
        })
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
      <SearchInput
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        clearSearch={clearSearch} // clearSearch 함수 전달
      />
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
