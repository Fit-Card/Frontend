import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Alert, TouchableOpacity, Text, ActivityIndicator } from "react-native";
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
  const [latitude, setLatitude] = useState<number | null>(null); // 현재 위도 상태
  const [longitude, setLongitude] = useState<number | null>(null); // 현재 경도 상태
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  const [filteredStores, setFilteredStores] = useState<LocationType[]>([]); // 초기값 빈 배열
  const [region, setRegion] = useState<Region | null>(null); // 사용자가 보고 있는 지도 영역
  const [isRegionChanged, setIsRegionChanged] = useState<boolean>(false); // 지도 이동 감지
  const [isLoading, setIsLoading] = useState(true);

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
        setLatitude(currentLocation.coords.latitude); // 위도 설정
        setLongitude(currentLocation.coords.longitude); // 경도 설정

        // 지도 중심을 현재 위치로 설정
        setRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (error) {
        Alert.alert("Error fetching location data");
      } finally {
        setIsLoading(false); // 로딩 상태를 false로 설정
      }
    })();
  }, []);

  // 사용자가 보고 있는 지도 범위를 업데이트하는 함수
  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion); // 현재 보고 있는 지도 범위를 저장
    setIsRegionChanged(true); // 지도가 이동되었음을 표시
  };

  // 카테고리 버튼 클릭 시 필터링된 마커를 업데이트
  const handleButtonPress = (categoryId: number) => {
    setSelectedButton(categoryId);
    filterStoresByCategoryAndRegion(region, categoryId);
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

    setFilteredStores(filteredData); // 필터링된 스토어들만 저장
    setIsRegionChanged(false); // 재검색 후 버튼 숨기기

    // 필터링된 마커들이 화면 중앙에 오도록 지도 설정
    if (filteredData.length > 0 && mapRef.current) {
      const coordinates = filteredData.map((store) => ({
        latitude: store.latitude,
        longitude: store.longitude,
      }));

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 70 }, // 여백 설정
        animated: true, // 애니메이션 적용
      });
    }
  };

  if (isLoading) {
    // 로딩 중일 때 ActivityIndicator 표시
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5253F0" />
      </View>
    );
  }

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
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    setLatitude(currentLocation.coords.latitude); // GPS 버튼 클릭 시 위도 업데이트
    setLongitude(currentLocation.coords.longitude); // GPS 버튼 클릭 시 경도 업데이트

    if (mapRef.current && currentLocation) {
      const { latitude, longitude } = currentLocation.coords;
      const newRegion: Region = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(newRegion, 1000);
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
    setSelectedLocation({ id, name, address, latitude, longitude });

    if (sheetRef.current) {
      sheetRef.current.expand(); // 마커 클릭 시 바텀시트 확장
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (sheetRef.current) {
      sheetRef.current.close(); // 바텀시트를 닫음
    }
  };

  // "이 지역 재검색" 버튼을 눌렀을 때 호출되는 함수
  const handleRegionSearch = () => {
    if (region && selectedButton !== null) {
      const filteredData = StoreDummy.filter((store) => {
        const isWithinLatitude =
          store.latitude >= region.latitude - region.latitudeDelta / 2 &&
          store.latitude <= region.latitude + region.latitudeDelta / 2;
        const isWithinLongitude =
          store.longitude >= region.longitude - region.longitudeDelta / 2 &&
          store.longitude <= region.longitude + region.longitudeDelta / 2;

        const isWithinCategory = store.category === selectedButton;

        return isWithinLatitude && isWithinLongitude && isWithinCategory;
      });

      // 필터링된 스토어들의 중앙 좌표를 계산
      if (filteredData.length > 0) {
        const totalLatitude = filteredData.reduce((sum, store) => sum + store.latitude, 0);
        const totalLongitude = filteredData.reduce((sum, store) => sum + store.longitude, 0);
        const averageLatitude = totalLatitude / filteredData.length;
        const averageLongitude = totalLongitude / filteredData.length;

        // 계산된 중앙 좌표로 설정
        setLatitude(averageLatitude);
        setLongitude(averageLongitude);

        // 지도 이동
        if (mapRef.current) {
          const newRegion: Region = {
            latitude: averageLatitude,
            longitude: averageLongitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          };
          mapRef.current.animateToRegion(newRegion, 1000);
        }
      }

      setFilteredStores(filteredData); // 필터링된 데이터를 상태로 저장
    }

    setIsRegionChanged(false); // 재검색 후 버튼 숨기기
  };

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
        region={region || undefined} // null 대신 undefined로 처리하여 null 값 회피
        onRegionChangeComplete={onRegionChangeComplete} // 지도 범위 변경 시 호출
      >
        {/* 필터링된 스토어들에 마커 표시 */}
        {filteredStores.map((store) => (
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
          />
        ))}
      </MapView>

      <BottomSheet ref={sheetRef} snapPoints={[350]} index={-1} enablePanDownToClose={true}>
        <BottomSheetScrollView>
          <BottomSheetContent selectedLocation={selectedLocation} />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  locationTextContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  locationText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  regionSearchButtonContainer: {
    position: "absolute",
    top: 90,
    alignSelf: "center",
    zIndex: 10,
  },
  regionSearchButton: {
    backgroundColor: "#fff", // 원하는 색상
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 30, // 둥근 모서리
    elevation: 5, // 그림자 (Android)
  },
  regionSearchButtonText: {
    color: "#5253F0",
    fontSize: 13,
    textAlign: "center",
    fontFamily: "SUITE-Bold",
  },
  resultContainer: {
    position: "absolute",
    top: 200,
    left: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    padding: 10,
  },
});
