// @/mock/mockLogin.ts

import { LoginRequest } from "@/interfaces/LoginRequest";
import { mockUser } from "@/mock/mockUser";

// 로그인 검증을 모의 HTTP 요청처럼 처리하는 함수
export const mockLogin = (request: LoginRequest): Promise<typeof mockUser> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 요청된 loginId와 password가 mockUser와 일치하는지 확인
      if (
        request.loginId === mockUser.loginId &&
        request.password === mockUser.password
      ) {
        resolve(mockUser); // 성공 시 mockUser 반환
      } else {
        reject(new Error("아이디 또는 비밀번호가 잘못되었습니다.")); // 실패 시 에러 발생
      }
    }, 1000); // 1초 후에 처리된 것처럼 비동기 대기
  });
};
