import React, { useRef, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useRoute, RouteProp } from "@react-navigation/native";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import CategoryButtonGroup from "@/components/category/CategoryButtonGroup";
import GpsButton from "@/components/map/GpsButton";
import BottomSheetContent from "@/components/map/BottomSheetContent";
import styles from "@/components/map/MapComponentStyle";
import SearchComponent from "@/components/map/SingleSearch";
import { StackParamList } from "@/navigationTypes";
import { LocationType } from "@/components/map/LocationType";
import { mockUser } from "@/mock/mockUser";
import axios from "axios";

import { getLocationAsync, calculateDistance } from "@/components/map/MapComponentHandler";

const ITEMS_PER_PAGE = 10;

const MapComponent = () => {
  const mapRef = useRef<MapView>(null);
  const sheetRef = useRef<BottomSheet>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
  const [filteredStores, setFilteredStores] = useState<LocationType[]>([]);
  const [region, setRegion] = useState<Region | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isRegionChanged, setIsRegionChanged] = useState<boolean>(false); // 지도 이동 감지 상태
  const [pageInfo, setPageInfo] = useState<number>(0);

  // Route에서 전달된 값 받아오기 (위도, 경도)
  const route = useRoute<RouteProp<StackParamList, "Map">>();
  const { store } = route.params || {};

  // 초기 위치 및 전달된 store 값에 따른 지도 이동 처리
  useEffect(() => {
    const initializeLocation = async () => {
      await getLocationAsync(setLocation, setRegion, setIsLoading);

      if (store) {
        const initialRegion = {
          latitude: store.latitude,
          longitude: store.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        // 약간의 지연을 주어 맵이 제대로 렌더링되었을 때 animateToRegion을 호출
        setTimeout(() => {
          mapRef.current?.animateToRegion(initialRegion, 1000);
        }, 500);

        setSelectedLocation(store);
      }

      console.log("처음 region", region);
    };

    initializeLocation();
  }, [store]);

  // 지도 영역 변경 시 호출
  const onRegionChangeComplete = (newRegion: Region) => {
    if (region) {
      const distance = calculateDistance(
        region.latitude,
        region.longitude,
        newRegion.latitude,
        newRegion.longitude
      );

      // 100m 이상 차이 나는 경우만 업데이트 (새 지역 검색 버튼 활성화)
      if (distance > 100) {
        setRegion(newRegion);
        setIsRegionChanged(true); // 지도 이동이 감지되면 "이 지역 재검색" 버튼을 보여줌
      }
    } else {
      setRegion(newRegion);
    }
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
    setSelectedLocation(null);
    setSelectedLocation({ id, name, address, distance, latitude, longitude, kakaoUrl });

    if (sheetRef.current) {
      sheetRef.current.expand();
    }
  };

  // GPS 버튼 눌렀을 때 현재 위치를 가져오고 지도를 해당 위치로 이동
  const handleGpsPress = async () => {
    const currentLocation = await Location.getCurrentPositionAsync({});
    if (currentLocation) {
      const { latitude, longitude } = currentLocation.coords;
      const newRegion: Region = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setLocation(currentLocation);

      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    }
  };

  const loadData = async (category: string, pageNo: number, region: Region) => {
    try {
      const response = await axios.post(
        `http://j11a405.p.ssafy.io:8081/branches/category-page?pageNo=${pageNo}`,
        {
          category: category,
          leftLatitude: region.latitude + region.latitudeDelta / 2,
          rightLatitude: region.latitude - region.latitudeDelta / 2,
          leftLongitude: region.longitude - region.longitudeDelta / 2,
          rightLongitude: region.longitude + region.longitudeDelta / 2,
        },
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      const leftLatitude = region.latitude + region.latitudeDelta / 2;
      const rightLatitude = region.latitude - region.latitudeDelta / 2;
      const leftLongitude = region.longitude - region.longitudeDelta / 2;
      const rightLongitude = region.longitude + region.longitudeDelta / 2;

      console.log(leftLatitude);
      console.log(rightLatitude);
      console.log(leftLongitude);
      console.log(rightLongitude);

      const branchResponses = response.data.data.branchResponses;
      const mappedStores = branchResponses.map((branch: any) => ({
        id: branch.merchantBranchId,
        name: branch.branchName,
        address: branch.branchAddress,
        latitude: branch.latitude,
        longitude: branch.longitude,
        kakaoUrl: branch.kakaoUrl,
        category: branch.category,
      }));

      if (pageNo === 1) {
        setFilteredStores(mappedStores);
      } else {
        setFilteredStores((prevStores) => [...prevStores, ...mappedStores]);
      }
      console.log(response.data.data.branchResponses);

      setCurrentPage(pageNo);
      setIsLoadMoreVisible(pageNo < response.data.data.totalPages);
      setIsRegionChanged(false); // 재검색 후 "이 지역 재검색" 버튼 숨김
      setPageInfo(response.data.data.totalPages);
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  const handleCategorySelection = (category: string) => {
    setSelectedButton(category);
    setFilteredStores([]);
    if (region) {
      loadData(category, 1, region);
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    if (selectedButton && region) {
      loadData(selectedButton, nextPage, region);
    }
  };

  // "이 지역 재검색" 버튼 클릭 시
  const handleRegionReselect = () => {
    if (selectedButton && region) {
      loadData(selectedButton, 1, region); // 현재 지역을 기준으로 다시 첫 페이지 로드
    }
  };

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
            handleCategorySelection(categoryCode);
          }}
        />
      </View>

      {/* "이 지역 재검색" 버튼 */}
      {isRegionChanged && selectedButton && (
        <View style={styles.regionSearchButtonContainer}>
          <TouchableOpacity style={styles.regionSearchButton} onPress={handleRegionReselect}>
            <Text style={styles.regionSearchButtonText}>이 지역 재검색</Text>
          </TouchableOpacity>
        </View>
      )}

      {isLoadMoreVisible && !isRegionChanged && (
        <View style={styles.regionSearchButtonContainer}>
          <TouchableOpacity style={styles.regionSearchButton} onPress={handleLoadMore}>
            <Text style={styles.regionSearchButtonText}>
              결과 더보기 ({currentPage}/{pageInfo})
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <GpsButton onPress={handleGpsPress} />
      <MapView
        ref={mapRef}
        style={styles.map}
        provider="google"
        showsUserLocation={true}
        followsUserLocation={true}
        region={region || undefined}
        onRegionChangeComplete={onRegionChangeComplete}
        showsMyLocationButton={false}
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
                selectedLocation && selectedLocation.id === store.id
                  ? require("@/assets/images/normal-marker.png")
                  : require("@/assets/images/active-marker.png")
              }
              style={{
                width: selectedLocation && selectedLocation.id === store.id ? 40 : 40,
                height: selectedLocation && selectedLocation.id === store.id ? 40 : 40,
              }}
              resizeMode="contain"
            />
          </Marker>
        ))}

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
            {selectedLocation?.id === store.id ? (
              <Image
                source={require("@/assets/images/normal-marker.png")}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("@/assets/images/active-marker.png")}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            )}
          </Marker>
        )}
      </MapView>

      <BottomSheet ref={sheetRef} snapPoints={[250]} index={-1} enablePanDownToClose={true}>
        <BottomSheetScrollView>
          {selectedLocation && (
            <BottomSheetContent
              selectedLocation={selectedLocation}
              merchantId={selectedLocation.id}
            />
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default MapComponent;
