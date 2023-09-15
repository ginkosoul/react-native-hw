import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Image,
} from "react-native";
import OrangeBtn from "./OrangeBtn";
import PasswordInput from "./PasswordInput";
import avatar from "../assets/defaultAvatar.svg";

const data = {
  title: "Реєстрація",
  registerBtn: "Зареєстуватися",
  inputs: [
    { placeholder: "Логін", inputMode: "text" },
    { placeholder: "Адреса електронної пошти", inputMode: "email" },
    { placeholder: "Пароль", inputMode: "text", secureTextEntry: true },
  ],
};

const LoginScreen = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.view}>
        <Image defaultSource={avatar} style={styles.image} />
        <Text style={styles.title}>{data.title}</Text>
        {data.inputs.map((e) =>
          e.secureTextEntry ? (
            <PasswordInput style={styles.input} key={e.placeholder} />
          ) : (
            <TextInput key={e.placeholder} style={styles.input} {...e} />
          )
        )}

        <OrangeBtn
          title={data.registerBtn}
          // onPress={() => Alert.alert("Right button pressed")}
        />
        <View>
          <Text>Вже є акаунт?</Text>
          <Text>Увійти</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
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
  },
  view: {
    position: "relative",
    width: "100%",
    paddingHorizontal: 16,
    gap: 16,
    backgroundColor: "#FFFFFF",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
  image: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
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
});

export default LoginScreen;
