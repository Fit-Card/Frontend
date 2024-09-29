import React, { useRef, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import SearchInput from "@/components/map/SearchBox";
import CategoryButtonGroup from "@/components/category/CategoryButtonGroup";
import GpsButton from "@/components/map/GpsButton";
import SearchResultList from "@/components/map/SearchResultList";
import BottomSheetContent from "@/components/map/BottomSheetContent";
import styles from "@/components/map/MapComponentStyle";
import SearchComponent from "@/components/map/SingleSearch";

import {
  getLocationAsync,
  onRegionChangeCompleteHandler,
  handleButtonPressHandler,
  filterStoresByCategoryAndRegion,
  handleGpsButtonPress,
} from "@/components/map/MapComponentHandler";

const ITEMS_PER_PAGE = 5;

type LocationType = {
  id: number;
  name: string;
  address: string;
  distance: number;
  latitude: number;
  longitude: number;
  kakaoUrl: string;
};

const MapComponent = () => {
  const mapRef = useRef<MapView>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [filteredStores, setFilteredStores] = useState<LocationType[]>([]);
  const [region, setRegion] = useState<Region | null>(null); // 현재 지도 중심값
  const [previousRegion, setPreviousRegion] = useState<Region | null>(null); // 이전 지도 중심값
  const [isRegionChanged, setIsRegionChanged] = useState<boolean>(false); // 지도 이동 감지
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState<boolean>(false); // '결과 더보기' 버튼 표시 여부
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState<boolean>(false); // '결과 더보기' 버튼 비활성화 상태
  const [searchResults, setSearchResults] = useState<LocationType[]>([]);

  const [pageNo, setPageNo] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // 초기 위치 얻기
  useEffect(() => {
    getLocationAsync(setLocation, setRegion, setPreviousRegion, setIsLoading);
  }, []);

  // 지도 영역 변경 시 호출
  const onRegionChangeComplete = (newRegion: Region) => {
    onRegionChangeCompleteHandler(newRegion, previousRegion, setIsRegionChanged, setRegion);
  };

  // 카테고리 버튼 클릭 시 호출
  const handleButtonPress = (categoryId: number) => {
    handleButtonPressHandler(
      categoryId,
      region,
      setSelectedButton,
      (region, categoryId) =>
        filterStoresByCategoryAndRegion(region, categoryId, setFilteredStores, setIsLoadMoreVisible) // 상태 추가
    );
  };

  // '이 지역 재검색' 버튼을 눌렀을 때 호출되는 함수
  const handleRegionSearch = () => {
    if (region && selectedButton !== null) {
      setFilteredStores([]);
      filterStoresByCategoryAndRegion(
        region,
        selectedButton,
        setFilteredStores,
        setIsLoadMoreVisible
      ); // 상태 추가
      setCurrentPage(1);
      setPreviousRegion(region); // 현재 region을 저장하여 이후 비교에 사용
      setIsRegionChanged(false); // '이 지역 재검색' 버튼을 숨김
    }
  };

  // '결과 더보기' 버튼을 클릭하면 5개씩 더 표시
  const handleLoadMore = () => {
    if (currentPage * ITEMS_PER_PAGE >= filteredStores.length) {
      setIsLoadMoreDisabled(true); // 더 로드할 항목이 없을 경우 비활성화
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
    setIsLoadMoreDisabled(false); // 더 로드 가능 시 다시 활성화
  };

  const handleMarkerPress = (
    id: number,
    name: string,
    address: string,
    distance: number,
    latitude: number,
    longitude: number,
    kakaoUrl: string
  ) => {
    setSelectedMarker(id); // 클릭한 마커의 id를 저장하여 선택된 마커 추적
    setSelectedLocation({ id, name, address, distance, latitude, longitude, kakaoUrl });

    if (sheetRef.current) {
      sheetRef.current.expand(); // BottomSheet 확장
    }
  };

  const handleSearchResults = (results: any[]) => {
    const parsedResults = results.map((item) => ({
      id: item.merchantBranchId,
      name: item.branchName,
      address: item.branchAddress,
      distance: item.distance,
      latitude: item.latitude,
      longitude: item.longitude,
      kakaoUrl: item.kakaoUrl,
    }));
    setSearchResults(parsedResults);
  };

  // 현재 페이지에 맞는 스토어 목록을 계산
  const displayedStores = filteredStores.slice(0, currentPage * ITEMS_PER_PAGE);
  const handleSearchSubmit = (results: any[], page: number) => {
    if (page === 1) {
      setSearchResults(results); // 첫 페이지는 새로 고침
    } else {
      setSearchResults((prevResults) => [...prevResults, ...results]); // 다음 페이지는 추가
    }

    // 추가 데이터를 더 이상 로드할 필요가 없는 경우
    if (results.length < ITEMS_PER_PAGE) {
      // ITEMS_PER_PAGE 미만이면 더 이상 데이터 없음
      setHasMore(false);
    }
  };

  const handleSearchMore = () => {
    if (hasMore) {
      const nextPage = pageNo + 1; // 다음 페이지 번호
      setPageNo(nextPage); // 페이지 번호 업데이트
      handleSearchSubmit([], nextPage); // 다음 페이지에 대한 데이터 요청
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchComponent
          location={location} // 현재 위치는 부모에서 관리
          mapRef={mapRef}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CategoryButtonGroup selectedButton={selectedButton} onButtonPress={handleButtonPress} />
      </View>

      {/* "이 지역 재검색" 버튼 */}
      {selectedButton !== null && isRegionChanged && (
        <View style={styles.regionSearchButtonContainer}>
          <TouchableOpacity style={styles.regionSearchButton} onPress={handleRegionSearch}>
            <Text style={styles.regionSearchButtonText}>이 지역 재검색</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 검색 결과가 많을 때 "결과 더보기" 버튼 표시 */}
      {isLoadMoreVisible && !isRegionChanged && (
        <View style={styles.regionSearchButtonContainer}>
          <TouchableOpacity
            style={styles.regionSearchButton}
            onPress={handleLoadMore}
            disabled={isLoadMoreDisabled} // 버튼 비활성화 여부 결정
          >
            <Text style={styles.regionSearchButtonText}>
              결과 더보기 ({currentPage}/{Math.ceil(filteredStores.length / ITEMS_PER_PAGE)})
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <GpsButton onPress={() => handleGpsButtonPress(setLocation, mapRef, setRegion)} />
      {/* 지도 */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider="google"
        showsUserLocation={true}
        followsUserLocation={true}
        region={region || undefined}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {displayedStores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            onPress={() =>
              handleMarkerPress(
                store.id,
                store.name,
                store.address,
                store.distance,
                store.latitude,
                store.longitude,
                store.kakaoUrl
              )
            }
          >
            <Image
              source={
                selectedMarker === store.id
                  ? require("@/assets/images/normal-marker.png") // 선택된 마커의 아이콘
                  : require("@/assets/images/active-marker.png") // 기본 마커의 아이콘
              }
              style={{
                width: selectedMarker === store.id ? 40 : 40, // 선택된 마커는 더 크게, 기본 마커는 작게
                height: selectedMarker === store.id ? 40 : 40, // 이미지 크기를 조절
              }}
              resizeMode="contain" // 이미지 비율 유지
            />
          </Marker>
        ))}
      </MapView>

      <BottomSheet ref={sheetRef} snapPoints={[250]} index={-1} enablePanDownToClose={true}>
        <BottomSheetScrollView>
          <BottomSheetContent selectedLocation={selectedLocation} />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default MapComponent;
