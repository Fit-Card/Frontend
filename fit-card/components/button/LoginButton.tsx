import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import common from "@/styles/Common";

type LoginButtonProps = {
  onPress: () => void;
};

const LoginButton = ({ onPress }: LoginButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[styles.buttonText, common.textBold]}>로그인</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: common.textBlue.color,
    height: 55,
    padding: 10,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

export default LoginButton;
