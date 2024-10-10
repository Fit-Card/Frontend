// styles.ts
import { StyleSheet } from "react-native";

const common = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textBlack: {
    color: "#2E303A",
  },
  textGray: {
    color: "#686E74",
  },
  textBlue: {
    color: "#5250F0",
  },
  textRed: {
    color: "#FF3C3C",
  },
  textLarge: {
    fontSize: 20, // 예시로 폰트 사이즈 설정
  },
  textMedium: {
    fontSize: 16, // 예시로 폰트 사이즈 설정
  },
  textSmall: {
    fontSize: 12, // 예시로 폰트 사이즈 설정
    fontFamily: "SUITE-Bold",
  },
  textBold: {
    // fontWeight: "bold",
    fontFamily: "SUITE-Bold",
  },
});

export default common;
