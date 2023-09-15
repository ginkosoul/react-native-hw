import React from "react";
import { Text, StyleSheet, Pressable, Alert } from "react-native";

export default function OrangeBtn(props) {
  const {
    onPress = () => Alert.alert("Submit button pressed"),
    title = "Submit",
  } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    paddingHorizontal: 32,
    paddingVertical: 16,
    elevation: 3,
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
