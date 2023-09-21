import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import OrangeBtn from "./OrangeBtn";
import { GOOGLE_PLACES_API_KEY } from "@env";

const Map = ({ onClose = () => {}, updateLocation = () => {} }) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      setIsLoading(false);
    })();
  }, []);

  const onSubmit = async () => {
    setIsLoading(true);
    const [{ city, country }] = await Location.reverseGeocodeAsync(location);
    updateLocation({ ...location, city, country });
    onClose();
    setIsLoading(false);
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
        onPress={(data) => {
          if (data.nativeEvent.coordinate.latitude) {
            setLocation({
              latitude: data.nativeEvent.coordinate.latitude,
              longitude: data.nativeEvent.coordinate.longitude,
            });
          }
        }}
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
        title={isLoading ? "Loading..." : "Обрати"}
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
