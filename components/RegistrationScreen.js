import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Platform,
  Pressable,
} from "react-native";
import OrangeBtn from "./OrangeBtn";
import PasswordInput from "./PasswordInput";
import ImageInput from "./ImageInput";

const data = {
  title: "Реєстрація",
  registerBtn: "Зареєстуватися",
  inputs: [
    { placeholder: "Логін", inputMode: "text" },
    { placeholder: "Адреса електронної пошти", inputMode: "email" },
    { placeholder: "Пароль", inputMode: "text", secureTextEntry: true },
  ],
  subText: { title: "Вже є акаунт? ", btn: "Увійти" },
};

const RegistrationScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.view}>
        <ImageInput style={styles.image} />
        <Text style={styles.title}>{data.title}</Text>
        {data.inputs.map((e) =>
          e.secureTextEntry ? (
            <PasswordInput {...e} style={styles.input} key={e.placeholder} />
          ) : (
            <TextInput key={e.placeholder} style={styles.input} {...e} />
          )
        )}

        <OrangeBtn
          title={data.registerBtn}
          // onPress={() => Alert.alert("Right button pressed")}
        />
        <View style={styles.subTextWrapper}>
          <Text style={styles.subText}>{data.subText.title}</Text>
          <Pressable>
            <Text style={styles.subText}>{data.subText.btn}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "pink",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: "100%",
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "500",
    letterSpacing: 0.3,
    marginBottom: 32,
  },
  view: {
    position: "relative",
    width: "100%",
    paddingHorizontal: 16,
    gap: 16,
    backgroundColor: "#FFFFFF",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    alignItems: "center",
    paddingBottom: 45,
  },
  image: {
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#F6F6F6",
    height: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    width: "100%",
    borderRadius: 8,
    padding: 16,
  },
  subTextWrapper: {
    flexDirection: "row",
  },
  subText: {
    color: "#1B4371",
    fontSize: 16,
  },
});

export default RegistrationScreen;
