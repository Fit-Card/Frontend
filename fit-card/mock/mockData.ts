// @/mock/mockData.ts

export const recommendedCards = [
  {
    cardImage: require("@/assets/images/temp-card-4.png"),
    cardName: "카드 이름 1",
    CardBenefit: ["혜    택: 12만원", "연회비: 4만원"],
  },
  {
    cardImage: require("@/assets/images/temp-card-2.png"),
    cardName: "카드 이름 2",
    CardBenefit: ["혜    택: 15만원", "연회비: 5만원"],
  },
  {
    cardImage: require("@/assets/images/temp-card-3.png"),
    cardName: "카드 이름 3",
    CardBenefit: ["혜    택: 16만원", "연회비: 6만원"],
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
