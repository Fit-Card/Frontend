import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

const StoreActions = () => {
  return (
    <View style={styles.container}>
      {/* Calculator Button */}
      <TouchableOpacity style={styles.iconButton}>
        <Image source={require("../../assets/images/calculator.png")} style={styles.icon} />
      </TouchableOpacity>

      {/* Map Button */}
      <TouchableOpacity style={styles.iconButton}>
        <Image source={require("../../assets/images/kakaomap-icon.png")} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default StoreActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
});
