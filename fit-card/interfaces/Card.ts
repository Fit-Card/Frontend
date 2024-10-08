export interface CardPaymentStatus {
  cardPerformanceId: number;
  totalPayment: number;
  performanceStart: number;
  performanceEnd: number;
  performanceLevel: number;
}

export interface BenefitSimple {
  merchantName: string;
  merchantCategory: string;
  discountInfo: string;
}

export interface CardBenefits {
  benefitSimples: BenefitSimple[];
  size: number;
}

export interface MainCard {
  cardId: number;
  cardName: string;
  cardImage: string;
  memberCardPaymentStatus: CardPaymentStatus;
  cardBenefits: CardBenefits;
}
