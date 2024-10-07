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

export const sendFcmToken = async (accessToken: string, fcmToken: string) => {
  try {
    const response = await axios.post(
      `http://j11a405.p.ssafy.io:8081/member/fcmtoken`,
      { fcmToken: fcmToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    console.log("FCM 토큰 전송 성공:", response.data);
  } catch (error) {
    console.error("FCM 토큰 전송 실패:", error);
  }
};
