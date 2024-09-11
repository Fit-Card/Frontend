import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonComponentProps = {
  title: string;
  isSelected: boolean;
  onPress: () => void;
  customStyle?: object; // 추가적인 스타일을 받을 수 있게 함
  textStyle?: object; // 텍스트 스타일도 받음
};

const ButtonComponent = ({
  title,
  isSelected,
  onPress,
  customStyle,
  textStyle,
}: ButtonComponentProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected ? styles.buttonPressed : styles.buttonNormal,
        customStyle, // 전달된 추가적인 스타일을 적용
      ]}
      onPress={onPress}
    >
      <Text
        style={[styles.buttonText, isSelected ? styles.textPressed : styles.textNormal, textStyle]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 2,
    marginHorizontal: 2,
  },
  buttonNormal: {
    backgroundColor: "white",
    borderColor: "#C1C1FF",
  },
  buttonPressed: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "SUITE-Bold",
    textAlign: "center",
  },
  textNormal: {
    color: "#3436DF",
  },
  textPressed: {
    color: "white",
  },
});
