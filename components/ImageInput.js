import React from "react";
import { Alert, Image, Pressable, StyleSheet, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import avatar from "../assets/avatar.png";

const ImageInput = ({ src, style }) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Image source={src || avatar} style={styles.image} />
      <Pressable
        style={styles.imgBtn}
        onPress={() => Alert.alert("Image button pressed")}
      >
        <SvgComponent isClose={Boolean(src)} />
      </Pressable>
    </View>
  );
};

function SvgComponent({ isClose = false }) {
  const styleCircle = {
    fill: "#ffffff",
    stroke: isClose ? "#E8E8E8" : "#FF6C00",
  };
  const stylePath = isClose
    ? { fill: "#BDBDBD" }
    : { fill: "#FF6C00", transform: "rotate(-45 18.5 18.5)" };

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={37} height={37} fill="none">
      <Circle cx={18.5} cy={18.5} r={12} {...styleCircle} />
      <Path
        fillRule="evenodd"
        d="m14.257 13.55-.707.707 4.243 4.243-4.243 4.243.707.707 4.243-4.243 4.243 4.243.707-.707-4.243-4.243 4.243-4.243-.707-.707-4.243 4.243-4.243-4.243Z"
        clipRule="evenodd"
        {...stylePath}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    width: 120,
    height: 120,
    marginTop: -60,
  },
  image: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 16,
  },
  imgBtn: {
    position: "absolute",
    bottom: 8,
    right: -18.5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ImageInput;
