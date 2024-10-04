// @/interfaces/User.ts

export interface User {
  loginId: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
  isCertifiedMydata: boolean;
}

export interface SignupUser {
  loginId: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

export interface CardUser extends User {
  cardImage: any; // 카드 이미지
  cardName: string; // 카드 이름
  currentUsage: number; // 현재 사용 금액
  goalUsage: number; // 목표 사용 금액
}
