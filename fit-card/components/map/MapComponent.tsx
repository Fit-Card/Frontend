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

import {
  getLocationAsync,
  onRegionChangeCompleteHandler,
  handleButtonPressHandler,
  filterStoresByCategoryAndRegion,
  handleGpsButtonPress,
} from "@/components/map/MapComponentHandler";

const ITEMS_PER_PAGE = 5;

type LocationType = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

const MapComponent = () => {
  const mapRef = useRef<MapView>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [filteredStores, setFilteredStores] = useState<LocationType[]>([]);
  const [region, setRegion] = useState<Region | null>(null); // 현재 지도 중심값
  const [previousRegion, setPreviousRegion] = useState<Region | null>(null); // 이전 지도 중심값
  const [isRegionChanged, setIsRegionChanged] = useState<boolean>(false); // 지도 이동 감지
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState<boolean>(false); // '결과 더보기' 버튼 표시 여부
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState<boolean>(false); // '결과 더보기' 버튼 비활성화 상태

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
    id: string,
    name: string,
    address: string,
    latitude: number,
    longitude: number
  ) => {
    setSelectedMarker(id); // 클릭한 마커의 id를 저장하여 선택된 마커 추적
    setSelectedLocation({ id, name, address, latitude, longitude });

    if (sheetRef.current) {
      sheetRef.current.expand(); // BottomSheet 확장
    }
  };

  // 현재 페이지에 맞는 스토어 목록을 계산
  const displayedStores = filteredStores.slice(0, currentPage * ITEMS_PER_PAGE);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput
          onSubmit={(query) => {
            setSearchQuery(query);
            setShowSearchResults(true);
          }}
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
      {showSearchResults && (
        <View style={styles.resultContainer}>
          <SearchResultList
            searchQuery={searchQuery}
            mapRef={mapRef} // mapRef를 전달
            setShowSearchResults={setShowSearchResults} // 검색 결과 숨김 처리 함수 전달
          />
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
                store.latitude,
                store.longitude
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
