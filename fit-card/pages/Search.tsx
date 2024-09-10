import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ToggleButton from "@/components/benefit/ToggleButton";
import SearchInput from "@/components/benefit/TextInputBox";
import BasicImage from "@/components/benefit/BasicImage";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <ToggleButton />
      <SearchInput />
      <BasicImage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
