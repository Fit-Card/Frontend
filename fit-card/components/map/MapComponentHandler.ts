// mapHandlers.ts

import { Region } from "react-native-maps";
import MapView from "react-native-maps";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import StoreDummy from "@/components/map/StoreDummy";

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

// 두 좌표 사이의 거리를 계산하는 함수 (하버사인 공식)
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
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

// 현재 위치를 얻고 지도 중심을 초기화하는 함수
export const getLocationAsync = async (
  setLocation: (location: LocationObject | null) => void,
  setRegion: (region: Region | null) => void,
  setPreviousRegion: (region: Region | null) => void,
  setIsLoading: (loading: boolean) => void
) => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

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
};

// 지도 이동 시 새로운 영역을 설정하는 함수
export const onRegionChangeCompleteHandler = (
  newRegion: Region,
  previousRegion: Region | null,
  setIsRegionChanged: (isChanged: boolean) => void,
  setRegion: (region: Region) => void
) => {
  if (previousRegion) {
    const distance = calculateDistance(
      previousRegion.latitude,
      previousRegion.longitude,
      newRegion.latitude,
      newRegion.longitude
    );

    if (distance > 100) {
      setIsRegionChanged(true); // 100m 이상 차이가 나는 경우만 업데이트
    }
  }

  setRegion(newRegion); // 새로운 지도 범위 설정
};

// 카테고리 버튼 클릭 시 지도 필터링 함수
export const handleButtonPressHandler = (
  categoryId: number,
  region: Region | null,
  setSelectedButton: (id: number | null) => void,
  filterStoresByCategoryAndRegion: (region: Region | null, categoryId: number | null) => void
) => {
  setSelectedButton(categoryId);
  filterStoresByCategoryAndRegion(region, categoryId);
};

// 필터링된 가게 목록을 얻는 함수
export const filterStoresByCategoryAndRegion = (
  region: Region | null,
  categoryId: number | null,
  setFilteredStores: (stores: LocationType[]) => void,
  setIsLoadMoreVisible: (visible: boolean) => void // isLoadMoreVisible 상태 추가
) => {
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

export const handleGpsButtonPress = async (
  setLocation: (location: Location.LocationObject | null) => void,
  mapRef: React.RefObject<MapView>,
  setRegion: (region: Region) => void
) => {
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
