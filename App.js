import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectUser } from "./redux/user/selectors";
import { store } from "./redux/store";

import { ROUTES } from "./constants/routes";

import LoginScreen from "./components/LoginScreen";
import RegistrationScreen from "./components/RegistrationScreen";
import CommentsScreen from "./screens/CommentsScreen";
import Home from "./screens/Home";
import { getPosts, getUsers } from "./servises/firestore";
import { setCurrentUserPosts, setPosts, setUsers } from "./redux/posts/slice";
import MapScreen from "./screens/MapScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

const routes = {
  home: {
    name: ROUTES.home,
    component: Home,
    options: { title: "Home", headerShown: false },
  },
  comments: {
    name: ROUTES.comments,
    component: CommentsScreen,
    options: {
      headerShown: true,
      title: "Коментарі",
      headerTitleAlign: "center",
    },
  },
  map: {
    name: ROUTES.map,
    component: MapScreen,
    options: {
      headerShown: true,
      title: "Карта",
      headerTitleAlign: "center",
    },
  },
  login: {
    name: ROUTES.login,
    component: LoginScreen,
    options: { headerShown: false, title: "Login" },
  },
  regiter: {
    name: ROUTES.regiter,
    component: RegistrationScreen,
    options: {
      headerShown: false,
      title: "Registration",
    },
  },
};

function AppNavigation() {
  const { uid } = useSelector(selectUser) || {};

  const initialRoute = uid ? routes.home.name : routes.login.name;
  const dispatch = useDispatch();
  useEffect(() => {
    if (uid) {
      getPosts()
        .then((data) => {
          dispatch(setPosts(data));
        })
        .catch((error) => console.log("Can`t get posts", error));
      getPosts({ userId: uid })
        .then((data) => {
          dispatch(setCurrentUserPosts(data));
        })
        .catch((error) => console.log("Can`t get posts", error));
      getUsers()
        .then((users) => {
          dispatch(setUsers(users));
        })
        .catch((error) => {
          console.log("Something went wrong getting users", error);
        });
    }
  }, [uid]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        {uid ? (
          <>
            <Stack.Screen {...routes.home} />
            <Stack.Screen {...routes.comments} />
            <Stack.Screen {...routes.map} />
          </>
        ) : (
          <>
            <Stack.Screen {...routes.login} />
            <Stack.Screen {...routes.regiter} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
