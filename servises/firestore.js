import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, auth } from "../config";

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
    const docRef = await addDoc(collection(db, "posts"), {
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
