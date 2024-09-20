import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import common from "../styles/Common"; // 스타일 파일 가져오기
import KeyColors from "@/styles/KeyColor";

export default function MypageScreen() {
  // NavigationProp 타입 지정
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 모달 가시성 상태

  const handleLogout = () => {
    alert("로그아웃 로직!");
    navigation.navigate("Login");
  }

  const handleCancel = () => {
    setModalVisible(false);
  }

  return (
    <View>
      <ScrollView style={[mypageStyle.container]}>
      {/* 인삿말 */}
      <View style={[mypageStyle.helloContainer]}>
        <Text style={[common.textBlue, common.textLarge, common.textBold]}>
          윤싸피
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
        <TouchableOpacity
          style={[mypageStyle.menuOption]}
          onPress={() => navigation.navigate("Addcard")}
        >
          <Image
            source={require("../assets/icons/icon_creditcard.png")} // PNG 파일 경로
            style={mypageStyle.menuIcon} // 아이콘 스타일
          />
          <Text style={[mypageStyle.menuText]}>카드 갱신</Text>
        </TouchableOpacity>

        {/* 카드 삭제 */}
        <TouchableOpacity 
          style={mypageStyle.menuOption}
          onPress={() => navigation.navigate("Deletecard")}
        >
          <Image
            source={require("../assets/icons/icon_delete.png")} // PNG 파일 경로
            style={mypageStyle.menuIcon} // 아이콘 스타일
          />
          <Text style={mypageStyle.menuText}>카드 삭제</Text>
        </TouchableOpacity>

        <View style={mypageStyle.menuTitle}>
          <Text style={[common.textGray, common.textBold]}>사용자 설정</Text>
        </View>

        {/* 사용자 정보 관리 */}
        <TouchableOpacity style={mypageStyle.menuOption} onPress={()=>{navigation.navigate("PersonalInfo")}}>
          <Image
            source={require("../assets/icons/icon_info.png")} // PNG 파일 경로
            style={mypageStyle.menuIcon} // 아이콘 스타일
          />
          <Text style={mypageStyle.menuText}>사용자 정보 관리</Text>
        </TouchableOpacity>

        {/* 로그아웃 */}
        <TouchableOpacity style={mypageStyle.menuOption} onPress={()=>{setModalVisible(true)}}>
          <Image
            source={require("../assets/icons/icon_signout.png")} // PNG 파일 경로
            style={mypageStyle.menuIcon} // 아이콘 스타일
          />
          <Text style={mypageStyle.menuText}>로그아웃</Text>
        </TouchableOpacity>

        {/* 회원 탈퇴 */}
        <TouchableOpacity style={mypageStyle.menuOption}>
          <Image
            source={require("../assets/icons/icon_no_red.png")} // PNG 파일 경로
            style={mypageStyle.menuIcon} // 아이콘 스타일
          />
          <Text style={[mypageStyle.menuText, common.textRed]}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
    {/* 카드 삭제 모달 */}
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={mypageStyle.modalBackground}>
          <View style={mypageStyle.modalContainer}>
                <View style={mypageStyle.modalImageContainer}>
                  <Image
                    source={require("../assets/icons/icon_creditcard.png")} // PNG 파일 경로
                    style={mypageStyle.modalImage} // 아이콘 스타일
                    resizeMode="contain"
                  />
                </View>

                <View style={mypageStyle.modalButtonContainer}>
                  <TouchableOpacity
                    style={[
                      mypageStyle.cancelButton,
                      mypageStyle.modalButton,
                    ]}
                    onPress={handleCancel}
                  >
                    <Text style={[{ color: "#FFFFFF" }, common.textBold]}>
                      취소
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      mypageStyle.deleteButton,
                      mypageStyle.modalButton,
                    ]}
                    onPress={handleLogout}
                  >
                    <Text style={[{ color: "#FFFFFF" }, common.textBold]}>
                      로그아웃
                    </Text>
                  </TouchableOpacity>
                </View>
          </View>
        </View>
      </Modal>
    </View>
    
  );
}

const mypageStyle = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
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
  modalBackground: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
  },
  modalButtonContainer: {
    marginTop: 20,
    width: "90%",
  },
  modalButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 2,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: KeyColors.black,
  },
  deleteButton: {
    backgroundColor: KeyColors.blue,
  },
  modalImageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    maxWidth: "90%",
    minHeight: 200,
    maxHeight: 200,
    padding: 10,
  },
  modalImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
});
