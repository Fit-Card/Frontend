// @/api/auth.ts
import axios from "axios";
import { SignupUser } from "@/interfaces/User";
import { formatDate } from "@/handlers/inputHandlers";
import { LoginRequest } from "@/interfaces/LoginRequest";

export const checkid = async (userId: string) => {
  try {
    const response = await axios.post(`http://j11a405.p.ssafy.io:8081/auth/checkid`, {
      loginId: userId,
    });
    return response.data.data.duplicated;
  } catch (error) {
    console.error("Error checking user ID:", error);
    throw error;
  }
};

export const register = async (user: SignupUser) => {
  try {
    const response = await axios.post(`http://j11a405.p.ssafy.io:8081/auth/register`, {
      loginId: user.loginId,
      password: user.password,
      name: user.name,
      phoneNumber: user.phoneNumber,
      birthDate: formatDate(user.birthDate),
    });
    return response.data.message; // 서버에서 반환한 데이터
  } catch (error) {
    console.error("Error register user:", error);
    throw error;
  }
};

export const login = async (user: LoginRequest) => {
  try {
    const response = await axios.post(`http://j11a405.p.ssafy.io:8081/auth/login`, {
      loginId: user.loginId,
      password: user.password,
    });
    return response.data; // 서버에서 반환한 데이터
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
};

export const send = async (phone: string) => {
  try {
    const response = await axios.post(`http://j11a405.p.ssafy.io:8081/auth/sms/send`, {
      phone: phone,
    });
    console.log("send message:", response.data.statusCode);
  } catch (error) {
    console.error("Error send message:", error);
    throw error;
  }
};

export const verify = async (phone: string, certificationNumber: string) => {
  try {
    const response = await axios.post(`http://j11a405.p.ssafy.io:8081/auth/sms/verify`, {
      phone: phone,
      certificationNumber: certificationNumber,
    });
    console.log("verify response:", response.data.statusCode);
  } catch (error) {
    console.error("Error verify:", error);
    throw error;
  }
};
