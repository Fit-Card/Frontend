import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonComponentProps = {
  title: string;
  isSelected: boolean;
  onPress: () => void;
};

const ButtonComponent = ({ title, isSelected, onPress }: ButtonComponentProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected ? styles.buttonPressed : styles.buttonNormal]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isSelected ? styles.textPressed : styles.textNormal]}>
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
