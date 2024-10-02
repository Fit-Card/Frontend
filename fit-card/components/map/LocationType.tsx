export type LocationType = {
  id: number;
  name: string;
  address: string;
  distance: number;
  latitude: number;
  longitude: number;
  kakaoUrl: string;
};

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
