// @/api/member.ts
import axios from "axios";
import { mockUser } from "@/mock/mockUser";

export const getMember = async () => {
  try {
    const response = await axios.post(
      `http://j11a405.p.ssafy.io:8081/member/get`,
      {},
      {
        headers: {
          Authorization: `Bearer ${mockUser.token}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error("Get Member Error: ", error);
  }
};
