import common from "@/styles/Common";
import KeyColors from "@/styles/KeyColor";
import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

const BasicImage = () => {
  return (
    <View style={styles.basicContainer}>
      <Image
        source={require("@/assets/images/benefit-search-basic-icon.png")}
        style={{ width: 170, height: 170, marginBottom: 20 }}
      />
      <Text style={styles.titleText}>숨은 혜택 찾기</Text>
      <Text style={[styles.contentText, common.textGray]}>
        찾으려는 브랜드, 가맹점의 이름을 검색하고
      </Text>
      <Text style={[styles.contentText, common.textGray]}>받을 수 있는 혜택을 알아보세요!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 55,
  },
  titleText: {
    alignItems: "center",
    fontSize: 18,
    color: KeyColors.black,
    fontFamily: "SUITE-Bold",
    marginBottom: 10,
  },
  contentText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "SUITE-Bold",
    marginHorizontal: 50,
  },
});

export default BasicImage;
