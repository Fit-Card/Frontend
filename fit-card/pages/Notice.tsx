import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import { StackParamList } from "@/navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import KeyColors from "@/styles/KeyColor";
import Common from "@/styles/Common";
import axios from "axios";
import { mockUser } from "@/mock/mockUser";
import { url } from "inspector";

export default function NoticeScreen() {
  interface Notice {
    cardEventId: number;
    cardName: string;
    cardImage: string;
    alarmTitle: string;
    alarmCreatedAt: string;
  }

  const [noticeData, setNoticeData] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [rotateImageStates, setRotateImageStates] = useState<{ [key: number]: boolean }>({}); // 카드 별 회전 상태 관리

  useFocusEffect(
    useCallback(() => {
      console.log("Notice 렌더링");
      fetchNotice();
    }, [])
  );

  const fetchNotice = async () => {
    try {
      const response = await axios.post(
        `http://j11a405.p.ssafy.io:8081/alarms/get/all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
          },
        }
      );

      const fetchedNoticeData = response.data.data.alarmResponses;
      console.log("전체 알람 불러오기...");
      console.log(response.data.data.alarmResponses);
      setNoticeData(fetchedNoticeData);
      setIsLoading(false); // 데이터 로드 완료 후 로딩 상태를 false로 변경
    } catch (error) {
      console.error("알람 가져오기 오류 발생 : ", error);
      setIsLoading(false); // 오류 발생 시에도 로딩 상태를 false로 변경
    }
  };

  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const handleNoticePress = (notice: Notice) => {
    navigation.navigate("Noticedetail", { cardEventId: notice.cardEventId });
    console.log(`상세보기로 이동...${notice.cardEventId}`);
  };

  const renderItem = ({ item }: { item: Notice }) => (
    <TouchableOpacity style={noticeStyle.card} onPress={() => handleNoticePress(item)}>
      <View style={noticeStyle.cardImageContainer}>
        <Image
          source={{ uri: item.cardImage }} // PNG 파일 경로
          style={[
            noticeStyle.cardImage,
            rotateImageStates[item.cardEventId] ? { transform: [{ rotate: "-90deg" }] } : {},
          ]}
          resizeMode="contain"
        />
      </View>
      <View style={noticeStyle.cardInfoContainer}>
        <Text style={[noticeStyle.cardName, Common.textBlack]}>{item.cardName}</Text>
        <Text style={[noticeStyle.alarmTitle, Common.textGray, { fontSize: 12 }]}>
          {item.alarmTitle}
        </Text>

        {/* {!item.isRead && <Text style={[noticeStyle.unreadText, Common.textSmall]}>~시간 전 ●</Text>} */}
      </View>
    </TouchableOpacity>
  );

  // 카드 이미지의 가로 세로 비율에 따라 회전 여부를 결정하는 함수
  const checkImageRotation = (notice: Notice) => {
    Image.getSize(notice.cardImage, (width, height) => {
      setRotateImageStates((prev) => ({
        ...prev,
        [notice.cardEventId]: height > width, // 세로가 더 긴 경우 true 설정
      }));
    });
  };

  useEffect(() => {
    // 카드 데이터가 변경될 때마다 각 카드의 이미지 회전 여부를 체크
    noticeData.forEach(checkImageRotation);
  }, [noticeData]);

  return (
    <SafeAreaView style={noticeStyle.container}>
      <View style={noticeStyle.commentContainer}>
        <Text style={[Common.textSmall]}>소유하고 계신 카드에 관련된</Text>
        <Text style={[Common.textSmall]}>이벤트들을 모아봤어요!</Text>
      </View>
      <FlatList
        data={noticeData}
        renderItem={renderItem}
        // keyExtractor={(item) => item.alarmId.toString()}
        showsVerticalScrollIndicator={false}
        style={[noticeStyle.cardList]}
      />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const noticeStyle = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  card: {
    borderRadius: 4,
    height: 90,
    marginBottom: 10,
    marginHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    padding: 5,
    position: "relative",
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardName: {
    fontSize: 16,
    fontFamily: "SUITE-Bold",
    marginBottom: 5,
  },
  cardImageContainer: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRightColor: KeyColors.gray,
    borderRightWidth: 1,
  },
  cardImage: {
    width: 60,
    height: 60,
  },
  cardInfoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  alarmTitle: {
    borderTopWidth: 1.2,
    borderColor: KeyColors.lightGray,
    paddingVertical: 7,
    maxWidth: "80%",
    fontFamily: "SUITE-Bold",
  },
  commentContainer: {
    backgroundColor: KeyColors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    width: 250,
    gap: 1,
  },
  cardList: {
    width: width - 10,
  },
  unreadText: {
    position: "absolute",
    bottom: 5,
    right: 10,
    color: KeyColors.blue,
  },
});
