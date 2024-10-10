import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";

import Common from "../styles/Common"; // 스타일 파일 가져오기
import KeyColors from "../styles/KeyColor";

import { mockUser } from "@/mock/mockUser";
import axios from "axios";

export default function AddcardScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const [cardData, setCardData] = useState<Card[]>([]);
  const [rotateImageStates, setRotateImageStates] = useState<{ [key: number]: boolean }>({}); // 카드 별 회전 상태 관리

  interface Card {
    cardCode: string;
    cardName: string;
    cardCompanyId: number;
    cardCompanyName: string;
    cardImageUrl: string;
    expiredDate: string;
    financialUserCardId: number;
  }

  const fetchCards = async () => {
    try {
      const response = await axios.post(
        `http://j11a405.p.ssafy.io:8081/members/cards/get/renewal`,
        {},
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
          },
        }
      );
      setCardData(response.data.data.memberCardRenewals);
    } catch (error) {
      console.error("카드 가져오기 오류 발생 : ", error);
    }
  };

  const handleSubmit = async () => {
    if (selectedCardIds.length === 0) {
      Alert.alert("카드 선택", "선택된 카드가 없습니다.");
      return;
    }

    const requestBody = {
      financialUserCardIds: selectedCardIds,
    };

    try {
      const response = await axios.post(
        `http://j11a405.p.ssafy.io:8081/members/cards/post`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${mockUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("카드 등록", `${selectedCardIds.length}개의 카드가 등록되었습니다.`);
      navigation.navigate("Mypage");
    } catch (error) {
      console.error("카드 등록 실패: ", error);
      Alert.alert("카드 등록 실패", "카드 등록 중 오류가 발생했습니다.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCards();
    }, [])
  );

  // 카드 이미지의 가로 세로 비율에 따라 회전 여부를 결정하는 함수
  const checkImageRotation = (card: Card) => {
    Image.getSize(card.cardImageUrl, (width, height) => {
      setRotateImageStates((prev) => ({
        ...prev,
        [card.financialUserCardId]: height > width, // 세로가 더 긴 경우 true 설정
      }));
    });
  };

  useEffect(() => {
    // 카드 데이터가 변경될 때마다 각 카드의 이미지 회전 여부를 체크
    cardData.forEach(checkImageRotation);
  }, [cardData]);

  return (
    <View style={AddcardStyle.container}>
      <ScrollView contentContainerStyle={AddcardStyle.scrollContainer}>
        <View style={AddcardStyle.commentContainer}>
          <Text style={[Common.textSmall, { fontFamily: "SUITE-Bold", fontSize: 13 }]}>
            소유하고 계신 카드 중에서
          </Text>
          <Text style={[Common.textSmall, { fontFamily: "SUITE-Bold", fontSize: 13 }]}>
            앱에서 표시하고 싶은 카드를 선택해주세요!
          </Text>
          <Text style={[Common.textSmall, { fontFamily: "SUITE-Bold", fontSize: 13 }]}>
            카드 갱신 이후에 소유 카드 정보는
          </Text>
          <Text style={[Common.textSmall, { fontFamily: "SUITE-Bold", fontSize: 13 }]}>
            다음 갱신까지 폐기됩니다.
          </Text>
        </View>

        {cardData.length === 0 ? (
          <View style={AddcardStyle.noCardContainer}>
            <Image
              style={AddcardStyle.noCardImage}
              source={require("../assets/icons/icon_no.png")}
            />
            <Text style={[Common.textBold, Common.textBlack]}>갱신할 카드가 없습니다</Text>
          </View>
        ) : (
          <View style={AddcardStyle.cardListContainer}>
            {cardData.map((card) => (
              <TouchableOpacity
                key={card.financialUserCardId}
                style={[
                  AddcardStyle.card,
                  {
                    borderColor: selectedCardIds.includes(card.financialUserCardId)
                      ? KeyColors.blue
                      : "#FFFFFF",
                    borderWidth: selectedCardIds.includes(card.financialUserCardId) ? 2 : 2,
                  },
                ]}
                onPress={() => {
                  const newSelectedCardIds = [...selectedCardIds];
                  const index = newSelectedCardIds.indexOf(card.financialUserCardId);
                  if (index !== -1) {
                    newSelectedCardIds.splice(index, 1);
                  } else {
                    newSelectedCardIds.push(card.financialUserCardId);
                  }
                  setSelectedCardIds(newSelectedCardIds);
                }}
              >
                <View style={AddcardStyle.cardImageContainer}>
                  <Image
                    source={{ uri: card.cardImageUrl }}
                    style={[
                      AddcardStyle.cardImage,
                      rotateImageStates[card.financialUserCardId]
                        ? { transform: [{ rotate: "-90deg" }] }
                        : {},
                    ]}
                    resizeMode="contain"
                  />
                </View>

                <View style={AddcardStyle.cardTextContainer}>
                  <Text style={[Common.textBold, Common.textBlack]}>{card.cardName}</Text>

                  {selectedCardIds.includes(card.financialUserCardId) ? (
                    <Text
                      style={[
                        AddcardStyle.selectText,
                        Common.textSmall,
                        { fontFamily: "SUITE-Bold" },
                      ]}
                    >
                      선택됨 ●
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={AddcardStyle.submitButtonContainer}>
        <TouchableOpacity
          style={[
            AddcardStyle.submitButton,
            {
              backgroundColor: selectedCardIds.length > 0 ? KeyColors.blue : KeyColors.gray,
            },
          ]}
          onPress={handleSubmit}
          disabled={selectedCardIds.length === 0}
        >
          {selectedCardIds.length === 0 ? (
            <Text style={[Common.textBold, { color: "#FFFFFF", fontSize: 16, paddingBottom: 3 }]}>
              선택 필요
            </Text>
          ) : (
            <Text style={[Common.textBold, { color: "#FFFFFF", fontSize: 16, paddingBottom: 3 }]}>
              갱신 하기
            </Text>
          )}
          {selectedCardIds.length === 0 ? (
            <Text style={[{ color: "#FFFFFF", fontFamily: "SUITE-Bold", fontSize: 11 }]}>
              카드를 탭해서 선택해주세요.
            </Text>
          ) : (
            <Text style={[{ color: "#FFFFFF", fontFamily: "SUITE-Bold", fontSize: 11 }]}>
              {selectedCardIds.length}개 선택됨
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const AddcardStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 50,
  },
  commentContainer: {
    backgroundColor: KeyColors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    width: 250,
    gap: 1,
    fontFamily: "SUITE-Bold",
  },
  noCardContainer: {
    width: width - 40,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  noCardImage: {
    width: 60,
    height: 60,
  },
  cardListContainer: {
    width: width - 40,
    borderRadius: 8,
    marginTop: 10,
  },
  card: {
    borderRadius: 4,
    height: 100,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
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
  selectText: {
    position: "absolute",
    bottom: 0,
    right: 0,
    color: KeyColors.blue,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: KeyColors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  submitButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "white",
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%",
    borderRadius: 4,
  },
  cardImageContainer: {
    width: 80,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    paddingLeft: 20,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    marginHorizontal: 10,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 15,
  },
});
