import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { StackParamList } from "../navigationTypes";
import common from "../styles/Common"; // 스타일 파일 가져오기
import KeyColors from "@/styles/KeyColor";

export default function MypageScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // 현재 카드 인덱스 상태
  const cardData = [
    { name: "신한 머시기 카드", image: require("../assets/images/temp-card.png") },
    { name: "롯데 저시기 카드", image: require("../assets/images/temp-card.png") },
    { name: "우리 어쩌구 카드", image: require("../assets/images/temp-card.png") },
  ];

  const scrollValue = useSharedValue(0); // 캐러셀의 스크롤 상태를 관리

  const handleSnapToItem = (index: number) => {
    setCurrentCardIndex(index);
  };

  // 곡선 애니메이션 스타일 정의
  const animatedCarouselStyle = useAnimatedStyle(() => {
    // interpolate를 사용하여 X축 이동에 따라 Y축 곡선 이동 설정
    const translateX = interpolate(
      scrollValue.value,
      [-1, 0, 1],
      [-150, 0, 150], // 카드가 이동할 X축 범위
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      scrollValue.value,
      [-1, 0, 1],
      [50, 0, 50], // 카드가 이동할 Y축 범위 (곡선 효과)
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX: translateX }, { translateY: translateY }],
    };
  });

  const renderCarouselItem = ({ item }: { item: { name: string; image: any } }) => (
    <TouchableOpacity style={[mypageStyle.carouselImageContainer]}>
      <Image source={item.image} style={[mypageStyle.carouselImage]} />
    </TouchableOpacity>
  );

  return (
    <View>
      <ScrollView style={[mypageStyle.container]}>
        {/* 인삿말 */}
        <View style={[mypageStyle.helloContainer]}>
          <Text style={[common.textBlue, common.textLarge, common.textBold]}>
            윤싸피
            <Text style={[common.textGray, common.textMedium, common.textBold]}>
              님, 반갑습니다.
            </Text>
          </Text>
        </View>

        {/* 카드 Carousel */}
        <View style={[mypageStyle.carouselContainer]}>
          <Carousel
            width={300}
            height={120}
            data={cardData}
            scrollAnimationDuration={400}
            onProgressChange={(offsetProgress) => {
              scrollValue.value = offsetProgress;
            }} // 스크롤 상태 업데이트
            onSnapToItem={handleSnapToItem} // 카드 변경 시 트리거
            renderItem={renderCarouselItem}
            style={[mypageStyle.cardCarousel]}
          />
          <Text style={[mypageStyle.cardNameText, common.textGray, common.textBold]}>
            {cardData[currentCardIndex].name}
          </Text>
          <Animated.View style={[mypageStyle.animatedCard, animatedCarouselStyle]} />
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
            <Text style={mypageStyle.menuText}>카드 삭제</Text>
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

          <TouchableOpacity
            style={mypageStyle.menuOption}
            onPress={() => {
              // 로그아웃 로직
            }}
          >
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
    // backgroundColor: "#DBE1E7",
    width: "100%",
    height: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  cardCarousel: {
    // borderWidth: 1,
    // borderColor: "red",
  },
  animatedCard: {
    backgroundColor: "transparent", // 보이지 않도록 설정
  },
  carouselImageContainer: {
    // borderWidth: 2,
    // borderColor: "green",
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
});
