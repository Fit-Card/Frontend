import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";

import Common from "../styles/Common"; // 스타일 파일 가져오기
import KeyColors from "../styles/KeyColor";

export default function AddcardScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);

  // 카드 데이터
  const cardData = [
    { id: 1, name: "카드1" },
    { id: 2, name: "카드2" },
    { id: 3, name: "카드3" },
    { id: 4, name: "카드4" },
    { id: 5, name: "카드5" },
  ];

  const handleSubmit = () => {
    if (selectedCardIds.length > 0) {
      alert(`총 ${selectedCardIds.length}개의 카드를 등록했습니다.`);
      navigation.navigate("Mypage");
    }
  };

  return (
    <View style={AddcardStyle.container}>
      <ScrollView contentContainerStyle={AddcardStyle.scrollContainer}>
        {/* 안내 문구 */}
        <View style={AddcardStyle.commentContainer}>
          <Text style={[Common.textSmall]}>소유하고 계신 카드 중에서</Text>
          <Text style={[Common.textSmall]}>
            앱에서 표시하고 싶은 카드를 선택해주세요!
          </Text>
          <Text style={[Common.textSmall]}>
            카드 갱신 이후에 소유 카드 정보는
          </Text>
          <Text style={[Common.textSmall]}>다음 갱신까지 폐기됩니다.</Text>
        </View>

        <View style={AddcardStyle.cardListContainer}>
          {cardData.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                AddcardStyle.card,
                {
                  borderColor: selectedCardIds.includes(card.id)
                    ? KeyColors.blue
                    : "#FFFFFF",
                  borderWidth: selectedCardIds.includes(card.id) ? 2 : 2,
                },
              ]}
              onPress={() => {
                const newSelectedCardIds = [...selectedCardIds];
                const index = newSelectedCardIds.indexOf(card.id);
                if (index !== -1) {
                  // 카드가 이미 선택되어있을 경우 : 제거
                  newSelectedCardIds.splice(index, 1);
                } else {
                  // 카드가 새로 선택된 경우 : 추가
                  newSelectedCardIds.push(card.id);
                }
                setSelectedCardIds(newSelectedCardIds);
              }}
            >
              <View style={AddcardStyle.cardImageContainer}>
                <Image
                  source={require("../assets/icons/icon_creditcard.png")} // PNG 파일 경로
                  style={AddcardStyle.cardImage} // 아이콘 스타일
                  resizeMode="contain"
                />
              </View>

              <View style={AddcardStyle.cardTextContainer}>
                <Text style={[Common.textBold, Common.textBlack]}>
                  {card.name}
                </Text>

                {selectedCardIds.includes(card.id) ? (
                  <Text style={[AddcardStyle.selectText, Common.textSmall]}>
                    선택됨 ●
                  </Text>
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
              backgroundColor:
                selectedCardIds.length > 0 ? KeyColors.blue : KeyColors.gray,
            },
          ]}
          onPress={handleSubmit}
          disabled={selectedCardIds.length === 0}
        >
          {selectedCardIds.length === 0 ? (
            <Text style={[Common.textBold, { color: "#FFFFFF" }]}>
              선택 필요
            </Text>
          ) : (
            <Text style={[Common.textBold, { color: "#FFFFFF" }]}>
              갱신 하기
            </Text>
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
    backgroundColor: KeyColors.backGray,
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
  cardImage: {},
  cardTextContainer: {
    height: "100%",
    flex: 1,
    position: "relative",
    display: "flex",
  },
});
