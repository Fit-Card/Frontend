import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";

type GpsButtonProps = {
  onPress: () => void;
};

const GpsButton = ({ onPress }: GpsButtonProps) => {
  return (
    <TouchableOpacity style={styles.gpsButton} onPress={onPress}>
      <Image
        source={require("../../assets/images/gps-icon.png")}
        style={{ width: 16, height: 16 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gpsButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    zIndex: 10,
  },
  gpsButtonText: {
    fontSize: 16,
    color: "#000",
  },
});

export default GpsButton;
