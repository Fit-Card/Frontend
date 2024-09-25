// @/mock/mockUser.ts

export const mockUser = {
  id: "1",
  loginId: "test",
  password: "1234",
  name: "핏카츄",
  birthDate: "1990-01-01",
  phoneNumber: "010-1234-5678",
};

// 카드 정보 (card 정보)
export const mockCardInfo = {
  cardImage: require("@/assets/images/temp-card-4.png"), // 카드 이미지
  cardName: "싸피카드 Fit Card", // 카드 이름
  currentUsage: 187234, // 현재 사용 금액
  goalUsage: 300000, // 목표 사용 금액
};
