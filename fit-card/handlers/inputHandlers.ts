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

export const formatDate = (birthDate: string): string => {
  const isValidFormat = /^\d{8}$/.test(birthDate);
  if (!isValidFormat) {
    throw new Error("Invalid birthDate format. It should be YYYYMMDD.");
  }

  const year = parseInt(birthDate.slice(0, 4), 10);
  const month = parseInt(birthDate.slice(4, 6), 10);
  const day = parseInt(birthDate.slice(6, 8), 10);

  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");

  const formatDate = `${year}-${formattedMonth}-${formattedDay}`;
  console.log(formatDate);

  return formatDate;
};
