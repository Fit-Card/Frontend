import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import common from "@/styles/Common";
import { SignupUser } from "@/interfaces/User";
import {
  handleChange,
  handleCheckDuplicate,
  handleBirthDateChange,
  handleDigitChange,
} from "@/handlers/SingUpHandlers";

export default function SignUp() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  // State variables for form inputs
  const [user, setUser] = useState<SignupUser>({
    id: "",
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
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  // 회원가입
  const handleSignUp = () => {
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
      user.phoneNumber
    ) {
      console.log("회원가입 정보:", user);
      // 회원가입 정보 전송

      // 회원가입 완료 후 로그인 화면으로 이동
      navigation.navigate("Login");
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
            placeholder="아이디 (최대 20자)"
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
      </View>

      {/* 이름 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="이름 (최대 10자)"
          maxLength={10}
          value={user.name}
          onChangeText={(text) => handleChange("name", text, user, setUser)}
        />
        {isNameEmpty === true && <Text style={styles.errorText}>이름을 입력해주세요.</Text>}
      </View>

      {/* 생년월일 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>생년월일</Text>
        <TextInput
          style={styles.input}
          placeholder="생년월일 (YYYY-MM-DD)"
          value={user.birthDate}
          onChangeText={(text) => handleBirthDateChange(text, user, setUser)}
        />
        {isBirthDateEmpty === true && (
          <Text style={styles.errorText}>생년월일을 입력해주세요.</Text>
        )}
      </View>

      {/* 전화번호 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>전화번호</Text>
        <TextInput
          style={styles.input}
          placeholder="숫자만 입력해주세요."
          maxLength={13}
          keyboardType="phone-pad"
          value={user.phoneNumber}
          onChangeText={(text) => handleDigitChange(text, user, setUser)}
        />
        {isBirthDateEmpty === true && (
          <Text style={styles.errorText}>전화번호를 입력해주세요.</Text>
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
    fontFamily: "SUITE-Regular",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
