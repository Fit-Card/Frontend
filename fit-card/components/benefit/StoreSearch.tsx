import React from "react";
import { View, StyleSheet } from "react-native";
import SearchInput from "@/components/benefit/TextInputBox";
import BasicImage from "@/components/benefit/BasicImage";

const StoreSearch = () => {
  return (
    <View style={styles.container}>
      <SearchInput />
      <BasicImage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default StoreSearch;
