import React, { useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";
import PostCard from "../components/PostCard";
import ImageInput from "../components/ImageInput";
import LogoutBtn from "../components/LogoutBtn";
import { updateUserProfile } from "../servises/auth";
import { selectCurrentUserPosts } from "../redux/posts/selectors";

const ProfileScreen = () => {
  const posts = useSelector(selectCurrentUserPosts);
  const { photoURL, displayName } = useSelector(selectUser);
  const [image, setImage] = useState(() => photoURL);

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
        keyExtractor={(item) => item?.postId}
        style={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <ImageInput onChange={updateImage} src={image} />
            <LogoutBtn style={styles.logout} />
            <Text style={styles.title}>{displayName}</Text>
            {!posts.length && (
              <Text style={styles.empty}>
                You haven't posted anything yet...
              </Text>
            )}
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
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    alignItems: "center",
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
  },
  listItem: {
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
  empty: {
    color: "#BDBDBD",
    fontSize: 16,
  },
});

export default ProfileScreen;
