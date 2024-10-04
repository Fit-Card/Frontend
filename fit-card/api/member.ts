// @/api/member.ts
import axios from "axios";

export const getMember = async (accessToken: string) => {
  try {
    const response = await axios.post(
      `http://j11a405.p.ssafy.io:8081/member/get`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );

    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Get Member Error: ", error);
  }
};
