import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ToggleButton = () => {
  const [selected, setSelected] = useState("가맹점");

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
