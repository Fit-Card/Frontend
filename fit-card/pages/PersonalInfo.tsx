import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios"; // Axios로 API 호출
import common from "../styles/Common"; // 스타일 파일 가져오기
import { mockUser } from "@/mock/mockUser";

// 유저 데이터를 나타낼 타입 정의
interface UserData {
  loginId: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
  isCertifiedMydata: boolean;
}

export default function PersonalInfoScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [info, setInfo] = useState<UserData | null>(null); // 유저 데이터를 저장할 상태
  const [newPhoneNumber, setNewPhoneNumber] = useState(""); // 새 전화번호 상태
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호 상태

  // 유저 데이터를 받아오는 함수
  const fetchInfo = async () => {
    try {
      const response = await axios.post(
        `http://j11a405.p.ssafy.io:8081/member/get`,
        {},
        {
          headers: {
            Authorization: mockUser.token,
          },
        }
      ); // 엔드포인트 호출
      console.log(response);
      setInfo(response.data.data); // 받은 유저 데이터를 상태에 저장
    } catch (error) {
      console.error("유저 정보 불러오기 실패", error);
    }
  };

  // 유저 정보를 업데이트하는 함수
  const updateInfo = async () => {
    try {
      // 업데이트 요청 보냄
      await axios.post("/member/update", {
        newPassword: newPassword,
        newPhoneNumber: newPhoneNumber,
      });
      Alert.alert("수정 완료", "정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("유저 정보 수정 실패", error);
      Alert.alert("수정 실패", "정보 수정에 실패했습니다.");
    }
  };

  // 페이지가 focus될 때마다 유저 정보를 불러옴
  useFocusEffect(
    useCallback(() => {
      fetchInfo();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>개인 정보</Text>

      {info ? ( // 유저 데이터가 있을 때만 화면에 표시
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>아이디: {info.loginId}</Text>
            <Text style={styles.label}>이름: {info.name}</Text>
            <Text style={styles.label}>전화번호: {info.phoneNumber}</Text>
            <Text style={styles.label}>생년월일: {info.birthDate}</Text>
            <Text style={styles.label}>
              마이데이터 인증: {info.isCertifiedMydata ? "인증됨" : "인증 안됨"}
            </Text>
          </View>

          {/* 전화번호 수정 입력 */}
          <TextInput
            style={styles.input}
            placeholder="새 전화번호 입력"
            value={newPhoneNumber}
            onChangeText={setNewPhoneNumber}
            keyboardType="phone-pad"
          />

          {/* 비밀번호 수정 입력 */}
          <TextInput
            style={styles.input}
            placeholder="새 비밀번호 입력"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          {/* 정보 수정 버튼 */}
          <Button title="정보 수정" onPress={updateInfo} />
        </>
      ) : (
        <Text>유저 정보를 불러오는 중입니다...</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});
