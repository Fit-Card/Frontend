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

// import React from "react";
// import { View, Text, Image, StyleSheet, StatusBar } from "react-native";

// type HeaderProps = {
//   title: string;
// };

// function Header({ title }: HeaderProps) {
//   return (
//     <View>
//       <StatusBar
//         translucent
//         backgroundColor="transparent"
//         barStyle="light-content"
//       />
//       <View style={styles.header}>
//         <Image
//           source={require("../assets/images/logo.png")}
//           style={styles.logo}
//         />
//         <Text style={styles.headerTitle}>{title}</Text>
//         <Text>"아이콘 들어갈 자리"</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     height: 70,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   logo: {
//     height: 48,
//     width: 52,
//     marginLeft: 10,
//     marginTop: 10,
//     // marginRight: 20,
//   },
// });

// export default Header;
