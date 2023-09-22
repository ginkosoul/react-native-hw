import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../config";
import { uploadAvatar } from "./storage";

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
  } catch (error) {
    console.log("regiterUser error: ", error);
  }

  // const {
  //   displayName: name,
  //   photoURL: url,
  //   email: userEmail,
  //   uid,
  // } = auth.currentUser;
  // return { displayName: name, photoURL: url, email: userEmail, uid };
};

export const loginUser = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("loginUser error: ", error);
  }
  // const { user } = await signInWithEmailAndPassword(auth, email, password);
  // const { displayName, photoURL, email: userEmail, uid } = user;
  // return { displayName, photoURL, email: userEmail, uid };
};

export const updateUserProfile = async (update) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};

export const logoutUser = async () => {
  signOut(auth);
};
