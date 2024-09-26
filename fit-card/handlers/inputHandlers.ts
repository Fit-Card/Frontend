// @/handlers/inputHandlers.ts
import { SignupUser } from "@/interfaces/User";

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

// 전화번호 입력 시 "-" 자동 생성
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
