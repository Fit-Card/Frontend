// @/pages/SingUp.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import common from "@/styles/Common";
import { SignupUser } from "@/interfaces/User";

import { handleChange, handleDigitChange } from "@/handlers/inputHandlers";
import {
  handleCheckDuplicate,
  isPasswordMatch,
  isValidPhoneNumber,
  isValidPassword,
  isValidBirthDate,
} from "@/handlers/validationHandlers";
import { handleVerifyOtp } from "@/handlers/otpHandlers";
import { register, send, verify } from "@/api/auth";

export default function SignUp() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  // State variables for form inputs
  const [user, setUser] = useState<SignupUser>({
    loginId: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthDate: "",
    phoneNumber: "",
  });

  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [isLoginIdEmpty, setIsLoginIdEmpty] = useState<boolean | null>(null);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean | null>(null);
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState<boolean | null>(null);
  const [isNameEmpty, setIsNameEmpty] = useState<boolean | null>(null);
  const [isBirthDateEmpty, setIsBirthDateEmpty] = useState<boolean | null>(null);
  const [isPhoneNumberEmpty, setIsPhoneNumberEmpty] = useState<boolean | null>(null);

  // State for OTP input field and timer
  const [showOtpField, setShowOtpField] = useState(false);
  const [otpCode, setOtpCode] = useState<string>("");
  const [timer, setTimer] = useState<number>(180); // 3 minutes in seconds
  const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(true);
  const [isOtpRequestDisabled, setIsOtpRequestDisabled] = useState(false);
  const [isValidOtpRequest, setIsValidOtpRequest] = useState(false);
  const [otpResult, setOtpResult] = useState<string | null>(null);
  const [otpSuccess, setOtpSuccess] = useState(false);

  // 생년월일 입력 처리
  const handleBirthDateValidation = (text: string) => {
    if (text.length === 8 && isValidBirthDate(text)) {
      setIsBirthDateEmpty(false);
    } else {
      setIsBirthDateEmpty(true);
    }
    handleChange("birthDate", text, user, setUser);
  };

  // 회원가입
  const handleSignUp = async () => {
    // 회원가입 로직을 이곳에 추가 (예: 입력 검증, 서버에 데이터 전송 등)
    // 각 필드가 비어있는지 확인
    setIsLoginIdEmpty(!user.loginId);
    setIsPasswordEmpty(!user.password);
    setIsConfirmPasswordEmpty(!user.confirmPassword);
    setIsNameEmpty(!user.name);
    setIsBirthDateEmpty(!user.birthDate);
    setIsPhoneNumberEmpty(!user.phoneNumber);

    if (
      user.loginId &&
      user.password &&
      user.confirmPassword &&
      user.name &&
      user.birthDate &&
      user.phoneNumber &&
      isDuplicate === false &&
      isValidOtpRequest === true &&
      isValidBirthDate(user.birthDate)
    ) {
      try {
        // 회원가입 정보 전송
        console.log(user);
        const response = await register(user);
        console.log("Registration successful:", response);

        // 회원가입 완료 후 로그인 화면으로 이동
        navigation.navigate("Login");
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (showOtpField && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval!);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, showOtpField]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  const parsePhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/-/g, ""); // Remove all dashes
  };

  // Handle OTP verification request
  const handleRequestOtp = async () => {
    if (isValidPhoneNumber(user.phoneNumber)) {
      try {
        const parsedPhoneNumber = parsePhoneNumber(user.phoneNumber);
        await send(parsedPhoneNumber);
        setShowOtpField(true);
        setTimer(180);
        setIsPhoneNumberEditable(false);
        setIsOtpRequestDisabled(true);
      } catch (error) {
        Alert.alert("오류", "유효한 전화번호를 입력해주세요. (예: 010-1234-5678)");
      }
    } else {
      Alert.alert("오류", "유효한 전화번호를 입력해주세요.\n(예: 010-****-****)");
    }
  };

  // OTP 인증 처리
  const handleVerify = async () => {
    const parsedPhoneNumber = parsePhoneNumber(user.phoneNumber);

    try {
      const response = await verify(parsedPhoneNumber, otpCode);
      setIsValidOtpRequest(true); // OTP 인증 성공
      setOtpResult("확인되었습니다.");
      setOtpSuccess(true);
    } catch (error) {
      setOtpResult("인증번호가 일치하지 않습니다.");
      setOtpSuccess(false);
      setIsPhoneNumberEditable(true); // 전화번호 입력 수정 가능
      setIsOtpRequestDisabled(false); // 인증하기 버튼 다시 활성화
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 아이디 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>아이디</Text>
        <View style={styles.inputButtonContainer}>
          <TextInput
            style={[styles.input, styles.inputWithButton]}
            placeholder="아이디 (20자 이내)"
            maxLength={20}
            value={user.loginId}
            onChangeText={(text) => handleChange("loginId", text, user, setUser)}
          />
          <TouchableOpacity
            style={styles.duplicateCheckButton}
            onPress={() => handleCheckDuplicate(user, setIsLoginIdEmpty, setIsDuplicate)}
          >
            <Text style={styles.duplicateCheckButtonText}>중복확인</Text>
          </TouchableOpacity>
        </View>
        {/* 중복 체크 결과에 따른 메시지 표시 */}
        {isLoginIdEmpty === false && isDuplicate === true && (
          <Text style={styles.errorText}>이미 사용 중인 아이디입니다.</Text>
        )}
        {isLoginIdEmpty === false && isDuplicate === false && (
          <Text style={styles.successText}>사용 가능한 아이디입니다.</Text>
        )}
        {isLoginIdEmpty === true && <Text style={styles.errorText}>아이디를 입력해주세요.</Text>}
      </View>

      {/* 비밀번호 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          maxLength={100}
          value={user.password}
          onChangeText={(text) => handleChange("password", text, user, setUser)}
        />
        {isPasswordEmpty === true && <Text style={styles.errorText}>비밀번호 입력해주세요.</Text>}

        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          secureTextEntry
          maxLength={100}
          value={user.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text, user, setUser)}
        />
        {isConfirmPasswordEmpty === true && (
          <Text style={styles.errorText}>비밀번호 확인을 입력해주세요.</Text>
        )}
        {isPasswordEmpty === false &&
          isConfirmPasswordEmpty === false &&
          isPasswordMatch(user.password, user.confirmPassword) === false && (
            <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
          )}
        {isPasswordEmpty === false &&
          isPasswordMatch(user.password, user.confirmPassword) === true &&
          isValidPassword(user.password, user.confirmPassword) === false && (
            <Text style={styles.errorText}>비밀번호는 8~12자의 영숫자 조합이어야 합니다.</Text>
          )}
      </View>

      {/* 이름 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="이름"
          maxLength={10}
          value={user.name}
          onChangeText={(text) => handleChange("name", text, user, setUser)}
        />
        {isNameEmpty && <Text style={styles.errorText}>이름을 입력해주세요.</Text>}
      </View>

      {/* 전화번호 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>전화번호</Text>
        <View style={styles.inputButtonContainer}>
          <TextInput
            style={[styles.input, styles.inputWithButton]}
            placeholder="숫자만 입력해주세요."
            maxLength={13}
            keyboardType="phone-pad"
            value={user.phoneNumber}
            onChangeText={(text) => handleDigitChange(text, user, setUser)}
            editable={isPhoneNumberEditable}
          />
          <TouchableOpacity
            style={[
              styles.otpRequestButton,
              isOtpRequestDisabled ? styles.disabledButton : null, // 비활성화 스타일 적용
            ]}
            onPress={handleRequestOtp}
            disabled={isOtpRequestDisabled}
          >
            <Text
              style={[
                styles.otpRequestButtonText,
                isOtpRequestDisabled ? styles.disabledButtonText : null, // 비활성화 텍스트 스타일 적용
              ]}
            >
              인증하기
            </Text>
          </TouchableOpacity>
        </View>
        {isPhoneNumberEmpty === true && (
          <Text style={styles.errorText}>전화번호를 입력해주세요.</Text>
        )}
      </View>

      {/* OTP 인증번호 입력 필드 */}
      {showOtpField && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>인증번호</Text>
          <View style={styles.inputButtonContainer}>
            <TextInput
              style={[styles.input, styles.inputWithButton]}
              placeholder={`남은 시간: ${formatTime(timer)}`}
              placeholderTextColor="red"
              maxLength={6}
              keyboardType="numeric"
              value={otpCode}
              onChangeText={setOtpCode}
              editable={!otpSuccess}
            />
            {/* 인증 버튼 추가 */}
            <TouchableOpacity
              style={[styles.verifyButton, otpSuccess ? styles.disabledButton : null]}
              onPress={handleVerify}
            >
              <Text
                style={[styles.verifyButtonText, otpSuccess ? styles.disabledButtonText : null]}
              >
                인증
              </Text>
            </TouchableOpacity>
          </View>
          {otpResult && (
            <Text style={otpSuccess ? styles.successText : styles.errorText}>{otpResult}</Text>
          )}
        </View>
      )}
      {/* 생년월일 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>생년월일</Text>
        <TextInput
          style={styles.input}
          placeholder="생년월일 (YYYYMMDD)"
          maxLength={8}
          value={user.birthDate}
          onChangeText={handleBirthDateValidation}
        />
        {isBirthDateEmpty === true && (
          <Text style={styles.errorText}>생년월일을 입력해주세요.</Text>
        )}
      </View>

      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>가입하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "SUITE-Regular",
  },
  title: {
    fontSize: 24,
    fontFamily: "SUITE-Regular",
    color: common.textBlue.color,
    marginBottom: 20,
  },
  inputButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "SUITE-Regular",
  },
  inputWithButton: {
    flex: 1,
  },
  duplicateCheckButton: {
    height: 50,
    backgroundColor: common.textBlue.color,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10,
    marginBottom: 15,
  },
  duplicateCheckButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "SUITE-Bold",
  },
  otpRequestButton: {
    height: 50,
    backgroundColor: common.textBlue.color,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10,
    marginBottom: 15,
  },
  otpRequestButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "SUITE-Bold",
  },
  timerText: {
    fontSize: 16,
    color: "red",
    marginTop: 5,
    fontFamily: "SUITE-Regular",
  },
  // 비활성화된 버튼 스타일
  disabledButton: {
    backgroundColor: "#ccc", // 회색으로 변경
  },
  // 비활성화된 텍스트 스타일
  disabledButtonText: {
    color: "#888", // 연한 회색
  },
  verifyButton: {
    height: 50,
    backgroundColor: common.textBlue.color,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10,
    marginBottom: 15,
  },
  verifyButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "SUITE-Bold",
  },
  errorText: {
    color: "red",
    marginTop: -10,
    marginBottom: 10,
    fontFamily: "SUITE-Regular",
  },
  successText: {
    color: "green",
    marginTop: -10,
    marginBottom: 10,
    fontFamily: "SUITE-Regular",
  },
  signUpButton: {
    backgroundColor: common.textBlue.color,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  signUpButtonText: {
    fontFamily: "SUITE-Bold",
    color: "white",
    fontSize: 18,
  },
});
