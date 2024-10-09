import axios from "axios";
import { mockUser } from "@/mock/mockUser";

// 사용자 지출 내역 조회
export const getPaymentCategory = async () => {
  try {
    const response = await axios.post(
      `http://j11a405.p.ssafy.io:8081/members/cards/payment/get/category`,
      {},
      {
        headers: {
          Authorization: `Bearer ${mockUser.token}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("Error getPaymentCategory:", error);
  }
};

// 추천 카드 목록 조회
export const getRecommendCards = async () => {
  try {
    const response = await axios.post(
      `http://j11a405.p.ssafy.io:8081/members/cards/recommends/get`,
      {},
      {
        headers: {
          Authorization: `Bearer ${mockUser.token}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get recommend cards:", error);
  }
};

// 연령대별 카드 목록 조회
export const getAgeSpecificCards = async (size: number) => {
  try {
    const response = await axios.post(
      `http://j11a405.p.ssafy.io:8081/members/cards/get/age-specific/${size}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${mockUser.token}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching age-specific cards:", error);
    throw error;
  }
};
