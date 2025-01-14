// 페이지 생성할때 이거 기본으로 두고 시작하면 편할듯 합니다.

import React from "react";
import { View, Text, Button, StyleSheet, Image} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import common from "../styles/Common"; // 스타일 파일 가져오기
import CustomButton from "../components/button/CustomButton";

export default function FunctionName() {
  // NavigationProp 타입 지정
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
        {/* 여기에 페이지 내용 넣기 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
