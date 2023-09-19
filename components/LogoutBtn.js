import { useDispatch } from "react-redux";
import { logoutThunk } from "../redux/user/operations";
import { Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function LogoutBtn(props) {
  const dispatch = useDispatch();
  const { onPress = () => dispatch(logoutThunk()), title = "Logout" } = props;
  return (
    <Pressable
      style={styles.button}
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
  },
});
