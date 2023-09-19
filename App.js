import React from "react";

import LoginScreen from "./components/LoginScreen";
import RegistrationScreen from "./components/RegistrationScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { Provider, useSelector } from "react-redux";
import { selectIsAuth } from "./redux/user/selectors";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
}

function AppNavigation() {
  const isAuth = useSelector(selectIsAuth);
  console.log("state", isAuth);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {isAuth ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
