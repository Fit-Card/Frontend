// SignUpHandlers.ts
import { User, SignupUser } from "@/interfaces/User";
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

// 입력 필드의 변화를 핸들링
export const handleChange = (
  key: keyof SignupUser,
  value: string,
  user: SignupUser,
  setUser: React.Dispatch<React.SetStateAction<SignupUser>>
) => {
  setUser({
    ...user,
    [key]: value,
  });
};

// 생년월일 입력 시 "-" 자동 생성
export const handleBirthDateChange = (
  text: string,
  user: SignupUser,
  setUser: React.Dispatch<React.SetStateAction<SignupUser>>
) => {
  let formattedText = text.replace(/[^0-9]/g, ""); // 숫자 이외의 값 제거

  if (formattedText.length >= 5 && formattedText.length <= 6) {
    formattedText = `${formattedText.slice(0, 4)}-${formattedText.slice(4)}`;
  } else if (formattedText.length > 6) {
    formattedText = `${formattedText.slice(0, 4)}-${formattedText.slice(4, 6)}-${formattedText.slice(6, 8)}`;
  }

  setUser({ ...user, birthDate: formattedText });
};

export const handleDigitChange = (
  text: string,
  user: SignupUser,
  setUser: React.Dispatch<React.SetStateAction<SignupUser>>
) => {
  let formattedText = text.replace(/[^0-9]/g, ""); // 숫자 이외의 값 제거

  if (formattedText.length >= 4 && formattedText.length <= 7) {
    formattedText = `${formattedText.slice(0, 3)}-${formattedText.slice(3)}`;
  } else if (formattedText.length > 7) {
    formattedText = `${formattedText.slice(0, 3)}-${formattedText.slice(3, 7)}-${formattedText.slice(7)}`;
  }
  setUser({ ...user, phoneNumber: formattedText });
};
