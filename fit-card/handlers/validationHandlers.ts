// @/handlers/validationHandlers.ts
import { SignupUser } from "@/interfaces/User";
import { existingUsers } from "@/mock/userData";

// 아이디 중복 확인 로직
export const handleCheckDuplicate = (
  user: SignupUser,
  setIsLoginIdEmpty: React.Dispatch<React.SetStateAction<boolean | null>>,
  setIsDuplicate: React.Dispatch<React.SetStateAction<boolean | null>>
) => {
  console.log("아이디 중복 확인:", user.loginId);

  if (!user.loginId) {
    setIsLoginIdEmpty(true);
    return;
  } else {
    setIsLoginIdEmpty(false);
  }

  const userExists = existingUsers.some((existingUser) => existingUser.loginId === user.loginId);

  if (userExists) {
    setIsDuplicate(true);
  } else {
    setIsDuplicate(false);
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
  // YYMMDD 형식에 맞게 날짜를 변환
  const currentDate = new Date();
  const year = parseInt(birthDate.slice(0, 2), 10);
  const month = parseInt(birthDate.slice(2, 4), 10);
  const day = parseInt(birthDate.slice(4, 6), 10);

  const fullYear =
    year > parseInt(currentDate.getFullYear().toString().slice(-2)) ? 1900 + year : 2000 + year;

  const inputDate = new Date(`${fullYear}-${month}-${day}`);

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
