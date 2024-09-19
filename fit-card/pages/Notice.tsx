import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "@/navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import KeyColors from "@/styles/KeyColor";
import Common from "@/styles/Common";

interface Notice {
  id: string;
  title: string;
  isRead: boolean;
}

const dummyNotices: Notice[] = [
  { id: "1", title: "A카드", isRead: false },
  { id: "2", title: "B카드", isRead: false },
  { id: "3", title: "C카드", isRead: false },
  { id: "4", title: "A카드", isRead: false },
  { id: "5", title: "D카드", isRead: false },
  { id: "6", title: "E카드", isRead: false },
  { id: "7", title: "C카드", isRead: false },
];

export default function NoticeScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  
  const handleNoticePress = (notice: Notice) => {
    // alert(notice.id + "를 열람하는 로직!");
    notice.isRead = true;
    navigation.navigate("Noticedetail", { noticeId: notice.id });
  };

  const renderItem = ({ item }: { item: Notice }) => (
    <TouchableOpacity style={noticeStyle.card} onPress={() => handleNoticePress(item)}>
      <Text style={[noticeStyle.cardTitle, Common.textBlack]}>{item.title}</Text>
      <Text style={[noticeStyle.cardText, Common.textGray, {fontSize: 12}]}>ID:{item.id} 에 대한 설명 텍스트 자리</Text>
      {!item.isRead && <Text style={[noticeStyle.unreadText, Common.textSmall]}>~시간 전 ●</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={noticeStyle.container}>
      <View style={noticeStyle.commentContainer}>
        <Text style={[Common.textSmall]} >소유하고 계신 카드에 관련된</Text>
        <Text style={[Common.textSmall]} >이벤트들을 모아봤어요!</Text>
      </View>
      <FlatList
        data={dummyNotices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardText : {
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
    width: width-10,
  },
  unreadText: {
    position: "absolute",
    bottom: 5, 
    right: 10,
    color: KeyColors.blue,
  },
});
