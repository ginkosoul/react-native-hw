import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage, auth } from "../config";

export const uploadImage = async (uri, filename) => {
  const response = await fetch(uri);
  const file = await response.blob();
  const avatarRef = ref(storage, `images/${filename}`);
  try {
    await uploadBytes(avatarRef, file);
    return await getDownloadURL(avatarRef);
  } catch (error) {
    console.log(error);
  }
};

export const uploadAvatar = async (uri, name) => {
  try {
    const { uid } = auth.currentUser;
    if (!uid) throw new Error("unauthorized");
    const filename =
      name || [uid, uri.split("/").pop().split(".").pop()].join(".");
    console.log("uploadAvatar filename", filename);
    const response = await fetch(uri);
    const file = await response.blob();
    const avatarRef = ref(storage, `avatars/${filename}`);
    await uploadBytes(avatarRef, file);
    return await getDownloadURL(avatarRef);
  } catch (error) {
    console.log(error);
  }
};
