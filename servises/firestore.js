import {
  addDoc,
  collection,
  doc,
  FieldPath,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db, auth } from "../config";

const postsRef = collection(db, "posts");
const commentsRef = collection(db, "comments");
const usersRef = collection(db, "users");

export const setUser = async ({ uid, email, displayName, photoURL }) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    email,
    displayName,
    photoURL,
  });
};

export const getUsers = async () => {
  const usersList = {};
  // const q = query(usersRef, where(usersRef.id, "in", users));
  const snapshot = await getDocs(usersRef);
  snapshot.forEach((doc) => {
    usersList[doc.id] = {
      ...doc.data(),
    };
  });
  return usersList;
};

export const createPost = async ({
  userId,
  title,
  imageURL,
  city,
  country,
  latitude,
  longitude,
}) => {
  try {
    const docRef = await addDoc(postsRef, {
      userId,
      title,
      imageURL,
      city,
      country,
      latitude,
      longitude,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    const snapshot = await getDoc(docRef);
    return {
      postId: snapshot.id,
      ...snapshot.data(),
      createdAt: snapshot.data().createdAt.toDate().valueOf(),
      updatedAt: snapshot.data().updatedAt.toDate().valueOf(),
    };
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const createComment = async ({ userId, postId, message }) => {
  try {
    const docRef = await addDoc(commentsRef, {
      userId,
      postId,
      message,
      createdAt: Timestamp.now(),
    });
    const snapshot = await getDoc(docRef);
    const comment = {
      ...snapshot.data(),
      id: snapshot.id,
      createdAt: snapshot.data().createdAt.toDate().valueOf(),
    };
    return comment;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getPosts = async (data) => {
  const userId = data?.userId;
  const posts = [];
  const postsId = [];
  const q = userId ? query(postsRef, where("userId", "==", userId)) : postsRef;
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    postsId.push(doc.id);
    const data = doc.data();
    posts.push({
      postId: doc.id,
      ...data,
      createdAt: data.createdAt.toDate().valueOf(),
      updatedAt: data.updatedAt.toDate().valueOf(),
    });
  });
  posts.sort((a, b) => b.createdAt - a.createdAt);
  if (posts.length === 0) return posts;
  const comments = await getComments({ postsId });
  return posts.map((post) => ({
    ...post,
    comments: comments
      .filter((comment) => comment.postId === post.postId)
      .sort((a, b) => a.createdAt - b.createdAt),
  }));
};

export const getComments = async ({ postsId }) => {
  const comments = [];
  if (!postsId.length) return [];
  const q = query(commentsRef, where("postId", "in", postsId));
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    comments.push({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate().valueOf(),
    });
  });
  return comments;
};
new Date().valueOf();
