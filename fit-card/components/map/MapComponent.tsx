import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import SearchInput from "../map/SearchBox";
import CategoryButtonGroup from "../category/CategoryButtonGroup";
import GpsButton from "./GpsButton";
import SearchResultList from "./SearchResultList";

const MapComponent = () => {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

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
    setShowSearchResults(true); // 검색어가 변경될 때 리스트를 표시
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

  const handleLocationSelect = (latitude: number, longitude: number) => {
    // 선택된 위치 상태 업데이트
    setSelectedLocation({ latitude, longitude });

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

    // 리스트 창 닫기 (검색어는 유지하고 리스트만 숨김)
    setShowSearchResults(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput value={searchQuery} onChangeText={handleSearchChange} />
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
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
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
});
