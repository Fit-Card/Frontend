import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";

type StoreItem = {
  id: number;
  name: string;
  address: string;
  distance: number;
  latitude: number;
  longitude: number;
  kakaoUrl: string;
};

type SearchResultListProps = {
  searchQuery: string;
  searchResults: StoreItem[];
  mapRef: React.RefObject<any> | null; // mapRef가 null을 허용
  setShowSearchResults: (show: boolean) => void;
  onLoadMore: () => void; // 추가된 props
  hasMore: boolean; // 추가된 props
};

const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${distance}m`;
  } else {
    return `${(distance / 1000).toFixed(1)}km`;
  }
};

const SearchResultList = ({
  searchQuery,
  searchResults,
  mapRef,
  setShowSearchResults,
  onLoadMore, // onLoadMore prop을 사용
  hasMore,
}: SearchResultListProps) => {
  const handleLocationSelect = (latitude: number, longitude: number) => {
    if (mapRef && mapRef.current) {
      // mapRef가 null이 아닐 때만 접근
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(newRegion, 1000);
    } else {
      console.warn("mapRef is null, cannot animate to region.");
    }
    setShowSearchResults(false);
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

  return (
    <FlatList
      style={{ flex: 1 }}
      data={searchResults}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={hasMore ? onLoadMore : null} // 무한 스크롤을 위한 핸들러
      onEndReachedThreshold={0.1} // 호출될 임계값
    />
  );
};

const styles = StyleSheet.create({
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
});

export default SearchResultList;
