import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import axios from "axios"; // Axios로 API 호출
import common from "../styles/Common"; // 스타일 파일 가져오기
import { mockUser } from "@/mock/mockUser";
import KeyColors from "@/styles/KeyColor";
import { ScrollView } from "react-native-gesture-handler";

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
  const [prevPassword, setPrevPassword] = useState(""); // 이전 비밀번호 상태

  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // 유저 데이터를 받아오는 함수
  const fetchInfo = async () => {
    try {
      const response = await axios.post(
        `http://j11a405.p.ssafy.io:8081/member/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
          },
        }
      ); // 엔드포인트 호출
      setInfo(response.data.data); // 받은 유저 데이터를 상태에 저장
    } catch (error) {
      console.error("유저 정보 불러오기 실패", error);
    }
  };

  // 유저 정보를 업데이트하는 함수
  const updateInfo = async (field: string) => {
    try {
      // 업데이트 요청 보냄
      await axios.post(
        "http://j11a405.p.ssafy.io:8081/member/update",
        {
          newPassword: field === "password" ? newPassword : undefined,
          newPhoneNumber: field === "phoneNumber" ? newPhoneNumber : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
          },
        }
      );
      Alert.alert("수정 완료", "정보가 성공적으로 수정되었습니다.");
      setIsEditingPhoneNumber(false);
      setIsEditingPassword(false);
      fetchInfo(); // 수정 후 정보를 다시 불러옴
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

  const togglePhoneNumberEdit = () => {
    if (isEditingPhoneNumber) setIsEditingPhoneNumber(false);
    else setIsEditingPhoneNumber(true);
  };

  const togglePasswordEdit = () => {
    if (isEditingPassword) setIsEditingPassword(false);
    else setIsEditingPassword(true);
  };

  return (
    <View>
      <ScrollView style={styles.container}>
        {info ? ( // 유저 데이터가 있을 때만 화면에 표시
          <>
            <View style={styles.infoContainer}>
              <View style={styles.infoSection}>
                <View style={styles.row}>
                  <Text style={styles.label}>아이디</Text>
                </View>
                <Text style={styles.infoContent}>{info.loginId}</Text>
              </View>

              <View style={styles.infoSection}>
                <View style={styles.row}>
                  <Text style={styles.label}>이름</Text>
                </View>
                <Text style={styles.infoContent}>{info.name}</Text>
              </View>

              <View style={styles.infoSection}>
                <View style={styles.row}>
                  <Text style={styles.label}>전화번호</Text>
                  <TouchableOpacity onPress={() => togglePhoneNumberEdit()}>
                    <Text style={styles.editButton}>수정</Text>
                  </TouchableOpacity>
                </View>
                {isEditingPhoneNumber === true ? (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="새 전화번호 입력"
                      value={newPhoneNumber}
                      onChangeText={setNewPhoneNumber}
                      keyboardType="phone-pad"
                    />
                    <TouchableOpacity
                      style={[styles.confirmButton]}
                      onPress={() => updateInfo("phoneNumber")}
                    >
                      <Text style={[styles.confirmButtonText]}>수정 확인</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text style={styles.infoContent}>{info.phoneNumber}</Text>
                )}
              </View>

              <View style={styles.infoSection}>
                <View style={styles.row}>
                  <Text style={styles.label}>비밀번호</Text>
                  <TouchableOpacity onPress={() => togglePasswordEdit()}>
                    <Text style={styles.editButton}>수정</Text>
                  </TouchableOpacity>
                </View>
                {isEditingPassword === true ? (
                  <>
                    <TextInput
                      style={[styles.input, { marginBottom: 0 }]}
                      placeholder="기존 비밀번호 입력"
                      value={prevPassword}
                      onChangeText={setPrevPassword}
                      secureTextEntry
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="새 비밀번호 입력"
                      value={newPassword}
                      onChangeText={setNewPassword}
                      secureTextEntry
                    />
                    <TouchableOpacity
                      style={[styles.confirmButton]}
                      onPress={() => updateInfo("password")}
                    >
                      <Text style={[styles.confirmButtonText]}>수정 확인</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text style={styles.infoContent}>********</Text>
                )}
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.label}>생년월일</Text>
                <Text style={styles.infoContent}>{info.birthDate}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.label}>마이데이터 인증 여부</Text>
                <Text style={styles.infoContent}>
                  {info.isCertifiedMydata ? "인증됨" : "인증 안됨"}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <Text>유저 정보를 불러오는 중입니다...</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
  },
  infoContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: KeyColors.black,
    paddingBottom: 5,
  },
  infoContent: {
    fontSize: 16,
    color: KeyColors.blue,
  },
  infoSection: {
    borderBottomColor: KeyColors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
  },
  editButton: {
    color: KeyColors.blue,
    fontWeight: "bold",
    fontSize: 12,
  },
  confirmButton: {
    backgroundColor: KeyColors.blue,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 4,
  },
  confirmButtonText: {
    fontWeight: "bold",
    color: "white",
  },
});
