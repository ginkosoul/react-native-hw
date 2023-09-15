import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const showPassBtn = ["Показати", "Сховати"];

const PasswordInput = (props) => {
  const [showPass, setShowPass] = useState(true);
  return (
    <View style={styles.passwordWrap}>
      <TextInput {...props} secureTextEntry={showPass} />
      <Pressable
        style={styles.hideBtn}
        onPress={() => setShowPass((prev) => !prev)}
      >
        <Text style={styles.hideBtnText}>{showPassBtn[Number(!showPass)]}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordWrap: {
    position: "relative",
    width: "100%",
    marginBottom: 32,
  },
  hideBtn: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  hideBtnText: {
    color: "#1B4371",
    fontFamily: "Roboto",
    fontSize: 16,
  },
});

export default PasswordInput;
