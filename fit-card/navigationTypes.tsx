import { LocationType } from "@/components/map/LocationType"; // Adjust the import path accordingly

// Define StackParamList
export type StackParamList = {
  Loading: undefined;
  Login: undefined;
  SignUp: undefined;
  Main: undefined;
  Temp: undefined;
  Mypage: undefined;
  Addcard: undefined;
  Deletecard: undefined;
  Search: undefined;
  Card: undefined;
  Map: { store: LocationType } | undefined;
  StoreSearch: undefined;
  CardSearch: undefined;
  CardList: { companyId: number; companyName: string };
  StoreBenefitCardList: { companyId: number; companyName: string };
  Notice: undefined;
  Noticedetail: { noticeId: string };
  StoreDetail: { storeName: string; storeImage: any };
  PersonalInfo: undefined;
  CardDetail: { cardId: number };
  SearchPage: { latitude: number; longitude: number };
};
