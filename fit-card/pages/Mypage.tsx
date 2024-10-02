import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import { StackParamList } from "../navigationTypes";
import common from "../styles/Common"; // 스타일 파일 가져오기
import KeyColors from "@/styles/KeyColor";

import axios from "axios";
import { mockUser } from "@/mock/mockUser";
import { current } from "@reduxjs/toolkit";

export default function MypageScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // 현재 카드 인덱스 상태
  const [cardData, setCardData] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  useFocusEffect(
    useCallback(() => {
      console.log("Mypage 렌더링");
      fetchCards();
      handleSnapToItem(0);
      setCurrentCardIndex(0);
      console.log("지금카드: " + currentCardIndex);
      console.log("총 카드: " + cardData.length);
    }, [])
  );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentCardIndex(currentCardIndex + 1);
  //     console.log(currentCardIndex);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [currentCardIndex, cardData.length]);

  interface Card {
    cardName: string;
    cardImageUrl: string;
  }

  const fetchCards = async () => {
    // alert("카드 전체 불러오기");
    try {
      const response = await axios.post(
        `http://j11a405.p.ssafy.io:8081/members/cards/get/all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
          },
        }
      );
      // console.log("전체 데이터 불러오기...");
      const fetchedCardData = response.data.data.memberCards;
      setCardData(fetchedCardData);
      setIsLoading(false); // 데이터 로드 완료 후 로딩 상태를 false로 변경
    } catch (error) {
      console.error("카드 가져오기 오류 발생 : ", error);
      setIsLoading(false); // 오류 발생 시에도 로딩 상태를 false로 변경
    }
  };
  //

  const handleSnapToItem = (index: number) => {
    console.log("캐러셀 넘김 : " + index);
    setCurrentCardIndex(index);
  };

  const renderCarouselItem = ({ item }: { item: { cardName: string; cardImageUrl: string } }) => (
    <TouchableOpacity style={[mypageStyle.carouselImageContainer]}>
      <Image source={{ uri: item.cardImageUrl }} style={[mypageStyle.carouselImage]} />
    </TouchableOpacity>
  );

  return (
    <View>
      <ScrollView style={[mypageStyle.container]}>
        {/* 인삿말 */}
        <View style={[mypageStyle.helloContainer]}>
          <Text style={[common.textBlue, common.textLarge, common.textBold]}>
            {mockUser.name}
            <Text style={[common.textGray, common.textMedium, common.textBold]}>
              님, 반갑습니다.
            </Text>
          </Text>
        </View>

        {/* 카드 Carousel */}
        <View style={[mypageStyle.carouselContainer]}>
          <View style={[mypageStyle.carouselSideArrowContainer]}>
            {cardData.length > 0 && (
              <Image
                source={require("@/assets/icons/icon_left.png")}
                style={mypageStyle.carouselSideArrow}
              ></Image>
            )}
          </View>
          {/* 로딩 중일 때 */}
          {isLoading ? (
            <Text>카드 데이터를 불러오는 중...</Text>
          ) : cardData.length > 0 ? (
            <View style={[mypageStyle.carouselContent]}>
              <>
                <Carousel
                  width={300}
                  height={120}
                  data={cardData}
                  scrollAnimationDuration={400}
                  onSnapToItem={handleSnapToItem} // 카드 변경 시 트리거
                  renderItem={renderCarouselItem}
                />
                <Text style={[mypageStyle.cardNameText, common.textGray, common.textBold]}>
                  {currentCardIndex + 1} {". "} {cardData[currentCardIndex].cardName}
                </Text>
              </>
            </View>
          ) : (
            <View style={[mypageStyle.carouselContent]}>
              <Image
                style={mypageStyle.noCardImage}
                source={require("../assets/icons/icon_no.png")}
              ></Image>
              <Text style={[common.textBlack, common.textBold, { fontSize: 14 }]}>
                표시할 카드가 없습니다.
              </Text>
              <Text style={[common.textBlack, { fontSize: 10 }]}>카드를 갱신해주세요.</Text>
            </View>
          )}
          <View style={[mypageStyle.carouselSideArrowContainer]}>
            {cardData.length > 0 && (
              <Image
                source={require("@/assets/icons/icon_right.png")}
                style={mypageStyle.carouselSideArrow}
              ></Image>
            )}
          </View>
        </View>

        {/* 퀵메뉴 내용들 */}
        <View style={[mypageStyle.menuContainer]}>
          <View style={[mypageStyle.menuTitle]}>
            <Text style={[common.textBold, common.textGray]}>카드 정보</Text>
          </View>

          <TouchableOpacity
            style={[mypageStyle.menuOption]}
            onPress={() => navigation.navigate("Addcard")}
          >
            <Image
              source={require("../assets/icons/icon_creditcard.png")}
              style={mypageStyle.menuIcon}
            />
            <Text style={[mypageStyle.menuText]}>카드 갱신</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={mypageStyle.menuOption}
            onPress={() => navigation.navigate("Deletecard")}
          >
            <Image
              source={require("../assets/icons/icon_delete.png")}
              style={mypageStyle.menuIcon}
            />
            <Text style={[mypageStyle.menuText]}>카드 삭제</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[mypageStyle.menuOption]}
            onPress={() => navigation.navigate("Notice")}
          >
            <Image
              source={require("../assets/icons/icon_notice.png")}
              style={mypageStyle.menuIcon}
            />
            <Text style={[mypageStyle.menuText]}>이벤트 알림</Text>
          </TouchableOpacity>

          <View style={mypageStyle.menuTitle}>
            <Text style={[common.textGray, common.textBold]}>사용자 설정</Text>
          </View>

          <TouchableOpacity
            style={mypageStyle.menuOption}
            onPress={() => {
              navigation.navigate("PersonalInfo");
            }}
          >
            <Image source={require("../assets/icons/icon_info.png")} style={mypageStyle.menuIcon} />
            <Text style={[mypageStyle.menuText]}>사용자 정보 관리</Text>
          </TouchableOpacity>

          <TouchableOpacity style={mypageStyle.menuOption}>
            <Image
              source={require("../assets/icons/icon_signout.png")}
              style={mypageStyle.menuIcon}
            />
            <Text style={mypageStyle.menuText}>로그아웃</Text>
          </TouchableOpacity>

          <TouchableOpacity style={mypageStyle.menuOption}>
            <Image
              source={require("../assets/icons/icon_no_red.png")}
              style={mypageStyle.menuIcon}
            />
            <Text style={[mypageStyle.menuText, common.textRed]}>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    display: "flex",
    flexDirection: "row",
  },
  carouselContent: {
    flex: 1,
    height: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  carouselSideArrowContainer: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselSideArrow: {
    width: 30,
    height: 30,
  },
  carouselImageContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselImage: {
    width: 200,
    height: 80,
    resizeMode: "contain",
  },
  cardNameText: {
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: KeyColors.blue,
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
  noCardImage: { width: 60, height: 60 },
  noCardText: {
    fontSize: 13,
  },
});
