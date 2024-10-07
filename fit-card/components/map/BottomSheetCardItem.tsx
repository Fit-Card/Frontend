import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface CardItemProps {
  image: any;
  name: string;
  description: string;
  onPress: () => void; // 클릭 이벤트를 받을 프롭 추가
}

const CardItem = ({ image, name, description, onPress }: CardItemProps) => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false); // State to manage image orientation

  const handleImageLoad = (event: any) => {
    const { width, height } = event.nativeEvent.source;
    setIsPortrait(height > width); // Determine if the image is in portrait mode
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <Image
          source={image}
          style={[styles.cardImage, isPortrait && { transform: [{ rotate: "-90deg" }] }]} // Conditionally apply rotation
          onLoad={handleImageLoad}
          resizeMode="contain"
        />
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{name}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "#ddd",
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 20,
    marginLeft: 5,
  },
  cardInfo: {
    marginLeft: 10,
  },
  cardName: {
    fontSize: 14,
    fontFamily: "SUITE-Bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#5253F0",
    fontFamily: "SUITE-Bold",
  },
});

export default CardItem;
