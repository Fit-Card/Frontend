import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";

type StoreItem = {
  id: string;
  name: string;
  address: string;
  distance: string;
  latitude: number;
  longitude: number;
};

type SearchResultListProps = {
  searchQuery: string;
  onSelectLocation: (latitude: number, longitude: number, name: string, address: string) => void; // 인자를 추가
};

const dummyData: StoreItem[] = [
  {
    id: "1",
    name: "s바나프레소 역삼점",
    address: "서울특별시 강남구 논현로94길 13",
    distance: "0.3km",
    latitude: 37.499979,
    longitude: 127.03735,
  },
  {
    id: "2",
    name: "s바나프레소 신논현역점",
    address: "서울특별시 서초구 서초4동 사평대로 364",
    distance: "0.8km",
    latitude: 37.505358,
    longitude: 127.025104,
  },
  {
    id: "3",
    name: "s바나프레소 강남점",
    address: "서울특별시 강남구 테헤란로4길 46",
    distance: "1.3km",
    latitude: 37.498087,
    longitude: 127.028577,
  },
  {
    id: "4",
    name: "s바나프레소 선릉역사거리점",
    address: "서울특별시 강남구 역삼동 705-19",
    distance: "2.0km",
    latitude: 37.504347,
    longitude: 127.049046,
  },
];

const renderItem = ({
  item,
  onSelectLocation,
}: {
  item: StoreItem;
  onSelectLocation: (latitude: number, longitude: number, name: string, address: string) => void;
}) => (
  <TouchableOpacity
    onPress={() => onSelectLocation(item.latitude, item.longitude, item.name, item.address)}
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

const SearchResultList = ({ searchQuery, onSelectLocation }: SearchResultListProps) => {
  const filteredData = dummyData.filter((item) => item.name.includes(searchQuery));

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => renderItem({ item, onSelectLocation })}
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
