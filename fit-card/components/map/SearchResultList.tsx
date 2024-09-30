import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";

type StoreItem = {
  id: string;
  name: string;
  address: string;
  distance: string;
  latitude: number;
  longitude: number;
  kakaoUrl: string;
};

type SearchResultListProps = {
  searchQuery: string;
  mapRef: React.RefObject<any>; // mapRef를 props로 전달
  setShowSearchResults: (show: boolean) => void; // 검색 결과 숨기기 위한 함수 전달
};

const dummyData: StoreItem[] = [
  {
    id: "1",
    name: "s바나프레소 역삼점",
    address: "서울특별시 강남구 논현로94길 13",
    distance: "0.3km",
    latitude: 37.499979,
    longitude: 127.03735,
    kakaoUrl: "dfssdfsdsd",
  },
  {
    id: "2",
    name: "s바나프레소 신논현역점",
    address: "서울특별시 서초구 서초4동 사평대로 364",
    distance: "0.8km",
    latitude: 37.505358,
    longitude: 127.025104,
    kakaoUrl: "dfssdfsdsd",
  },
  {
    id: "3",
    name: "s바나프레소 강남점",
    address: "서울특별시 강남구 테헤란로4길 46",
    distance: "1.3km",
    latitude: 37.498087,
    longitude: 127.028577,
    kakaoUrl: "dfssdfsdsd",
  },
  {
    id: "4",
    name: "s바나프레소 선릉역사거리점",
    address: "서울특별시 강남구 역삼동 705-19",
    distance: "2.0km",
    latitude: 37.504347,
    longitude: 127.049046,
    kakaoUrl: "dfssdfsdsd",
  },
];

const SearchResultList = ({ searchQuery, mapRef, setShowSearchResults }: SearchResultListProps) => {
  const filteredData = dummyData.filter((item) => item.name.includes(searchQuery));

  const handleLocationSelect = (
    latitude: number,
    longitude: number,
    name: string,
    address: string
  ) => {
    if (mapRef.current) {
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.05, // 필요에 맞게 값 설정
        longitudeDelta: 0.05,
      };
      mapRef.current.animateToRegion(newRegion, 1000);
    }

    setShowSearchResults(false); // 검색 결과 창 닫기
  };

  const renderItem = ({ item }: { item: StoreItem }) => (
    <TouchableOpacity
      onPress={() => handleLocationSelect(item.latitude, item.longitude, item.name, item.address)}
    >
      <View style={styles.itemContainer}>
        <View style={styles.iconAndDistanceContainer}>
          <Image source={require("../../assets/images/distance-icon.png")} style={styles.icon} />
          <Text style={styles.distance}>{item.distance}</Text>
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
      data={filteredData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => renderItem({ item })}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  iconAndDistanceContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    marginLeft: 10,
  },
  icon: {
    width: 10,
    height: 15,
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
  },
  address: {
    fontSize: 14,
    color: "#888",
    fontFamily: "SUITE-Regular",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
});

export default SearchResultList;
