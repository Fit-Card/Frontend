import React, { useRef, useEffect, useState } from "react";
import { View, Alert, TouchableOpacity, Text, ActivityIndicator, Image } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import SearchInput from "@/components/map/SearchBox";
import CategoryButtonGroup from "@/components/category/CategoryButtonGroup";
import GpsButton from "@/components/map/GpsButton";
import SearchResultList from "@/components/map/SearchResultList";
import BottomSheetContent from "@/components/map/BottomSheetContent";
import StoreDummy from "@/components/map/StoreDummy";
import styles from "@/components/map/MapComponentStyle";

const ITEMS_PER_PAGE = 5;

type LocationType = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

// 두 좌표 사이의 거리를 계산하는 함수 (하버사인 공식)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; // 지구의 반지름 (단위: 미터)
  const rad = (x: number) => (x * Math.PI) / 180; // 라디안으로 변환

  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // 두 좌표 간의 거리 (단위: 미터)
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

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        // 초기 위치를 region에 저장
        const initialRegion = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(initialRegion);
        setPreviousRegion(initialRegion); // 처음 위치를 previousRegion에 저장
      } catch (error) {
        Alert.alert("Error fetching location data");
      } finally {
        setIsLoading(false); // 로딩 상태를 false로 설정
      }
    })();
  }, []);

  // 사용자가 보고 있는 지도 범위를 업데이트하는 함수
  const onRegionChangeComplete = (newRegion: Region) => {
    if (previousRegion) {
      // 두 좌표 사이의 거리를 계산
      const distance = calculateDistance(
        previousRegion.latitude,
        previousRegion.longitude,
        newRegion.latitude,
        newRegion.longitude
      );

      // 100m 이상 차이가 나는 경우에만 '이 지역 재검색' 버튼을 표시
      if (distance > 100) {
        setIsRegionChanged(true);
      }
    }

    setRegion(newRegion); // 새로운 지도 범위를 저장
  };

  // 카테고리 버튼 클릭 시 필터링된 마커를 업데이트
  const handleButtonPress = (categoryId: number) => {
    setSelectedButton(categoryId);
    setCurrentPage(1); // 페이지 초기화
    filterStoresByCategoryAndRegion(region, categoryId);

    if (
      previousRegion &&
      (previousRegion.latitude !== region?.latitude ||
        previousRegion.longitude !== region?.longitude)
    ) {
      setPreviousRegion(region); // 현재 보고 있는 위치를 previousRegion으로 업데이트
    }

    setIsRegionChanged(false); // 카테고리 선택 후 지도 이동이 없으므로 버튼 숨김
  };

  // 현재 지도 영역과 카테고리에 따른 스토어 필터링 함수
  const filterStoresByCategoryAndRegion = (region: Region | null, categoryId: number | null) => {
    if (!region) return;

    const filteredData = StoreDummy.filter((store) => {
      const isWithinLatitude =
        store.latitude >= region.latitude - region.latitudeDelta / 2 &&
        store.latitude <= region.latitude + region.latitudeDelta / 2;
      const isWithinLongitude =
        store.longitude >= region.longitude - region.longitudeDelta / 2 &&
        store.longitude <= region.longitude + region.longitudeDelta / 2;

      const isWithinCategory = categoryId !== null ? store.category === categoryId : true;

      return isWithinLatitude && isWithinLongitude && isWithinCategory;
    });

    setFilteredStores(filteredData);

    // 검색 결과가 5개 이상일 경우 '더보기' 버튼 표시
    if (filteredData.length > ITEMS_PER_PAGE) {
      setIsLoadMoreVisible(true);
    } else {
      setIsLoadMoreVisible(false);
    }
  };

  // "이 지역 재검색" 버튼을 눌렀을 때 호출되는 함수
  const handleRegionSearch = () => {
    if (region && selectedButton !== null) {
      // 마커를 모두 지우기 위해 필터링된 스토어를 초기화
      setFilteredStores([]);

      filterStoresByCategoryAndRegion(region, selectedButton);
      setCurrentPage(1);
      // 현재 region을 previousRegion으로 저장
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

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setShowSearchResults(false);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleGpsButtonPress = async () => {
    try {
      // 현재 위치를 얻어옴
      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log("Current location:", currentLocation); // 위치 정보 출력
      // 위치 상태를 업데이트
      setLocation(currentLocation);

      // 맵의 참조(mapRef)가 존재하고 현재 위치 정보가 있다면
      if (mapRef.current && currentLocation) {
        const { latitude, longitude } = currentLocation.coords;
        const newRegion: Region = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        // 맵의 위치를 애니메이션을 통해 새로운 위치로 이동
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to retrieve GPS location");
      console.error("Error fetching GPS location: ", error);
    }
  };

  const handleLocationSelect = (
    latitude: number,
    longitude: number,
    name: string,
    address: string
  ) => {
    setSelectedLocation({ latitude, longitude, name, address, id: "" });

    if (mapRef.current) {
      const newRegion: Region = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(newRegion, 1000);
    }

    setShowSearchResults(false);
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
      sheetRef.current.expand();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  // 현재 페이지에 맞는 스토어 목록을 계산
  const displayedStores = filteredStores.slice(0, currentPage * ITEMS_PER_PAGE);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput
          value={searchQuery}
          onChangeText={handleSearchChange}
          onSubmit={handleSearchSubmit}
          onClear={handleClearSearch}
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
          <SearchResultList searchQuery={searchQuery} onSelectLocation={handleLocationSelect} />
        </View>
      )}
      <GpsButton onPress={handleGpsButtonPress} />

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
