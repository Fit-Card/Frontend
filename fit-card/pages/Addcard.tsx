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
  // 카드 데이터
  const [cardData, setCardData] = useState<Card[]>([]);

  interface Card {
    cardCode: string;
    cardName: string;
    cardCompanyId: number;
    cardCompanyName: string;
    cardImageUrl: string;
    expiredDate: string;
    financialUserCardId: number;
  }

  //카드 불러오기
  const fetchCards = async () => {
    console.log(mockUser.token + "  -----------");
    // alert("갱신 가능 카드 불러오기");
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
      console.log(response.data.data.memberCardRenewals);
      setCardData(response.data.data.memberCardRenewals);
    } catch (error) {
      console.error("카드 가져오기 오류 발생 : ", error);
    }
  }; //fetchCards 끝

  // 카드 등록
  const handleSubmit = async () => {
    if (selectedCardIds.length === 0) {
      Alert.alert("카드 선택", "선택된 카드가 없습니다.");
      return;
    }

    const requestBody = {
      financialUserCardIds: selectedCardIds,
    };

    try {
      console.log("전송 시도...보내는 카드는");
      console.log(selectedCardIds);
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

      console.log("카드 등록 성공: ", response.data);
      Alert.alert("카드 등록", `${selectedCardIds.length}개의 카드가 등록되었습니다.`);
      navigation.navigate("Mypage");
    } catch (error) {
      console.error("카드 등록 실패: ", error);
      Alert.alert("카드 등록 실패", "카드 등록 중 오류가 발생했습니다.");
    }
  }; //handleSubmit 끝

  useFocusEffect(
    useCallback(() => {
      fetchCards();
    }, [])
  );

  return (
    <View style={AddcardStyle.container}>
      <ScrollView contentContainerStyle={AddcardStyle.scrollContainer}>
        {/* 안내 문구 */}
        <View style={AddcardStyle.commentContainer}>
          <Text style={[Common.textSmall]}>소유하고 계신 카드 중에서</Text>
          <Text style={[Common.textSmall]}>앱에서 표시하고 싶은 카드를 선택해주세요!</Text>
          <Text style={[Common.textSmall]}>카드 갱신 이후에 소유 카드 정보는</Text>
          <Text style={[Common.textSmall]}>다음 갱신까지 폐기됩니다.</Text>
        </View>

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
                  // 카드가 이미 선택되어있을 경우 : 제거
                  newSelectedCardIds.splice(index, 1);
                } else {
                  // 카드가 새로 선택된 경우 : 추가
                  newSelectedCardIds.push(card.financialUserCardId);
                }
                setSelectedCardIds(newSelectedCardIds);
              }}
            >
              <View style={AddcardStyle.cardImageContainer}>
                <Image
                  source={{ uri: card.cardImageUrl }} // PNG 파일 경로
                  style={AddcardStyle.cardImage} // 아이콘 스타일
                  resizeMode="contain"
                />
              </View>

              <View style={AddcardStyle.cardTextContainer}>
                <Text style={[Common.textBold, Common.textBlack]}>{card.cardName}</Text>

                {selectedCardIds.includes(card.financialUserCardId) ? (
                  <Text style={[AddcardStyle.selectText, Common.textSmall]}>선택됨 ●</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
            <Text style={[Common.textBold, { color: "#FFFFFF" }]}>선택 필요</Text>
          ) : (
            <Text style={[Common.textBold, { color: "#FFFFFF" }]}>갱신 하기</Text>
          )}
          {selectedCardIds.length === 0 ? (
            <Text style={[Common.textSmall, { color: "#FFFFFF" }]}>
              카드를 탭해서 선택해주세요.
            </Text>
          ) : (
            <Text style={[Common.textSmall, { color: "#FFFFFF" }]}>
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
    position: "absolute", // Absolute position
    bottom: 0, // 5px from bottom
    right: 0, // 10px from right
    color: KeyColors.blue,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure header is on top
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
  },
  submitButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  submitButton: {
    width: width - 40,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImageContainer: {
    height: "100%",
    minWidth: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: 80,
    height: 80,
  },
  cardTextContainer: {
    height: "100%",
    flex: 1,
    position: "relative",
    display: "flex",
  },
});
