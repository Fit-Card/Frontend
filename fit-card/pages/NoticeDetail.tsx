import React, { useCallback, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Linking, ScrollView } from "react-native";
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
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NoticeDetailScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, "Noticedetail">>();
  const { cardEventId } = route.params; // 전달된 cardEventId 파라미터
  const [noticeDetail, setNoticeDetail] = useState<NoticeDetail | null>(null);
  const [rotateImage, setRotateImage] = useState(false); // 이미지 회전 여부 상태

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

      // 이미지의 세로 길이가 가로 길이보다 긴 경우 회전
      Image.getSize(response.data.data.cardImage, (width, height) => {
        if (height > width) {
          setRotateImage(true);
        }
      });
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
    <ScrollView contentContainerStyle={NoticeDetailStyle.scrollContainer}>
      <View style={NoticeDetailStyle.container}>
        {noticeDetail ? (
          <>
            <View style={NoticeDetailStyle.noticeImageContainer}>
              {noticeDetail.cardImage ? (
                <Image
                  source={{ uri: noticeDetail.cardImage }}
                  style={[
                    NoticeDetailStyle.noticeImage,
                    rotateImage ? { transform: [{ rotate: "-90deg" }] } : {},
                  ]}
                  resizeMode="contain"
                />
              ) : (
                <Text>이미지가 없습니다.</Text>
              )}
            </View>
            <View style={NoticeDetailStyle.noticeContentContainer}>
              <View style={NoticeDetailStyle.noticeSection}>
                <Text style={NoticeDetailStyle.infoTitle}>
                  {noticeDetail.alarmTitle}
                </Text>
              </View>

              <View style={NoticeDetailStyle.noticeSection}>
                <Text style={NoticeDetailStyle.infoChapter}>이벤트 내용</Text>
                <Text style={NoticeDetailStyle.infoText}>
                  {noticeDetail.alarmContent}
                </Text>
              </View>

              <View style={NoticeDetailStyle.noticeSection}>
                <Text style={NoticeDetailStyle.infoChapter}>대상 카드</Text>
                <Text style={NoticeDetailStyle.infoText}>
                  {noticeDetail.targetCards}
                </Text>
              </View>

              <View style={NoticeDetailStyle.noticeSection}>
                <Text style={NoticeDetailStyle.infoChapter}>이벤트 기간</Text>
                <Text style={NoticeDetailStyle.eventInfo}>
                  {noticeDetail.eventStartDate} ~ {noticeDetail.eventEndDate}
                </Text>
              </View>

              {noticeDetail.eventUrl ? (
                <TouchableOpacity
                  style={NoticeDetailStyle.eventLink}
                  onPress={() => Linking.openURL(noticeDetail.eventUrl)}
                >
                  <Text style={NoticeDetailStyle.eventLinkText}>
                    이벤트 페이지 방문하기 🔔
                  </Text>
                </TouchableOpacity>
              ) : null}

              <Text style={NoticeDetailStyle.createdAt}>
                게시일 - {noticeDetail.alarmCreatedAt}
              </Text>
            </View>
          </>
        ) : (
          <Text>공지 정보를 불러오는 중...</Text>
        )}
      </View>
    </ScrollView>
  );
}

const NoticeDetailStyle = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  noticeImageContainer: {
    width: "100%",
    height: 150,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: KeyColors.lightGray,
  },
  noticeImage: {
    width: 150,
    height: 150,
  },
  noticeContentContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  noticeSection: {
    borderBottomWidth: 1,
    borderBottomColor: KeyColors.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  infoTitle: {
    fontWeight: "bold",
    margin: "auto",
    color: KeyColors.black,
    fontSize: 18,
    textAlign: "center",
  },
  infoChapter: {
    color: KeyColors.blue,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: KeyColors.black,
  },
  eventInfo: {
    fontSize: 12,
    color: KeyColors.black,
  },
  eventLink: {
    marginTop: 10,
    backgroundColor: KeyColors.blue,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 4,
  },
  eventLinkText: {
    color: "white",
    fontWeight: "bold",
  },
  createdAt: {
    fontSize: 10,
    color: KeyColors.gray,
    marginTop: 30,
    paddingBottom: 10,
    textAlign: "center",
  },
});
