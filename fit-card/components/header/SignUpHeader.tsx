import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "@/navigationTypes";
import AntDesign from "react-native-vector-icons/AntDesign";

type HeaderProps = {
  title: string;
};

function HeaderComponent({ title }: HeaderProps) {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Center Container */}
        <View style={styles.centerContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        {/* Right Container */}
        <View style={styles.rightContainer}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: "row", // Row direction to align containers horizontally
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    paddingTop: 15,
    paddingBottom: 0,
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
