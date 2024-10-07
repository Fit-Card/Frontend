import React, { useCallback, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import axios from "axios";
import { mockUser } from "@/mock/mockUser";
import KeyColors from "@/styles/KeyColor";

export default function NoticeDetailScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, "Noticedetail">>();
  const { cardEventId } = route.params; // 전달된 cardEventId 파라미터
  const [noticeDetail, setNoticeDetail] = useState<NoticeDetail | null>(null);

  interface NoticeDetail {
    cardName: string;
    cardImage: string;
    alarmTitle: string;
    alarmContent: string;
    targetCards: string;
    eventStartDate: string;
    eventEndDate: string;
    eventUrl: string;
    alarmCreatedAt: string;
  }

  useFocusEffect(
    useCallback(() => {
      console.log(`상세보기 LOAD`);
      fetchNoticeDetail();
    }, [])
  );

  const fetchNoticeDetail = async () => {
    try {
      const response = await axios.post(
        `http://j11a405.p.ssafy.io:8081/alarms/get/detail`,
        {
          cardEventId: cardEventId,
        },
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
          },
        }
      );
      console.log(`전달된 번호 : ${cardEventId} 에 대한 정보 불러오는 중...`);
      setNoticeDetail(response.data.data); // 상태 업데이트
    } catch (error) {
      console.log("오류 발생!" + error);
    }
  };

  // 상태가 업데이트되었을 때 콘솔에 출력해보기
  useEffect(() => {
    if (noticeDetail) {
      console.log("업데이트된 정보 : ", noticeDetail);
    }
  }, [noticeDetail]);

  return (
    <View style={NoticeDetailStyle.container}>
      {noticeDetail ? (
        <>
          <View style={NoticeDetailStyle.noticeImageContainer}>
            {noticeDetail.cardImage ? (
              <Image
                source={{ uri: noticeDetail.cardImage }}
                style={NoticeDetailStyle.noticeImage}
                resizeMode="contain"
              />
            ) : (
              <Text>이미지가 없습니다.</Text>
            )}
          </View>
          <View style={NoticeDetailStyle.noticeContentContainer}>
            <Text style={NoticeDetailStyle.title}>{noticeDetail.alarmTitle}</Text>
            <Text style={NoticeDetailStyle.content}>{noticeDetail.alarmContent}</Text>
            <Text style={NoticeDetailStyle.eventInfo}>대상 카드: {noticeDetail.targetCards}</Text>
            <Text style={NoticeDetailStyle.eventInfo}>
              이벤트 기간: {noticeDetail.eventStartDate} ~ {noticeDetail.eventEndDate}
            </Text>
            {noticeDetail.eventUrl ? (
              <Text
                style={NoticeDetailStyle.eventLink}
                onPress={() => Linking.openURL(noticeDetail.eventUrl)}
              >
                이벤트 상세 정보 보기
              </Text>
            ) : null}
            <Text style={NoticeDetailStyle.createdAt}>생성일: {noticeDetail.alarmCreatedAt}</Text>
          </View>
        </>
      ) : (
        <Text>공지 정보를 불러오는 중...</Text>
      )}
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
    height: 150,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  noticeImage: {
    width: 150,
    height: 150,
  },
  noticeContentContainer: {
    padding: 5,
    alignItems: "center",
  },
});
