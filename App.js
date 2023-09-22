import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useSelector } from "react-redux";
import { selectIsAuth } from "./redux/user/selectors";
import { store } from "./redux/store";

import { ROUTES } from "./constants/routes";

import LoginScreen from "./components/LoginScreen";
import RegistrationScreen from "./components/RegistrationScreen";
import CommentsScreen from "./screens/CommentsScreen";
import Home from "./screens/Home";

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
  const isAuth = useSelector(selectIsAuth);
  const initialRoute = isAuth ? routes.home.name : routes.login.name;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        {isAuth ? (
          <>
            <Stack.Screen {...routes.home} />
            <Stack.Screen {...routes.comments} />
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
