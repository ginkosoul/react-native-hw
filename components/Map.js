import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import OrangeBtn from "./OrangeBtn";
import { GOOGLE_PLACES_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";

const Map = ({
  onClose = () => {},
  updateLocation = () => {},
  editable = false,
  coords,
}) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(coords);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = editable
    ? async () => {
        setIsLoading(true);
        const [{ city, country }] = await Location.reverseGeocodeAsync(
          location
        );
        updateLocation({ ...location, city, country });
        onClose();
        setIsLoading(false);
      }
    : () => navigation.goBack();

  const onPress = (data) => {
    if (data.nativeEvent.coordinate.latitude) {
      setLocation({
        latitude: data.nativeEvent.coordinate.latitude,
        longitude: data.nativeEvent.coordinate.longitude,
      });
    }
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en", // language of the results
        }}
        {...(editable ? { onPress } : {})}
        showsUserLocation={true}
      >
        {location && (
          <Marker title="I am here" coordinate={location} description="Hello" />
        )}
      </MapView>
      <OrangeBtn
        style={styles.button}
        onPress={onSubmit}
        disabled={isLoading}
        title={editable ? (isLoading ? "Loading..." : "Обрати") : "Back"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  button: {
    position: "absolute",
    bottom: 16,
    marginHorizontal: 16,
    minWidth: 200,
    width: "auto",
  },
});

export default Map;
