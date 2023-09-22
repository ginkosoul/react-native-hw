import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";
import PostCard from "../components/PostCard";
import ImageInput from "../components/ImageInput";
import LogoutBtn from "../components/LogoutBtn";
import { getPosts } from "../servises/firestore";
import { updateUserProfile } from "../servises/auth";

const ProfileScreen = () => {
  const { uid: userId, photoURL, displayName } = useSelector(selectUser);
  const [image, setImage] = useState(() => photoURL);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts({ userId })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.log("Can`t get posts", error));
  }, []);

  const updateImage = (photoURL) => {
    updateUserProfile({ photoURL })
      .then(() => setImage(photoURL))
      .catch((error) => console.log("Can`t update user profile", error));
  };

  return (
    <View style={styles.view}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard {...item} style={styles.listItem} />
        )}
        keyExtractor={(item) => item.postId}
        style={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <ImageInput onChange={setImage} src={image} />
            <LogoutBtn style={styles.logout} />
            <Text style={styles.title}>{displayName}</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: "relative",
    width: "100%",
    // backgroundColor: "#FFFFFF",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    alignItems: "center",
    // marginTop: 120,
    // paddingHorizontal: 16,
  },
  header: {
    position: "relative",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    alignItems: "center",
    marginTop: 120,
  },
  list: {
    height: "100%",
    width: "100%",
    // backgroundColor: "#fff",
  },
  listItem: {
    // marginHorizontal: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 0,
    paddingBottom: 32,
  },
  logout: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 0,
    top: 22,
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
});

export default ProfileScreen;
