import { createContext, useState } from "react";

export const screens = {
  register: "SIGNUP",
  login: "SIGNIN",
  posts: "POSTS",
  profile: "PROFILE",
};

export const useScreen = () => {
  const [screen, setScreen] = useState(screens.login);
  return [screen, setScreen];
};

export const UserContext = createContext(null);
