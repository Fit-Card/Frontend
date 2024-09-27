// @/interfaces/User.ts

export interface User {
  id: string;
  loginId: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
}

export interface SignupUser extends User {
  password: string;
  confirmPassword: string;
}

export interface CardUser extends User {
  cardImage: any; // 카드 이미지
  cardName: string; // 카드 이름
  currentUsage: number; // 현재 사용 금액
  goalUsage: number; // 목표 사용 금액
}
