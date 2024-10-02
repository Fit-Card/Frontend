import axios from "axios";
import { mockUser } from "@/mock/mockUser";

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
