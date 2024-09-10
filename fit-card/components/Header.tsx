import common from "@/styles/Common";
import React from "react";
import { Image } from "react-native";
import { Header as RNEHeader } from "react-native-elements";

const Header = ({ title }: { title: string }) => {
  return (
    <RNEHeader
      backgroundColor="#fff"
      leftComponent={
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 40, height: 35 }}
          resizeMode="contain"
        />
      }
      centerComponent={{
        text: title,
        style: { fontFamily: "SUITE-Bold", fontSize: 15 }, // 스타일 적용
      }}
      rightComponent={{ icon: "notifications-none" }}
      containerStyle={{
        height: 65,
        borderBottomWidth: 0,
      }}
      leftContainerStyle={{
        justifyContent: "center", // 수직 중앙 정렬
      }}
      centerContainerStyle={{
        justifyContent: "center", // 수직 중앙 정렬
      }}
      rightContainerStyle={{
        justifyContent: "center", // 수직 중앙 정렬
      }}
    />
  );
};

export default Header;
