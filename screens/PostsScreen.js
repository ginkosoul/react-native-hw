import React from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";
import avatar from "../assets/avatar.png";
import PostCard from "../components/PostCard";

const posts = [
  {
    imageURL: avatar,
    title: "avatar",
    likes: 2,
    comments: 0,
    likedByMe: true,
    description: "",
    author: "",
    location: "Ukraine",
    postId: "1",
  },
  {
    imageURL: avatar,
    title: "avatar",
    likes: 0,
    comments: 4,
    commentedByMe: true,
    description: "",
    author: "",
    location: "Ukraine",
    postId: "2",
  },
  {
    imageURL: avatar,
    title: "avatar",
    likes: 3,
    comments: 1,
    description: "",
    author: "",
    location: "Ukraine",
    postId: "3",
  },
];

const PostsScreen = () => {
  const { displayName, photoURL, email, uid } = useSelector(selectUser);
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostCard {...item} />}
      keyExtractor={(item) => item.postId}
      style={styles.list}
      ListHeaderComponent={
        <View style={styles.userWrapper}>
          <Image
            source={{ uri: photoURL }}
            width={60}
            height={60}
            style={styles.userImage}
          />
          <View style={styles.userInfoWrapper}>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 16,
  },
  list: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  userWrapper: {
    flexDirection: "row",
    paddingVertical: 32,
    gap: 8,
  },
  userInfoWrapper: {
    justifyContent: "center",
    flexDirection: "column",
  },
  userName: {
    color: "#212121",
    fontSize: 13,
    fontWeight: "700",
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.80)",
    fontSize: 11,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
});

export default PostsScreen;
