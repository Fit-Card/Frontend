import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import common from "@/styles/Common";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

const CustomButton = ({ title, onPress }: CustomButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: common.textBlue.color,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "SUITE-Regular", // 폰트 적용
    color: "white",
    fontSize: 16,
  },
});

export default CustomButton;
