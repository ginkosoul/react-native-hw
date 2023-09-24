import React from "react";
import { Text, View } from "react-native";
import Map from "../components/Map";
import { useRoute } from "@react-navigation/native";

const MapScreen = () => {
  const route = useRoute();
  const { latitude, longitude } = route.params;
  return <Map coords={{ latitude, longitude }} />;
};

export default MapScreen;
