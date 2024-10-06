// @/mock/mockData.ts
import { ConsumptionCategory } from "@/interfaces/ConsumptionCategory";

export const mockConsumptionPattern: ConsumptionCategory = {
  restaurant: "150000",
  cafe: "100000",
  convenienceStores: "50000",
  culture: "250000",
  gasStations: "150000",
  other: "100000",
  totalAmount: "800000",
};

export const recommendedCards = [
  {
    cardId: 1,
    cardImage: require("@/assets/images/temp-card-4.png"),
    cardName: "카드 이름 1",
    cardBenefit: ["혜    택: 12만원", "연회비: 4만원"],
  },
  {
    cardId: 2,
    cardImage: require("@/assets/images/temp-card-2.png"),
    cardName: "카드 이름 2",
    cardBenefit: ["혜    택: 15만원", "연회비: 5만원"],
  },
  {
    cardId: 3,
    cardImage: require("@/assets/images/temp-card-3.png"),
    cardName: "카드 이름 3",
    cardBenefit: ["혜    택: 16만원", "연회비: 6만원"],
  },
];

export const dummyBenefit = {
  index: 0,
  category: ["음식점", "카페", "편의점", "문화", "주유소"],
  logo: null,
  franchiseName: "프랜차이즈 이름",
  info: [
    ["음식점 혜택 1", "음식점 혜택 2", "음식점 혜택 3"],
    ["카페 혜택 1", "카페 혜택 2", "카페 혜택 3"],
    ["편의점 혜택 1", "편의점 혜택 2", "편의점 혜택 3"],
    ["문화 혜택 1", "문화 혜택 2", "문화 혜택 3"],
    ["주유소 혜택 1", "주유소 혜택 2", "주유소 혜택 3"],
  ],
};

// 카드 정보 (card 정보)
export const mainCards = [
  {
    cardId: 1,
    cardImage: require("@/assets/images/temp-card-2.png"), // 카드 이미지
    cardName: "싸피카드1 Fit Card", // 카드 이름
    currentUsage: 187234, // 현재 사용 금액
    goalUsage: 300000, // 목표 사용 금액
    cardBenefit: ["혜    택: 10만원", "연회비: 3만원"], // 카드 혜택 정보
  },
  {
    cardId: 2,
    cardImage: require("@/assets/images/temp-card-3.png"), // 카드 이미지
    cardName: "싸피카드2 Fit Card", // 카드 이름
    currentUsage: 25000, // 현재 사용 금액
    goalUsage: 300000, // 목표 사용 금액
    cardBenefit: ["혜    택: 10만원", "연회비: 3만원"], // 카드 혜택 정보
  },
  {
    cardId: 3,
    cardImage: require("@/assets/images/temp-card-4.png"), // 카드 이미지
    cardName: "싸피카드3 Fit Card", // 카드 이름
    currentUsage: 178234, // 현재 사용 금액
    goalUsage: 300000, // 목표 사용 금액
    cardBenefit: ["혜    택: 10만원", "연회비: 3만원"], // 카드 혜택 정보
  },
];
