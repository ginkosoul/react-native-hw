import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Circle, Path, Svg } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";
import { createComment, getComments, getUsers } from "../servises/firestore";
import avatar from "../assets/avatar.png";
import { selectUsers, selectedPost } from "../redux/posts/selectors";
import { addComment } from "../redux/posts/slice";
import { formatDate } from "../utils/formatDate";

const textData = {
  input: { placeholder: "Коментувати...", inputMode: "text" },
};

const CommentsScreen = () => {
  const dispatch = useDispatch();
  const selectedPostData = useSelector(selectedPost);
  const { uid: currentUserId } = useSelector(selectUser);
  const users = useSelector(selectUsers);
  const { title, postId, imageURL, comments } = selectedPostData;
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = comments.map((comment) => ({
    ...comment,
    photoURL: users[comment.userId]?.photoURL || "",
    displayName: users[comment.userId]?.displayName || "",
    currentUserId,
  }));

  const onSubmit = () => {
    setIsLoading(true);
    createComment({ message, postId, userId: currentUserId })
      .then((comment) => {
        dispatch(addComment(comment));
        Keyboard.dismiss();
        setMessage("");
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: imageURL }} alt={title} />
        <FlatList
          data={data}
          renderItem={({ item }) => <CommentCard {...item} />}
          keyExtractor={(item) => item.createdAt}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            {...textData.input}
            onChangeText={setMessage}
            value={message}
          />
          <Pressable
            style={styles.sendBtn}
            onPress={onSubmit}
            disabled={!message || isLoading}
          >
            <SvgSend />
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: "center",
    height: "100%",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    height: 240,
    borderRadius: 8,
    marginVertical: 32,
    marginHorizontal: 16,
  },
  commentCard: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentWrapper: {
    backgroundColor: "rgba(0,0,0,0.03)",
    padding: 16,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    width: Dimensions.get("window").width - 76,
  },
  message: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 18,
    maxWidth: "100%",
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 8,
  },
  date: {
    color: "#BDBDBD",
    fontSize: 10,
  },
  input: {
    fontSize: 16,
    color: "#212121",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontWeight: "500",
    borderRadius: 50,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    width: "100%",
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: "auto",
    marginHorizontal: 16,
  },
  sendBtn: {
    position: "absolute",
    right: 8,
  },
});

function CommentCard({
  photoURL,
  message,
  createdAt,
  userId,
  currentUserId,
  displayName = "User",
}) {
  const isOwn = currentUserId === userId;
  return (
    <View
      style={[
        styles.commentCard,
        isOwn
          ? { flexDirection: "row-reverse", alignSelf: "flex-end" }
          : { flexDirection: "row", alignSelf: "flex-start" },
      ]}
    >
      <Image
        style={styles.commentAvatar}
        source={photoURL ? { uri: photoURL } : null}
        defaultSource={avatar}
        alt={displayName}
      />
      <View
        style={[
          styles.commentWrapper,
          isOwn ? { borderTopLeftRadius: 6 } : { borderTopRightRadius: 6 },
        ]}
      >
        <Text style={styles.message}>{message}</Text>
        <Text
          style={[
            styles.date,
            isOwn ? { textAlign: "left" } : { textAlign: "right" },
          ]}
        >
          {formatDate(createdAt)}
        </Text>
      </View>
    </View>
  );
}

function SvgSend({ count = 0, commentedByMe = false }) {
  const stylePath = Boolean(count)
    ? commentedByMe
      ? { fill: "#FF6C00" }
      : {
          stroke: "#FF6C00",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        }
    : {
        stroke: "#BDBDBD",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      };

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} fill="none">
      <Circle cx="17" cy="17" r="17" fill="#FF6C00" />
      <Path
        d="M17 10L17.3536 9.64645C17.1583 9.45118 16.8417 9.45118 16.6464 9.64645L17 10ZM21.6464 15.3536C21.8417 15.5488 22.1583 15.5488 22.3536 15.3536C22.5488 15.1583 22.5488 14.8417 22.3536 14.6464L21.6464 15.3536ZM11.6464 14.6464C11.4512 14.8417 11.4512 15.1583 11.6464 15.3536C11.8417 15.5488 12.1583 15.5488 12.3536 15.3536L11.6464 14.6464ZM16.5 24C16.5 24.2761 16.7239 24.5 17 24.5C17.2761 24.5 17.5 24.2761 17.5 24H16.5ZM16.6464 10.3536L21.6464 15.3536L22.3536 14.6464L17.3536 9.64645L16.6464 10.3536ZM16.6464 9.64645L11.6464 14.6464L12.3536 15.3536L17.3536 10.3536L16.6464 9.64645ZM16.5 10V17H17.5V10H16.5ZM16.5 17V24H17.5V17H16.5Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

export default CommentsScreen;
