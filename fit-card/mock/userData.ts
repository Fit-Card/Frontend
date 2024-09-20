// mock/userData.ts

export interface User {
  id: number;
  loginId: string;
  password: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
}

// 한 명의 사용자 정보 생성
export const existingUsers: User[] = [
  {
    id: 1,
    loginId: "test",
    password: "1234",
    name: "홍길동",
    birthDate: "1990-01-01",
    phoneNumber: "010-1234-5678",
  },
  {
    id: 2,
    loginId: "duplicated",
    password: "1234",
    name: "홍길동",
    birthDate: "1990-01-01",
    phoneNumber: "010-1234-5678",
  },
];
