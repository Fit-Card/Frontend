// @/handlers/validationHandlers.ts
import { SignupUser } from "@/interfaces/User";
import { checkid } from "@/api/auth";
import { formatDate } from "./inputHandlers";

// 아이디 중복 확인 로직
export const handleCheckDuplicate = async (
  user: SignupUser,
  setIsLoginIdEmpty: React.Dispatch<React.SetStateAction<boolean | null>>,
  setIsDuplicate: React.Dispatch<React.SetStateAction<boolean | null>>
) => {
  // console.log("아이디 중복 확인:", user.loginId);

  if (!user.loginId) {
    setIsLoginIdEmpty(true);
    return;
  } else {
    setIsLoginIdEmpty(false);
  }

  try {
    // 서버에 아이디 중복 확인 요청
    const isDuplicate = await checkid(user.loginId);
    setIsDuplicate(isDuplicate); // 서버로부터 받은 중복 결과 설정
    // console.log(isDuplicate);
  } catch (error) {
    console.error("아이디 중복 확인 중 오류 발생:", error);
  }
};

// 전화번호 형식 검증 함수
export const isValidPhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^010-\d{4}-\d{4}$/; // 010-1234-5678 형식
  return phoneRegex.test(phoneNumber);
};

// 비밀번호 일치 여부 확인 함수
export const isPasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

// 비밀번호 형식 및 일치 여부 검증 함수 (둘 다 영숫자 조합, 8-12자)
export const isValidPassword = (password: string, confirmPassword: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;

  // 두 비밀번호 모두 형식을 만족하고, 비밀번호가 서로 일치하는지 확인
  return (
    passwordRegex.test(password) &&
    passwordRegex.test(confirmPassword) &&
    password === confirmPassword
  );
};

// 18세 이상, 120세 미만 검증 함수
export const isValidBirthDate = (birthDate: string): boolean => {
  const currentDate = new Date();
  const inputDate = new Date(formatDate(birthDate));

  // 나이 계산
  const age = currentDate.getFullYear() - inputDate.getFullYear();
  const monthDifference = currentDate.getMonth() - inputDate.getMonth();

  if (
    age < 18 ||
    age > 120 ||
    (age === 18 && monthDifference < 0) ||
    (age === 120 && monthDifference > 0)
  ) {
    return false;
  }

  return true;
};
