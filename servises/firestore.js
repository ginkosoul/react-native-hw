import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db, auth } from "../config";

const postsRef = collection(db, "posts");

export const writeDataToFirestore = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
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
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getPosts = async (body) => {
  const userId = body?.userId;
  const posts = [];
  const q = userId ? query(postsRef, where("userId", "==", userId)) : postsRef;
  const snapshot = await getDocs(q);
  snapshot.forEach((doc) => {
    posts.push({ postId: doc.id, ...doc.data() });
  });
  return posts;
};
