import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { FirebaseStorage } from "@react-native-firebase/storage";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const PicturePost = () => {
  // camera
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  const navigation = useNavigation();
  const storage = getStorage();
  const storageRef = ref(storage, "some-child");

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Waiting for a permission to be granted...</Text>;
  } else if (!hasCameraPermission) {
    return <Text> Permission not granted...</Text>;
  }

  const takephoto = async () => {
    if (!hasCameraPermission) {
      await Camera.requestCameraPermissionsAsync();
    }
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newphoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newphoto);
  };

  if (photo) {
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
      // navigation.goBack();

      console.log(photo.uri);
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Image
            style={styles.preview}
            source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          />
        </View>

        <View style={styles.previewButtonsContainer}>
          {hasMediaLibraryPermission ? (
            <Button
              title="Save"
              buttonStyle={styles.previewButtons}
              onPress={savePhoto}
            />
          ) : undefined}
          <Button
            title="Discard"
            buttonStyle={styles.previewButtons}
            onPress={() => setPhoto(undefined)}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera ref={cameraRef} style={styles.cameracontainer}>
        <View style={styles.camerabutton}>
          <Pressable style={{ flex: 1 }} onPress={takephoto}>
            <Icon name="plus-circle" size={42} color={"#EA4335"} />
          </Pressable>
        </View>
      </Camera>
    </SafeAreaView>
  );
};

export default PicturePost;

const styles = StyleSheet.create({
  cameracontainer: {
    flex: 1,
  },
  camerabutton: {
    flex: 1,
    marginTop: "180%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  preview: {
    flex: 1,
  },
  previewButtonsContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: 60,
  },
  previewButtons: {
    backgroundColor: "#EA4335",
  },
});
