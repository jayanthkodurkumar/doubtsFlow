import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../components/Navbar";
import Headerbar from "../components/Headerbar";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import TextBox from "../components/TextBox";
import Doubts from "../components/Doubts";

const HomeScreen = ({ promptAsync }) => {
  const navigation = useNavigation();

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    };
  }, []);

  return (
    <SafeAreaView style={styles.homeScreenContainer}>
      <View style={styles.headerContainer}>
        <Headerbar />
      </View>
      <View style={styles.bodyContainer}>
        <TextBox />
        <Doubts home={true} />
        {/* <Pressable
          onPress={() => {
            // Sign out the user from Firebase
            try {
              AsyncStorage.clear();
              signOut(auth);
              console.log("User signed out");
              navigation.replace("Login");
            } catch (error) {
              console.error("Error signing out:", error);
            }
          }}
        >
          <Text>Sign Out</Text>
        </Pressable> */}

        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        />
      </View>
      <View style={styles.navbarContainer}>
        <Navbar homeIcon={true} helpIcon={true} settingsIcon={true} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.1,
    backgroundColor: "#EFEFEF",
  },
  bodyContainer: {
    flex: 0.92,
  },
  navbarContainer: {
    flex: 0.08,
    // borderWidth: 4,
    // borderColor: "black",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
  },
});
