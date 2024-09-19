import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import common from "@/styles/Common";

export default function SignUp() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  // State variables for form inputs
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignUp = () => {
    // 회원가입 로직을 이곳에 추가 (예: 입력 검증, 서버에 데이터 전송 등)
    console.log("회원가입 정보:", {
      loginId,
      password,
      name,
      birthDate,
      phoneNumber,
    });
    // 회원가입 완료 후 로그인 화면으로 이동
    navigation.navigate("Login");
  };

  // 아이디 중복 확인 로직
  const handleCheckDuplicate = () => {
    console.log("아이디 중복 확인:", loginId);
    // 아이디 중복 확인 로직 추가
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
            value={loginId}
            onChangeText={setLoginId}
          />
          <TouchableOpacity
            style={styles.duplicateCheckButton}
            onPress={handleCheckDuplicate}
          >
            <Text style={styles.duplicateCheckButtonText}>중복확인</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 비밀번호 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          maxLength={100}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          secureTextEntry
          maxLength={100}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* 이름 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="이름 (최대 10자)"
          maxLength={10}
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* 생년월일 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>생년월일</Text>
        <TextInput
          style={styles.input}
          placeholder="생년월일 (YYYY-MM-DD)"
          value={birthDate}
          onChangeText={setBirthDate}
        />
      </View>

      {/* 전화번호 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>전화번호</Text>
        <TextInput
          style={styles.input}
          placeholder="전화번호 (예: 010-1234-5678)"
          maxLength={13}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
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
