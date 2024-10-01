import React, { useRef, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useRoute, RouteProp } from "@react-navigation/native"; // useRoute 추가
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import CategoryButtonGroup from "@/components/category/CategoryButtonGroup";
import GpsButton from "@/components/map/GpsButton";
import BottomSheetContent from "@/components/map/BottomSheetContent";
import styles from "@/components/map/MapComponentStyle";
import SearchComponent from "@/components/map/SingleSearch";
import { StackParamList } from "@/navigationTypes";
import { LocationType, SelectedLocationType } from "@/components/map/LocationType";
import { mockUser } from "@/mock/mockUser";
import axios from "axios";

import {
  getLocationAsync,
  onRegionChangeCompleteHandler,
  handleButtonPressHandler,
  filterStoresByCategoryAndRegion,
  handleGpsButtonPress,
} from "@/components/map/MapComponentHandler";

const ITEMS_PER_PAGE = 10;

const MapComponent = () => {
  const mapRef = useRef<MapView>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
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

  // Route에서 전달된 값 받아오기 (위도, 경도)
  const route = useRoute<RouteProp<StackParamList, "Map">>();
  const { store } = route.params || {}; // 전달된 위도, 경도 값 받기

  // 초기 위치 얻기
  useEffect(() => {
    getLocationAsync(setLocation, setRegion, setPreviousRegion, setIsLoading);
  }, []);

  // 지도 영역 변경 시 호출
  const onRegionChangeComplete = (newRegion: Region) => {
    onRegionChangeCompleteHandler(newRegion, previousRegion, setIsRegionChanged, setRegion);
  };

  // 전달된 위도, 경도가 있을 때 지도 이동
  useEffect(() => {
    if (store) {
      const initialRegion = {
        latitude: store.latitude,
        longitude: store.longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
      };
      mapRef.current?.animateToRegion(initialRegion, 1000);
      setSelectedLocation(store); // 넘겨받은 store 데이터를 선택된 위치로 설정
      setSelectedMarker(store.id); // 넘겨받은 store의 ID를 마커로 설정
    }
  }, [store]);

  // '결과 더보기' 버튼을 클릭하면 5개씩 더 표시
  const handleLoadMore = () => {
    if (currentPage * ITEMS_PER_PAGE >= filteredStores.length) {
      setIsLoadMoreDisabled(true); // 더 로드할 항목이 없을 경우 비활성화
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
    setIsLoadMoreDisabled(false); // 더 로드 가능 시 다시 활성화
  };

  // 마커 선택 시 이벤트
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
  }; // GPS 버튼 눌렀을 때 현재 위치를 가져오고 지도를 해당 위치로 이동
  const handleGpsPress = async () => {
    const currentLocation = await Location.getCurrentPositionAsync({});
    console.log(currentLocation); // 위치 값 확인
    if (currentLocation) {
      const { latitude, longitude } = currentLocation.coords;
      const newRegion: Region = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setLocation(currentLocation);

      // mapRef가 제대로 설정되었는지 확인
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
        console.log(newRegion);
      }
    }
  };
  const handleCategorySelection = async (category: string, region: Region) => {
    try {
      const response = await axios.post(
        "http://j11a405.p.ssafy.io:8081/branches/category-page?pageNo=1",
        {
          category: category, // 실제 선택된 카테고리 사용
          leftLatitude: parseFloat((region.latitude + region.latitudeDelta / 2).toFixed(2)),
          rightLatitude: parseFloat((region.latitude - region.latitudeDelta / 2).toFixed(2)),
          leftLongitude: parseFloat((region.longitude - region.longitudeDelta / 2).toFixed(2)),
          rightLongitude: parseFloat((region.longitude + region.longitudeDelta / 2).toFixed(2)),
        },
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`, // Replace with the actual token
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      const branchResponses = response.data.data.branchResponses;
      const mappedStores = branchResponses.map((branch: any) => ({
        id: branch.merchantBranchId, // 응답의 필드명에 따라 맞춰줌
        name: branch.branchName,
        address: branch.branchAddress,
        latitude: branch.latitude,
        longitude: branch.longitude,
        kakaoUrl: branch.kakaoUrl,
        category: branch.category,
      }));

      setFilteredStores(mappedStores); // 매핑된 데이터를 저장
      console.log(mappedStores);
    } catch (error) {
      console.error("API request failed:", error);
    }
  };
  // 현재 페이지에 맞는 스토어 목록을 계산
  const displayedStores = filteredStores.slice(0, currentPage * ITEMS_PER_PAGE);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {location && (
          <SearchComponent
            location={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            mapRef={mapRef}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <CategoryButtonGroup
          selectedButton={selectedButton}
          onButtonPress={(categoryCode) => {
            if (region) {
              handleCategorySelection(categoryCode, region);
            }

            setSelectedButton(categoryCode); // Update the selected button based on the code
          }}
        />
      </View>

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
      <GpsButton onPress={handleGpsPress} />
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

        {/* 선택된 위치 마커 */}
        {store && store.latitude && store.longitude && (
          <Marker
            coordinate={{ latitude: store.latitude, longitude: store.longitude }}
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
              source={require("@/assets/images/normal-marker.png")} // 선택된 위치 아이콘
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </Marker>
        )}
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
