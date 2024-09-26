// @/handlers/otpHandlers.ts

// OTP 인증 처리 함수
export const handleVerifyOtp = (otpCode: string): boolean => {
  return otpCode === "123456"; // 인증번호가 "123456"일 경우 true 반환, 아니면 false
};
