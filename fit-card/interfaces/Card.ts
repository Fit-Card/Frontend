// @/interfaces/Card.ts

export interface Card {
  cardId: number;
  cardImage: any;
  cardName: string;
  cardBenefit: string[];
}

export interface MainCard extends Card {
  currentUsage: number;
  goalUsage: number;
}
