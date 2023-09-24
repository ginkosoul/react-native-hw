import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Path, Svg } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import Map from "../components/Map";
import OrangeBtn from "../components/OrangeBtn";
import { uploadImage } from "../servises/storage";
import { createPost } from "../servises/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants/routes";
import { addPost } from "../redux/posts/slice";

const data = {
  imagePlaceholder: ["Завантажте фото", "Редагувати фото"],
  btnLabel: ["Опублікувати", "Loading..."],
  titlePlaceholder: "Назва...",
  locationPlaceholder: "Місцевість...",
};

const takePhoto = async (setImage = () => {}) => {
  const cameraResp = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    quality: 1,
  });

  if (!cameraResp.canceled) {
    const { uri } = cameraResp.assets[0];
    setImage(uri);
  }
};

const onPostCreate = async ({
  city,
  country,
  image,
  latitude,
  longitude,
  title,
  userId,
}) => {
  const imageURL = await uploadImage(image);
  await createPost({
    city,
    country,
    imageURL,
    latitude,
    longitude,
    title,
    userId,
  });
};

const CreatePostScreen = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { uid: userId } = useSelector(selectUser);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [coords, setCoords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const onTakePhoto =
    permission?.status === ImagePicker.PermissionStatus.GRANTED
      ? () => takePhoto(setImage)
      : requestPermission;

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const newPost = await onPostCreate({ ...coords, image, userId, title });
      dispatch(addPost(newPost));
      setImage(null);
      setTitle("");
      setCoords(null);
      navigate.navigate(ROUTES.home, { screen: ROUTES.posts });
    } catch (error) {
      Alert.alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Location.requestForegroundPermissionsAsync()
      .then(() => Location.getCurrentPositionAsync({}))
      .then(({ coords: { latitude, longitude } }) =>
        Location.reverseGeocodeAsync({
          latitude,
          longitude,
        }).then(([{ city, country }]) => ({
          city,
          country,
          latitude,
          longitude,
        }))
      )
      .then(setCoords)
      .catch((e) => {
        console.log("something went wrong", e);
      });
    setCoords(coords);
    setIsLoading(false);
  }, []);

  const location = coords ? `${coords?.city || ""}, ${coords?.country}` : "";
  return showMap ? (
    <Map
      onClose={() => setShowMap(false)}
      updateLocation={setCoords}
      coords={{ latitude: coords.latitude, longitude: coords.longitude }}
      editable
    />
  ) : (
    <View style={styles.wrapper}>
      <View style={styles.imagePlaceholder}>
        {image && <Image style={styles.image} source={{ uri: image }} />}
        <Pressable
          style={[
            styles.iconBtn,
            { backgroundColor: image ? "rgba(255,255,255,0.30)" : "#FFFFFF" },
          ]}
          onPress={onTakePhoto}
          disabled={isLoading}
        >
          <SvgPhoto image={image} />
        </Pressable>
      </View>
      <Text style={styles.imageText}>
        {data.imagePlaceholder[Number(Boolean(image))]}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={data.titlePlaceholder}
        value={title}
        onChangeText={setTitle}
      />
      <Pressable
        style={styles.locationWrapper}
        onPress={() => setShowMap(true)}
        disabled={isLoading}
      >
        <TextInput
          style={[styles.input, { paddingLeft: 28 }]}
          placeholder={data.locationPlaceholder}
          editable={false}
          value={location}
        />
        <Feather
          name="map-pin"
          size={24}
          color="#BDBDBD"
          style={styles.iconLocation}
        />
      </Pressable>
      <OrangeBtn
        onPress={onSubmit}
        title={data.btnLabel[Number(isLoading)]}
        disabled={isLoading}
      />
    </View>
  );
};

function SvgPhoto({ image = false }) {
  const stylePath = image ? { fill: "#FFFFFF" } : { fill: "#BDBDBD" };
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
      <Path
        d="M11.9998 15.2C13.7671 15.2 15.1998 13.7673 15.1998 12C15.1998 10.2327 13.7671 8.79999 11.9998 8.79999C10.2325 8.79999 8.7998 10.2327 8.7998 12C8.7998 13.7673 10.2325 15.2 11.9998 15.2Z"
        {...stylePath}
      />
      <Path
        d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z"
        {...stylePath}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  imagePlaceholder: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    position: "relative",
    overflow: "hidden",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    marginBottom: 8,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  iconBtn: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderRadius: 100,
  },
  imageText: {
    color: "#BDBDBD",
    fontSize: 16,
    marginBottom: 32,
    width: "100%",
  },
  input: {
    paddingVertical: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    color: "#212121",
    width: "100%",
  },
  iconLocation: {
    position: "absolute",
    alignSelf: "flex-start",
  },
  locationWrapper: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
});

export default CreatePostScreen;
