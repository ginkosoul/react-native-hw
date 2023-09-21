import React from "react";
import { Text, StyleSheet, Pressable, Alert } from "react-native";

export default function OrangeBtn({
  onPress = () => Alert.alert("Submit button pressed"),
  title = "Submit",
  style,
  disabled = false,
}) {
  return (
    <Pressable
      style={[
        styles.button,
        style,
        { backgroundColor: disabled ? "#F6F6F6" : "#FF6C00" },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: disabled ? "#BDBDBD" : "#FFFFFF" }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 16,
    elevation: 3,
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
