import { StyleSheet } from "react-native";

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 3,
    left: 10,
    right: 10,
    zIndex: 20,
  },
  locationTextContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  locationText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  regionSearchButtonContainer: {
    position: "absolute",
    top: 90,
    alignSelf: "center",
    zIndex: 10,
  },
  regionSearchButton: {
    backgroundColor: "#fff", // 원하는 색상
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 30, // 둥근 모서리
    elevation: 5, // 그림자 (Android)
  },
  regionSearchButtonText: {
    color: "#5253F0",
    fontSize: 13,
    textAlign: "center",
    fontFamily: "SUITE-Bold",
  },
  resultContainer: {
    position: "absolute",
    top: 55,
    left: 10,
    right: 10,
    zIndex: 15,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    maxHeight: 300, // 원하는 최대 높이 설정 (예: 200)
    overflow: "hidden", // 넘치는 부분 숨기기
  },
});

export default mapStyles;
