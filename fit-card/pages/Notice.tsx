import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";

interface Notice {
  id: string;
  title: string;
  isRead: boolean;
}

const dummyNotices: Notice[] = [
  { id: "1", title: "첫 번째 공지사항", isRead: false },
  { id: "2", title: "두 번째 공지사항", isRead: true },
  { id: "3", title: "세 번째 공지사항", isRead: false },
];

export default function NoticeScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  // 알림을 클릭하면 해당 ID를 전달하면서 자세히 보기 페이지로 이동
  const handleNoticePress = (notice: Notice) => {
    alert(notice.id + "를 열람하는 로직!");
    notice.isRead = true;
    navigation.navigate("Noticedetail", {noticeId: notice.id});
  };

  const renderItem = ({ item }: { item: Notice }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleNoticePress(item)}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      {!item.isRead && <Text style={styles.unread}>보지 않음</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dummyNotices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  unread: {
    position: "absolute",
    right: 16,
    bottom: 8,
    color: "#007BFF", // 파란색
    fontSize: 12,
  },
});
