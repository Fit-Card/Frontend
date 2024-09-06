import React from "react";

import { View, Text, Button, StyleSheet, Image} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import common from "../styles/Common"; // 스타일 파일 가져오기
import CustomButton from "../components/button/CustomButton";

export default function MypageScreen() {
  // NavigationProp 타입 지정
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  return (
    <SafeAreaView style={mypageStyle.container}>
      {/* 인삿말 */}
      <View style={[mypageStyle.helloContainer]}>
        <Text style={[common.textBlue, common.textLarge, common.textBold]}>
          김싸피
          <Text style={[common.textGray, common.textMedium, common.textBold]}>님, 반갑습니다.</Text>
        </Text>
      </View>

      {/* 카드 Carousel */}
      <View style={[mypageStyle.carouselContainer]}>
        <Text>요기에 Carousel</Text>
      </View>

      {/* 퀵메뉴 내용들 */}
      <View style={[mypageStyle.menuContainer]}>
        <View style={[mypageStyle.menuTitle]}>
          <Text style={[common.textBold, common.textGray]}>카드 관리</Text>
        </View>

        {/* 카드 갱신 */}
        <View style={[mypageStyle.menuOption]}>
          <Image
            source={require("../assets/icons/icon_creditcard.png")} // PNG 파일 경로
            style={[mypageStyle.menuIcon]} // 아이콘 스타일
          />
          <Text style={[mypageStyle.menuText]}>카드 갱신</Text>
        </View>
        {/* 카드 삭제 */}
        <View style={[mypageStyle.menuOption]}>
          <Image
            source={require("../assets/icons/icon_delete.png")} // PNG 파일 경로
            style={[mypageStyle.menuIcon]} // 아이콘 스타일
          />
          <Text style={[mypageStyle.menuText]}>카드 삭제</Text>
        </View>

        <View style={[mypageStyle.menuTitle]}>
          <Text style={[common.textGray, common.textBold]}>사용자 설정</Text>
        </View>
                {/* 사용자 정보 관리 */}
                <View style={[mypageStyle.menuOption]}>
          <Image
            source={require("../assets/icons/icon_info.png")} // PNG 파일 경로
            style={[mypageStyle.menuIcon]} // 아이콘 스타일
          />
          <Text style={[mypageStyle.menuText]}>사용자 정보 관리</Text>
        </View>
                {/* 로그아웃 */}
                <View style={[mypageStyle.menuOption]}>
          <Image
            source={require("../assets/icons/icon_signout.png")} // PNG 파일 경로
            style={[mypageStyle.menuIcon]} // 아이콘 스타일
          />
          <Text style={[mypageStyle.menuText]}>로그아웃</Text>
        </View>
                {/* 회원 탈퇴 */}
                <View style={[mypageStyle.menuOption]}>
          <Image
            source={require("../assets/icons/icon_no_red.png")} // PNG 파일 경로
            style={[mypageStyle.menuIcon]} // 아이콘 스타일
          />
          <Text style={[mypageStyle.menuText, common.textRed]}>회원 탈퇴</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const mypageStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  helloContainer: {
    display: "flex",
    width: "100%",
    padding: 2,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: "flex-start",
  },
  carouselContainer: {
    backgroundColor: "#DBE1E7",
    width: "100%",
    height: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  menuContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  menuTitle: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    borderColor: "#DBE1E7",
    marginTop: 20,
  },
  menuOption: {
    width: "100%",
    padding: 0,
    margin: 0,
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    width: 28,
    height: 28,
    marginLeft: 10,
    marginRight: 20,
  },
  menuText: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
});
