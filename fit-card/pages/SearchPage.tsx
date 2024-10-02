import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native"; // navigation 추가
import { StackParamList } from "@/navigationTypes"; // StackParamList 타입 정의
import { mockUser } from "@/mock/mockUser"; // 토큰 정보
import { StackNavigationProp } from "@react-navigation/stack"; // navigation 타입 추가
import { LocationType } from "@/components/map/LocationType";

type SearchPageRouteProp = RouteProp<StackParamList, "SearchPage">;

const SearchPage = () => {
  const route = useRoute<SearchPageRouteProp>();
  const { latitude, longitude } = route.params; // SearchComponent에서 받은 위치 정보
  const navigation = useNavigation<StackNavigationProp<StackParamList>>(); // navigation 사용
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<LocationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 추가 페이지 여부

  useEffect(() => {
    // 검색어가 입력되면 API 요청
    if (searchQuery.length > 0) {
      setPage(1); // 검색어가 바뀔 때 페이지를 초기화
      handleSearchSubmit(1); // 첫 페이지부터 시작
      setHasMore(true);
    }
  }, [searchQuery]);

  const handleSearchSubmit = async (pageNo: number) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://j11a405.p.ssafy.io:8081/branches/search-page?pageNo=${pageNo}`,
        {
          merchantNameKeyword: searchQuery,
          latitude,
          longitude,
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
      console.log(response.data.data.branchResponses);

      if (pageNo === 1) {
        setSearchResults(results); // 처음에는 결과를 덮어씀
      } else {
        setSearchResults((prevResults) => [...prevResults, ...results]); // 추가 페이지를 이어 붙임
      }

      // 더 이상 로드할 페이지가 없으면 hasMore를 false로 설정
      if (results.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const formatDistance = (distance: number): string => {
    if (distance < 1000) {
      return `${distance}m`;
    } else {
      return `${(distance / 1000).toFixed(1)}km`;
    }
  };

  // 스토어 선택 시 지도에 마커 추가하기 위해 MapComponent로 이동
  const handleStoreSelect = (store: LocationType) => {
    navigation.navigate("Map", {
      store,
    });
  };
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      handleSearchSubmit(nextPage);
    }
  };

  const renderItem = ({ item }: { item: LocationType }) => (
    <TouchableOpacity onPress={() => handleStoreSelect(item)}>
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
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="검색어를 입력하세요"
        value={searchQuery}
        onChangeText={handleSearchChange}
        autoFocus={true}
      />
      {loading && page === 1 ? ( // 첫 페이지 로딩 중일 때 표시
        <Text>검색 중...</Text>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={handleLoadMore} // 리스트의 끝에 도달했을 때 추가 로딩
          onEndReachedThreshold={0.3} // 리스트 끝에서 50% 남았을 때 handleLoadMore 호출
          ListFooterComponent={loading && page > 1 ? <Text>더 불러오는 중...</Text> : null} // 추가 페이지 로딩 중일 때 표시
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    paddingLeft: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    borderColor: "#d0d0d0",
    borderWidth: 2,
    fontFamily: "SUITE-Bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  icon: {
    width: 10,
    height: 15,
    marginRight: 15,
    marginLeft: 15,
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
    fontFamily: "SUITE-Regular",
    color: "#555",
  },
  iconAndDistanceContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  distance: {
    fontSize: 10,
    fontFamily: "SUITE-Bold",
    color: "#888",
  },
});

export default SearchPage;
