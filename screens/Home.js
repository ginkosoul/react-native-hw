import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostScreen";
import LogoutBtn from "../components/LogoutBtn";
import { ROUTES } from "../constants/routes";
import { getPosts } from "../servises/firestore";
import { setCurrentUserPosts, setPosts } from "../redux/posts/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";
import { useRoute } from "@react-navigation/native";

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        // const onLongPress = () => {
        //   navigation.emit({
        //     type: "tabLongPress",
        //     target: route.key,
        //   });
        // };

        return <MyButton {...{ isFocused, onPress, label }} key={label} />;
      })}
    </View>
  );
}
// function MyButton({ isFocused, onPress, label }) {
//   return (
//     <TouchableOpacity
//       accessibilityRole="button"
//       accessibilityState={isFocused ? { selected: true } : {}}
//       // accessibilityLabel={options.tabBarAccessibilityLabel}
//       // testID={options.tabBarTestID}
//       onPress={onPress}
//       // onLongPress={onLongPress}
//       style={{ flex: 1 }}
//     >
//       <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>{label}</Text>
//     </TouchableOpacity>
//   );
// }

const TabBarIcon = ({ focused, color, size }) => {
  const route = useRoute();
  if (route.name === ROUTES.profile) {
    return <Feather name="user" size={size} color={color} />;
  } else if (route.name === ROUTES.createPost) {
    return <Ionicons name="add" size={size} color={color} />;
  } else if (route.name === ROUTES.posts) {
    return <Feather name="grid" size={size} color={color} />;
  }
};

const screenOptions = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "#212121",
  tabBarActiveBackgroundColor: "#FF6C00",
  tabBarStyle: [
    {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  ],
  tabBarItemStyle: {
    borderRadius: 40,
    alignItems: "center",
    marginHorizontal: 16,
    justifyContent: "center",
  },
  tabBarIcon: TabBarIcon,
};

const tabs = {
  posts: {
    name: ROUTES.posts,
    options: {
      title: "Публікації",
      headerTitleAlign: "center",
      headerRight: LogoutBtn,
    },
    component: PostsScreen,
  },
  createPost: {
    name: ROUTES.createPost,
    component: CreatePostScreen,
    options: {
      title: "Створити публікацію",
      headerTitleAlign: "center",
      headerRight: LogoutBtn,
    },
  },
  profile: {
    name: ROUTES.profile,
    component: ProfileScreen,
    options: {
      title: "Профіль",
      headerTitleAlign: "center",
      headerShown: false,
    },
  },
};

const Tabs = createBottomTabNavigator();

const Home = () => {
  console.log("Home rendered");
  return (
    <Tabs.Navigator
      // tabBar={MyTabBar}
      screenOptions={screenOptions}
      initialRouteName={ROUTES.posts}
    >
      <Tabs.Screen {...tabs.posts} />
      <Tabs.Screen {...tabs.createPost} />
      <Tabs.Screen {...tabs.profile} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    flex: 2,
  },
});

export default Home;
