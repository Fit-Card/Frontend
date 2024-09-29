import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import { mockUser } from "@/mock/mockUser";
import * as Location from "expo-location";

type StoreItem = {
  id: number;
  name: string;
  address: string;
  distance: number;
  latitude: number;
  longitude: number;
  kakaoUrl: string;
};

type SearchComponentProps = {
  location: Location.LocationObject | null;
  mapRef: React.RefObject<any> | null; // Added for map reference
};

const SearchComponent = ({ location, mapRef }: SearchComponentProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<StoreItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [showSearchResults, setShowSearchResults] = useState(false);

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

        const results = response.data.data.branchResponses.map((branch: any) => ({
          id: branch.merchantBranchId,
          name: branch.branchName,
          address: branch.branchAddress,
          distance: branch.distance,
          latitude: branch.latitude,
          longitude: branch.longitude,
          kakaoUrl: branch.kakaoUrl,
        }));

        if (page === 1) {
          setSearchResults(results);
        } else {
          setSearchResults((prevResults) => [...prevResults, ...results]);
        }

        setHasMore(results.length > 0);
        setPage(page);
        if (results.length) {
          setShowSearchResults(true);
        }
      } catch (error) {
        console.error("API request failed: ", error);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleLocationSelect = (latitude: number, longitude: number) => {
    if (mapRef && mapRef.current) {
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(newRegion, 1000);
    }
    setShowSearchResults(false);
  };

  const formatDistance = (distance: number): string => {
    if (distance < 1000) {
      return `${distance}m`;
    } else {
      return `${(distance / 1000).toFixed(1)}km`;
    }
  };

  const renderItem = ({ item }: { item: StoreItem }) => (
    <TouchableOpacity onPress={() => handleLocationSelect(item.latitude, item.longitude)}>
      <View style={styles.itemContainer}>
        <View style={styles.iconAndDistanceContainer}>
          <Image source={require("@/assets/images/distance-icon.png")} style={styles.icon} />
          <Text style={styles.distance}>{formatDistance(item.distance)}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = async () => {
    if (hasMore) {
      const nextPage = page + 1;
      await handleSearchSubmit(nextPage);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setShowSearchResults(false)}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력하세요."
          value={searchQuery}
          onChangeText={handleSearchChange}
          onSubmitEditing={() => handleSearchSubmit()}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
            <Image
              source={require("../../assets/images/x-icon.png")}
              style={{ width: 16, height: 16 }}
            />
          </TouchableOpacity>
        )}
        {searchResults.length > 0 && showSearchResults && (
          <View style={styles.resultContainer}>
            <FlatList
              style={{ flex: 1 }}
              data={searchResults}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              scrollEnabled={true}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              onEndReached={hasMore ? handleLoadMore : null}
              onEndReachedThreshold={0.1}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  iconAndDistanceContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  icon: {
    width: 10,
    height: 15,
    marginBottom: 5,
  },
  distance: {
    fontSize: 10,
    fontFamily: "SUITE-Regular",
    color: "#888",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "SUITE-Bold",
    color: "#333",
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: "#555",
    fontFamily: "SUITE-Regular",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  resultContainer: {
    position: "absolute",
    top: 55,
    left: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    maxHeight: 300,
    overflow: "hidden",
  },
});

export default SearchComponent;
