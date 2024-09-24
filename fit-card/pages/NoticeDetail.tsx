import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useNavigation, NavigationProp, useRoute, RouteProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import common from "../styles/Common"; // 스타일 파일 가져오기
import KeyColors from "@/styles/KeyColor";

export default function NoticeDetailScreen() {
  // NavigationProp 타입 지정
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, "Noticedetail">>();
  const { noticeId } = route.params; // 전달된 noticeId 파라미터

  return (
    <View style={NoticeDetailStyle.container}>
      <View style={NoticeDetailStyle.noticeImageContainer}>
        <Text>여기에 공지의 이미지가 들어갈 예정</Text>
      </View>
      <View style={NoticeDetailStyle.noticeContentContainer}>
        <Text>전달된 Notice ID : {noticeId}</Text>
        <Text>전달된 Notice 내용</Text>
      </View>
    </View>
  );
}

const NoticeDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noticeImageContainer: {
    backgroundColor: KeyColors.lightGray,
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  noticeContentContainer: {
    padding: 5,
    alignItems: "center",
  },
});
