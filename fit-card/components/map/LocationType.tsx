import { Ionicons } from "@expo/vector-icons";

export type LocationType = {
  id: number;
  name: string;
  address: string;
  distance: number;
  latitude: number;
  longitude: number;
  kakaoUrl: string;
};

export interface CustomMarkerProps {
  store: LocationType;
  onPress: (
    id: number,
    name: string,
    address: string,
    distance: number,
    latitude: number,
    longitude: number,
    kakaoUrl: string
  ) => void;
  selectedLocation: LocationType | null;
}

export type SelectedLocationType = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  kakaoUrl: string;
  category: number;
};

export type Category = {
  id: number;
  title: string;
  code: string;
};

export const categories: Category[] = [
  { id: 0, title: "음식점", code: "FD6" },
  { id: 1, title: "카페", code: "CE7" },
  { id: 2, title: "편의점", code: "CS2" },
  { id: 3, title: "문화시설", code: "CT1" },
  { id: 4, title: "주유소", code: "OL7" },
];

export const categoriesWithIcons: Array<{
  name: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}> = [
  { name: "FD6", title: "음식점", icon: "restaurant-outline" },
  { name: "CE7", title: "카페", icon: "cafe-outline" },
  { name: "CS2", title: "편의점", icon: "cart-outline" },
  { name: "CT1", title: "문화시설", icon: "film-outline" },
  { name: "OL7", title: "주유소", icon: "car-outline" },
];
