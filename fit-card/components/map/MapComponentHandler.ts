// mapHandlers.ts

import { Region } from "react-native-maps";
import MapView from "react-native-maps";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import StoreDummy from "@/components/map/StoreDummy";
import { LocationType } from "@/components/map/LocationType";
const ITEMS_PER_PAGE = 5;

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
