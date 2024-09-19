import React from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import { Icon } from "react-native-elements";

type HeaderProps = {
  title: string;
  backgroundColor?: string; // 배경색을 선택적으로 받을 수 있도록 설정
};

function HeaderComponent({ title, backgroundColor = "#fff" }: HeaderProps) {
  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={[styles.header, { backgroundColor }]}>
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
          <Icon name="notifications-none" type="material" size={30} color="#4D4D4D" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    paddingTop: 15,
    paddingBottom: 0,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  centerContainer: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
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
