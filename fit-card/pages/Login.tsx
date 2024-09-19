import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import LoginButton from "../components/button/LoginButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import common from "@/styles/Common";

export default function LoginScreen() {
  // NavigationProp 타입 지정
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <View style={styles.iconContainer}>
              <FontAwesome
                name="user"
                size={25} // 아이콘 크기를 동일하게 설정
                color={common.textBlue.color}
              />
            </View>
            <TextInput style={[styles.input]} placeholder="아이디 입력" />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.iconContainer}>
              <Fontisto
                name="locked"
                size={25} // 아이콘 크기를 동일하게 설정
                color={common.textBlue.color}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="영문자, 숫자, 특수문자 혼용(8~15자)"
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <LoginButton onPress={() => navigation.navigate("Main")} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signupText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logo: {
    width: 120,
    height: 100,
    // marginTop: 150,
  },
  inputContainer: {
    width: "100%",
    marginTop: 50,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  iconContainer: {
    width: 30, // 아이콘이 들어갈 View의 너비를 동일하게 설정
    alignItems: "center", // 아이콘을 가운데 정렬
    marginRight: 10,
  },
  input: {
    flex: 1, // 아이콘 옆에 입력창이 가득 차도록 설정
    height: 50,
    fontSize: 16,
    fontFamily: "SUITE-Regular",
  },
  title: {
    fontSize: 24,
    fontFamily: "SUITE-Regular",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 15,
    marginBottom: 10,
  },
  signupText: {
    fontSize: 14, // 작은 글씨
    color: "#686E74", // 회색
    textDecorationLine: "underline", // 밑줄
    marginTop: 20,
  },
});
