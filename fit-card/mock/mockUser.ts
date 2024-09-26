// @/mock/mockUser.ts

export const mockUser = {
  id: "1",
  loginId: "test",
  password: "test",
  name: "핏카츄",
  birthDate: "1990-01-01",
  phoneNumber: "010-1234-5678",
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTIzIiwiaWF0IjoxNzI3MzI5NDQ2LCJleHAiOjE3Mzc0MzMwNDZ9.7PkVXB6f5rROVQzo9n3Ji5F0t9UVGZw2FkJ5BDxQfeY",
};

// 카드 정보 (card 정보)
export const mockCardInfo = {
  cardImage: require("@/assets/images/temp-card-4.png"), // 카드 이미지
  cardName: "싸피카드 Fit Card", // 카드 이름
  currentUsage: 187234, // 현재 사용 금액
  goalUsage: 300000, // 목표 사용 금액
  cardBenefit: ["혜    택: 10만원", "연회비: 3만원"], // 카드 혜택 정보
};
