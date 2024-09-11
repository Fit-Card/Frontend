import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../navigationTypes";
import Header from "@/components/Header";
import Common from "../styles/Common";
import KeyColors from "../styles/KeyColor";
import common from "../styles/Common";

export default function DeletecardScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [selectedCardId, setSelectedCardId] = useState<number | null>(null); // 1개의 카드만 선택
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 모달 가시성 상태
  const [cardData, setCardData] = useState([
    { id: 1, name: "카드1" },
    { id: 2, name: "카드2" },
    { id: 3, name: "카드3" },
    { id: 4, name: "카드4" },
    { id: 5, name: "카드5" },
  ]); // 카드 데이터

  const handleCardPress = (cardId: number) => {
    setSelectedCardId(cardId); // 1개의 카드만 선택
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedCardId(null);
  }

  const handleDelete = () => {
    if (selectedCardId !== null) {
      setCardData((prevCards) => prevCards.filter((card) => card.id !== selectedCardId));
      setModalVisible(false);
      alert("카드 삭제 완료");
      setSelectedCardId(null);
    }
  };

  return (
    <View style={DeletecardStyle.container}>
      <View style={DeletecardStyle.headerContainer}>
        <Header title="카드 삭제" />
      </View>

      <ScrollView contentContainerStyle={DeletecardStyle.scrollContainer}>
        {/* 안내 문구 */}
        <View style={DeletecardStyle.commentContainer}>
          <Text style={[Common.textSmall]}>갱신을 통해 등록한 카드 중에서</Text>
          <Text style={[Common.textSmall]}>앱에서 삭제하고 싶은 카드를 선택해주세요!</Text>
          <Text style={[Common.textSmall]}>삭제를 하더라도, 이후 카드갱신에서</Text>
          <Text style={[Common.textSmall]}>다시 등록할 수 있습니다.</Text>
        </View>

        <View style={DeletecardStyle.cardListContainer}>
          {cardData.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                DeletecardStyle.card,
                {
                  borderColor: selectedCardId === card.id ? KeyColors.red : "#FFFFFF",
                  borderWidth: selectedCardId === card.id ? 2 : 2,
                },
              ]}
              onPress={() => handleCardPress(card.id)} // 카드 선택 시 모달 띄움
            >
              <View style={DeletecardStyle.cardImageContainer}>
                <Image
                  source={require("../assets/icons/icon_creditcard.png")} // PNG 파일 경로
                  style={DeletecardStyle.cardImage} // 아이콘 스타일
                  resizeMode="contain"
                />
              </View>

              <View style={DeletecardStyle.cardTextContainer}>
                <Text style={[Common.textBold, Common.textBlack]}>{card.name}</Text>

                {selectedCardId === card.id ? (
                  <Text style={[DeletecardStyle.selectText, Common.textSmall]}>선택됨 ●</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 카드 삭제 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={DeletecardStyle.modalBackground}>
          <View style={DeletecardStyle.modalContainer}>
            {selectedCardId !== null ? (
              <>
                <View style={DeletecardStyle.modalImageContainer}>
                  <Image
                    source={require("../assets/icons/icon_creditcard.png")} // PNG 파일 경로
                    style={DeletecardStyle.modalImage} // 아이콘 스타일
                    resizeMode="contain"
                  />
                </View>
                <Text style={[Common.textBold, Common.textBlack]}>
                  {cardData.find((card) => card.id === selectedCardId)?.name}
                </Text>

                <View style={DeletecardStyle.modalButtonContainer}>
                  <TouchableOpacity
                    style={[DeletecardStyle.cancelButton, DeletecardStyle.modalButton]}
                    onPress={handleCancel}
                  >
                    <Text style={[{ color: "#FFFFFF" }, common.textBold]}>선택 취소</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[DeletecardStyle.deleteButton, DeletecardStyle.modalButton]}
                    onPress={handleDelete}
                  >
                    <Text style={[{ color: "#FFFFFF" }, common.textBold]}>카드 삭제</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const DeletecardStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 100,
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
    color: KeyColors.red,
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
    minHeight: 200,
    minWidth: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  
  },
  cardImage: {
    
  },
  cardTextContainer: {
    height: "100%",
    flex: 1,
    position: "relative",
    display: "flex",
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
