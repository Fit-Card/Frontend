import React from "react";
import { View, Text, Button, StyleSheet, Image} from "react-native";
import { useNavigation, NavigationProp, useRoute, RouteProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import common from "../styles/Common"; // 스타일 파일 가져오기
import CustomButton from "../components/button/CustomButton";

export default function NoticeDetailScreen() {
  // NavigationProp 타입 지정
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, "Noticedetail">>();
  const { noticeId } = route.params; // 전달된 noticeId 파라미터

  return (
    <View style={styles.container}>
        <Text>상세보기 페이지</Text>
        <Text>전달된 Notice ID : {noticeId}</Text>
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
