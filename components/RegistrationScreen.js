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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import OrangeBtn from "./OrangeBtn";
import PasswordInput from "./PasswordInput";
import ImageInput from "./ImageInput";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { registerThunk } from "../redux/user/operations";

const data = {
  title: "Реєстрація",
  registerBtn: "Зареєстуватися",
  inputs: [
    { placeholder: "Логін", inputMode: "text", label: "displayName" },
    {
      placeholder: "Адреса електронної пошти",
      inputMode: "email",
      label: "email",
    },
    {
      placeholder: "Пароль",
      inputMode: "text",
      label: "password",
      secureTextEntry: true,
    },
  ],
  subText: { title: "Вже є акаунт? ", btn: "Увійти" },
};

const RegistrationScreen = () => {
  console.log("rendered");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    imageURI: "",
  });
  const onChange = (value, label) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };
  const onSubmit = (data) => {
    dispatch(registerThunk(data));
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.view}>
          <ImageInput
            onChange={(value) => onChange(value, "imageURI")}
            src={formData.imageURI}
          />
          <Text style={styles.title}>{data.title}</Text>
          {data.inputs.map((e) =>
            e.secureTextEntry ? (
              <PasswordInput
                {...e}
                onChangeText={(value) => onChange(value, e.label)}
                value={formData[e.label]}
                style={styles.input}
                key={e.placeholder}
              />
            ) : (
              <TextInput
                key={e.placeholder}
                onChangeText={(value) => onChange(value, e.label)}
                value={formData[e.label]}
                style={styles.input}
                {...e}
              />
            )
          )}

          <OrangeBtn
            title={data.registerBtn}
            onPress={() => onSubmit(formData)}
          />
          <View style={styles.subTextWrapper}>
            <Text style={styles.subText}>{data.subText.title}</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.subText}>{data.subText.btn}</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    paddingVertical: 32,
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
