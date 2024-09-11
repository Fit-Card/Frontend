import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ToggleButtonProps {
  selected: string;
  setSelected: (value: string) => void; // setSelected가 문자열을 인자로 받는 함수
}

const ToggleButton = ({ selected, setSelected }: ToggleButtonProps) => {
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[styles.toggleButton, selected === "가맹점" && styles.selectedButton]}
        onPress={() => setSelected("가맹점")}
      >
        <Text style={[styles.buttonText, selected === "가맹점" && styles.selectedText]}>
          가맹점
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.toggleButton, selected === "카드" && styles.selectedButton]}
        onPress={() => setSelected("카드")}
      >
        <Text style={[styles.buttonText, selected === "카드" && styles.selectedText]}>카드</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#E1E1E1",
    padding: 4,
    borderRadius: 25,
    alignItems: "center",
    position: "absolute",
    top: 10,
  },
  toggleButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: "white",
    borderColor: "#5253F0",
    borderWidth: 2.5,
  },
  buttonText: {
    color: "#787878",
    fontSize: 15,
    fontFamily: "SUITE-Bold",
  },
  selectedText: {
    color: "#5253F0",
  },
});

export default ToggleButton;
