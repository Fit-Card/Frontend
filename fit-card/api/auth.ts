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
    console.log(response.data);
    return response.data.data.duplicated; // 서버에서 반환한 데이터
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
