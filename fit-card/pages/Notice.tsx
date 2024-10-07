import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import { StackParamList } from "@/navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import KeyColors from "@/styles/KeyColor";
import Common from "@/styles/Common";
import axios from "axios";
import { mockUser } from "@/mock/mockUser";

export default function NoticeScreen() {
  interface Notice {
    alarmId: number;
    cardName: String;
    cardImage: String;
    alarmTitle: String;
    alarmCreatedAt: String;
  }

  const [noticeData, setNoticeData] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

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
      setNoticeData(fetchedNoticeData);
      setIsLoading(false); // 데이터 로드 완료 후 로딩 상태를 false로 변경
    } catch (error) {
      console.error("알람 가져오기 오류 발생 : ", error);
      setIsLoading(false); // 오류 발생 시에도 로딩 상태를 false로 변경
    }
  };

  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const handleNoticePress = (notice: Notice) => {
    navigation.navigate("Noticedetail", { noticeId: notice.alarmId });
  };

  const renderItem = ({ item }: { item: Notice }) => (
    <TouchableOpacity style={noticeStyle.card} onPress={() => handleNoticePress(item)}>
      <Text style={[noticeStyle.cardName, Common.textBlack]}>{item.cardName}</Text>
      <Text style={[noticeStyle.alarmTitle, Common.textGray, { fontSize: 12 }]}>
        {item.alarmTitle}
      </Text>
      {/* {!item.isRead && <Text style={[noticeStyle.unreadText, Common.textSmall]}>~시간 전 ●</Text>} */}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={noticeStyle.container}>
      <View style={noticeStyle.commentContainer}>
        <Text style={[Common.textSmall]}>소유하고 계신 카드에 관련된</Text>
        <Text style={[Common.textSmall]}>이벤트들을 모아봤어요!</Text>
      </View>
      <FlatList
        data={noticeData}
        renderItem={renderItem}
        keyExtractor={(item) => item.alarmId.toString()}
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
    flexDirection: "column",
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  alarmTitle: {
    borderTopWidth: 1.2,
    borderColor: KeyColors.lightGray,
    paddingVertical: 5,
    maxWidth: "80%",
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
