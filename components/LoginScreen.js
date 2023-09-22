import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import OrangeBtn from "./OrangeBtn";
import PasswordInput from "./PasswordInput";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { loginThunk } from "../redux/user/operations";
import { loginUser } from "../servises/auth";

const data = {
  title: "Увійти",
  registerBtn: "Увійти",
  inputs: [
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
  subText: { title: "Немає акаунту? ", btn: "Зареєструватися" },
};

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [formData, setFormData] = useState(initialState);
  const onChange = (value, label) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };
  const onSubmit = (data) => {
    setIsLoading(true);
    loginUser(data)
      .then(() => {
        setFormData({ ...initialState });
      })
      .catch(() => {
        Alert.alert("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.view}>
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
            title={isLoading ? "Loading" : data.registerBtn}
            onPress={() => onSubmit(formData)}
            disabled={isLoading}
          />
          <View style={styles.subTextWrapper}>
            <Text style={styles.subText}>{data.subText.title}</Text>
            <Pressable onPress={() => navigation.navigate("Registration")}>
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

export default LoginScreen;
