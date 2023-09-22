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
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";
import { createComment, getComments } from "../servises/firestore";

// const comments = [
//   {
//     photoURL:
//       "https://firebasestorage.googleapis.com/v0/b/goit-mobile-app.appspot.com/o/images%2FRyLETnY6atMqHd5I6sZ7b8NVcBD2_c2b90609-a3ef-48d7-9553-d1dbfa79da96.jpeg?alt=media&token=9f27f557-9cde-4789-977b-f011935faaff",
//     message:
//       "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
//     createdAt: "09 червня, 2020 | 08:40",
//     userId: "RyLETnY6atMqHd5I6sZ7b8NVcBD2",
//   },
//   {
//     photoURL:
//       "https://firebasestorage.googleapis.com/v0/b/goit-mobile-app.appspot.com/o/images%2FRyLETnY6atMqHd5I6sZ7b8NVcBD2_c2b90609-a3ef-48d7-9553-d1dbfa79da96.jpeg?alt=media&token=9f27f557-9cde-4789-977b-f011935faaff",
//     message:
//       "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
//     createdAt: "09 червня, 2020 | 09:14",
//     userId: "HRvTm9NOFGPN0svv6U7RpkRt9vv2",
//   },
//   {
//     photoURL:
//       "https://firebasestorage.googleapis.com/v0/b/goit-mobile-app.appspot.com/o/images%2FRyLETnY6atMqHd5I6sZ7b8NVcBD2_c2b90609-a3ef-48d7-9553-d1dbfa79da96.jpeg?alt=media&token=9f27f557-9cde-4789-977b-f011935faaff",
//     message: "Thank you! That was very helpful!",
//     createdAt: "09 червня, 2020 | 09:20",
//     userId: "RyLETnY6atMqHd5I6sZ7b8NVcBD2",
//   },
// ];

const textData = {
  input: { placeholder: "Коментувати...", inputMode: "text" },
};

const CommentsScreen = ({ route, navigation }) => {
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);

  const { uid: currentUserId } = useSelector(selectUser);
  const { title, postId, imageURL } = route.params;
  console.log(route);
  console.log("comments", comments);

  useEffect(() => {
    getComments({ postId })
      .then((r) => {
        console.log(r);
        setComments(r);
      })
      .catch((error) => {
        console.log("Something went wrong getting comments");
      });
  }, []);

  const data = comments.map((comment) => ({ ...comment, currentUserId }));

  const onSubmit = () => {
    createComment({ message, postId, userId: currentUserId })
      .then((id) =>
        setComments((prev) => [
          ...prev,
          { message, postId, userId: currentUserId, id, createdAt: new Date() },
        ])
      )
      .catch((error) => {
        console.log("Something went wrong");
      });
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
            disabled={!message}
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
    fontSize: 13,
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
        source={{ uri: photoURL }}
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
          {createdAt.toISOString()}
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
