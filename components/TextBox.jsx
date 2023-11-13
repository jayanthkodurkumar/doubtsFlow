import {
  Pressable,
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome5";
import { db } from "../firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Button } from "react-native-elements";

import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { SafeAreaView } from "react-native-safe-area-context";

const TextBox = ({ post, user }) => {
  const userDetails = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  // console.log(userDetails);

  // get user details from users collection
  // console.log(user);

  // console.log("TEXT BOX:", user);
  const [popup, setPopup] = useState(false);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const textInputRef = useRef();
  const titleInputRef = useRef();

  const onTextChange = (enteredText) => {
    setText(enteredText);
  };
  const onTitleChange = (enteredTitle) => {
    setTitle(enteredTitle);
  };

  // TODO: add a doubt function
  const addDoubt = async () => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];

    try {
      const doubtsRef = await addDoc(collection(db, "doubts"), {
        userId: userDetails.userId,
        title: title,
        datePosted: formattedDate,
        name: userDetails.name,
        doubt: text,
        downvotes: 0,
        upvotes: 0,
        totalComments: 0,
        comments: [],
        role: user.role,
        isSolved: false,
      });
      // console.log("Document added with ID: ", doubtsRef.id);

      const addId = {
        doubtID: doubtsRef.id,
      };

      await updateDoc(doubtsRef, addId, { merge: true });

      const usersRef = collection(db, "users");

      const userRef = doc(usersRef, userDetails.userId);
      await updateDoc(userRef, { doubtsID: arrayUnion(doubtsRef.id) });
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      await updateDoc(userRef, { totalDoubts: userData.doubtsID.length });

      setText("");
      setTitle("");
      textInputRef.current.clear();
      titleInputRef.current.clear();
    } catch (error) {
      console.log(error);
    }
  };

  // picture post

  const PicturePost = () => {
    // camera
    const cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
      useState();
    const [photo, setPhoto] = useState();
    const [imageUrl, setImageUrl] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
      (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryPermission =
          await MediaLibrary.requestPermissionsAsync();

        setHasCameraPermission(cameraPermission.status === "granted");
        setHasMediaLibraryPermission(
          mediaLibraryPermission.status === "granted"
        );
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
      let savePhoto = async () => {
        await MediaLibrary.createAssetAsync(photo.uri, {
          saveCopy: true,
        });

        //   firebase upload
        try {
          const assets = await MediaLibrary.getAssetsAsync({ first: 1 });
          // console.log(assets);
          const savedpicture = assets.assets[0];

          const imageRef = ref(storage, `images/${v4()}.jpeg`);
          const metadata = {
            contentType: "image/jpeg",
          };

          const response = await fetch(photo.uri);
          const blob = await response.blob();

          await uploadBytes(imageRef, blob, metadata);
          // console.log("image uploaded");
          const url = await getDownloadURL(imageRef);
          // console.log("Image URL:", url);
          setImageUrl(url);

          // post the doubt

          const date = new Date();
          const formattedDate = date.toISOString().split("T")[0];

          const doubtsRef = await addDoc(collection(db, "doubts"), {
            userId: userDetails.userId,
            title: title,
            datePosted: formattedDate,
            name: userDetails.name,
            doubt: text,
            downvotes: 0,
            upvotes: 0,
            totalComments: 0,
            comments: [],
            role: user.role,
            isSolved: false,
            photo: url,
          });
          // console.log("Document added with ID: ", doubtsRef.id);

          const addId = {
            doubtID: doubtsRef.id,
          };

          await updateDoc(doubtsRef, addId, { merge: true });

          const usersRef = collection(db, "users");

          const userRef = doc(usersRef, userDetails.userId);
          await updateDoc(userRef, { doubtsID: arrayUnion(doubtsRef.id) });
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data();
          await updateDoc(userRef, { totalDoubts: userData.doubtsID.length });

          setText("");
          setTitle("");

          textInputRef.current.clear();
          titleInputRef.current.clear();
          setPopup(false);
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.preview}
              source={{ uri: "data:image/jpeg;base64," + photo.base64 }}
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

  return (
    <View style={styles.textContainer}>
      {post && (
        <>
          <View style={styles.titleInputContainer}>
            {user && user?.role === "admin" ? (
              <KeyboardAwareScrollView>
                <TextInput
                  style={[styles.titleInput, { color: "red" }]}
                  flex={1}
                  placeholder="ADD ANNOUNCEMENT"
                  multiline={true}
                  onChangeText={onTitleChange}
                  ref={titleInputRef}
                ></TextInput>
              </KeyboardAwareScrollView>
            ) : (
              <KeyboardAwareScrollView>
                <TextInput
                  style={styles.titleInput}
                  flex={1}
                  placeholder="SUGGEST A TITLE"
                  multiline={true}
                  onChangeText={onTitleChange}
                  ref={titleInputRef}
                ></TextInput>
              </KeyboardAwareScrollView>
            )}
          </View>
          <View style={styles.textInputContainer}>
            {user && user?.role === "admin" ? (
              <KeyboardAwareScrollView>
                <TextInput
                  style={styles.textInput}
                  placeholder=""
                  multiline={true}
                  onChangeText={onTextChange}
                  ref={textInputRef}
                ></TextInput>
              </KeyboardAwareScrollView>
            ) : (
              <KeyboardAwareScrollView>
                <TextInput
                  style={styles.textInput}
                  placeholder="HAVE A DOUBT?"
                  multiline={true}
                  onChangeText={onTextChange}
                  ref={textInputRef}
                ></TextInput>
              </KeyboardAwareScrollView>
            )}
          </View>
          <View style={styles.textFunctionContainer}>
            <Pressable
              onPress={() => {
                if ((user && user.isPremium) || user.role === "admin") {
                  setPopup(true);
                } else {
                  Alert.alert(
                    "Your are not a Premium User",
                    "Only premium users can add pictures."
                  );
                }
              }}
            >
              <Icon name="camera" size={22} color={"#808080"} />
            </Pressable>

            <Pressable onPress={addDoubt}>
              <Icon name="plus-circle" size={22} color={"#EA4335"} />
            </Pressable>
            {popup && <PicturePost />}
          </View>
        </>
      )}
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  textContainer: {
    flex: 0.9,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  titleInputContainer: {
    flex: 0.2,
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
  titleInput: {
    flexWrap: "wrap",
    marginTop: 7,
    marginHorizontal: 5,
    textAlign: "justify",
    fontWeight: "bold",
  },

  textInputContainer: {
    flex: 0.6,
    minHeight: 200,
  },
  textInput: {
    flexWrap: "wrap",
    marginTop: 7,
    marginHorizontal: 5,
    textAlign: "justify",
  },
  textFunctionContainer: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingTop: 7,
    marginBottom: 5,
    gap: 20,
    borderTopColor: "black",
    borderTopWidth: 0.5,
  },
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
    height: 500,
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
