import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../config";
import { uploadAvatar } from "./storage";
import { setUser } from "./firestore";

export const registerUser = async ({
  email,
  password,
  displayName,
  imageURI,
}) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const photoURL = await uploadAvatar(imageURI);
    await updateProfile(auth.currentUser, { displayName, photoURL });
    await setUser({
      uid: auth.currentUser.uid,
      displayName,
      photoURL,
      email,
    });
  } catch (error) {
    console.log("regiterUser error: ", error);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("loginUser error: ", error);
  }
};

export const updateUserProfile = async (update) => {
  const user = auth.currentUser;
  const imageURL = update?.photoURL;
  if (user) {
    if (imageURL) {
      const photoURL = await uploadAvatar(imageURL);
      await updateProfile(user, { ...update, photoURL });
    } else {
      await updateProfile(user, update);
    }
    await setUser({
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
      email: auth.currentUser.email,
    });
  }
};

export const logoutUser = async () => {
  signOut(auth);
};
