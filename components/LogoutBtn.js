import { Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { logoutUser } from "../servises/auth";

export default function LogoutBtn(props) {
  const { onPress = () => logoutUser(), title = "Logout", style = {} } = props;
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
      accessibilityLabel={title}
    >
      <Feather name={"log-out"} size={24} color={"#BDBDBD"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    marginRight: 16,
  },
});
