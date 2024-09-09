import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet"; // 추가
import SearchInput from "../map/SearchBox";
import CategoryButtonGroup from "../category/CategoryButtonGroup";
import GpsButton from "./GpsButton";
import SearchResultList from "./SearchResultList";

const MapComponent = () => {
  const mapRef = useRef<MapView>(null);
  const sheetRef = useRef<BottomSheet>(null); // BottomSheet의 참조 추가
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<{
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  } | null>(null);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false); // 리스트 표시 여부

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const handleButtonPress = (title: string) => {
    setSelectedButton(title);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    // 입력 중일 때는 리스트를 보여주지 않음
    setShowSearchResults(false);
  };

  const handleSearchSubmit = () => {
    // 검색어가 있을 때만 리스트 표시
    if (searchQuery.length > 0) {
      setShowSearchResults(true); // 엔터키 입력 시에만 리스트 표시
    }
  };

  const handleGpsButtonPress = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

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

    // 지도 이동
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
    // 선택된 마커 정보 업데이트
    setSelectedLocation({ id, name, address, latitude, longitude });

    // sheetRef가 null이 아닌지 확인 후 BottomSheet를 열기
    if (sheetRef.current) {
      sheetRef.current.expand(); // 최신 버전에서는 snapTo 대신 expand 사용
    }
  };

  const handleSheetChanges = (index: number) => {
    console.log("handleSheetChanges", index);
  };

  const renderBottomSheetContent = () => (
    <View style={styles.bottomSheetContent}>
      {selectedLocation ? (
        <>
          <Text style={styles.storeName}>{selectedLocation.name}</Text>
          <Text style={styles.storeAddress}>{selectedLocation.address}</Text>
          <Text style={styles.storeId}>ID: {selectedLocation.id}</Text>
        </>
      ) : (
        <Text>No location selected</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput
          value={searchQuery}
          onChangeText={handleSearchChange}
          onSubmit={handleSearchSubmit} // 사용자가 엔터를 눌렀을 때 호출
        />
      </View>

      <View style={styles.buttonContainer}>
        <CategoryButtonGroup selectedButton={selectedButton} onButtonPress={handleButtonPress} />
      </View>

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
        initialRegion={{
          latitude: location?.coords.latitude || 37.5665,
          longitude: location?.coords.longitude || 126.978,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* 선택된 장소에 대한 마커 */}
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            onPress={() =>
              handleMarkerPress(
                selectedLocation.id,
                selectedLocation.name,
                selectedLocation.address,
                selectedLocation.latitude,
                selectedLocation.longitude
              )
            }
          />
        )}
      </MapView>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 150]}
        index={1} // 초기 스냅 인덱스 설정
        onChange={handleSheetChanges} // 변경 이벤트 처리
      >
        <View style={styles.bottomSheetContent}>
          {selectedLocation ? (
            <>
              <Text style={styles.storeName}>{selectedLocation.name}</Text>
              <Text style={styles.storeAddress}>{selectedLocation.address}</Text>
              <Text style={styles.storeId}>ID: {selectedLocation.id}</Text>
            </>
          ) : (
            <Text>No location selected</Text>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonContainer: {
    position: "absolute",
    top: 60,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  resultContainer: {
    position: "absolute",
    top: 120,
    left: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    padding: 10,
  },
  bottomSheetContent: {
    backgroundColor: "white",
    padding: 20,
    height: 300,
    borderRadius: 10,
  },
  storeName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  storeAddress: {
    fontSize: 16,
    marginTop: 10,
    color: "#555",
  },
  storeId: {
    fontSize: 12,
    marginTop: 10,
    color: "#999",
  },
});
