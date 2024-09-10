import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import SearchInput from "../map/SearchBox";
import CategoryButtonGroup from "../category/CategoryButtonGroup";
import GpsButton from "./GpsButton";
import SearchResultList from "./SearchResultList";
import BottomSheetContent from "./BottomSheetContent";

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
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
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

      <BottomSheet ref={sheetRef} snapPoints={[400]} index={-1} enablePanDownToClose={true}>
        {/* <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 300 }}> */}
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
