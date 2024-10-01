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
