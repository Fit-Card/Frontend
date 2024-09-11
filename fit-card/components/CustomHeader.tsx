import React from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import { Icon } from "react-native-elements";

type HeaderProps = {
  title: string;
};

function HeaderComponent({ title }: HeaderProps) {
  return (
    <View>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content" // iOS 및 Android의 StatusBar 스타일을 설정
      />
      <View style={styles.header}>
        {/* Left Container */}
        <View style={styles.leftContainer}>
          <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
        </View>

        {/* Center Container */}
        <View style={styles.centerContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        {/* Right Container */}
        <View style={styles.rightContainer}>
          <Icon
            name="notifications-none"
            type="material" // Material Icons 라이브러리 사용
            size={30}
            color="#000"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    flexDirection: "row", // Row direction to align containers horizontally
    // alignItems: "center", // Vertically align items in the middle
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 0,
  },
  leftContainer: {
    flex: 1, // Take 1 part of the available space
    justifyContent: "center", // Center vertically
  },
  centerContainer: {
    flex: 8, // Take 2 parts of the available space (wider than left and right)
    justifyContent: "center", // Center vertically
    alignItems: "center",
  },
  rightContainer: {
    flex: 1, // Take 1 part of the available space
    justifyContent: "center", // Center vertically
    alignItems: "flex-end",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "SUITE-Bold",
  },
  logo: {
    height: 35,
    width: 40,
  },
  iconPlaceholder: {
    fontSize: 18,
  },
});

export default HeaderComponent;
