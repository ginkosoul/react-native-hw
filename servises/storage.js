import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage, auth } from "../config";

export const uploadImage = async (uri, name) => {
  try {
    const { uid } = auth.currentUser;
    const filename = name || [uid, uri.split("/").pop()].join("_");
    const imagRef = ref(storage, `images/${filename}`);

    const response = await fetch(uri);
    const file = await response.blob();

    await uploadBytes(imagRef, file);
    return await getDownloadURL(imagRef);
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
    const avatarRef = ref(storage, `avatars/${filename}`);

    const response = await fetch(uri);
    const file = await response.blob();

    await uploadBytes(avatarRef, file);
    return await getDownloadURL(avatarRef);
  } catch (error) {
    console.log(error);
  }
};
