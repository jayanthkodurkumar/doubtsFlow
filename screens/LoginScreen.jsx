import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth, db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./HomeScreen";
import { SocialIcon } from "react-native-elements";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/reducers/authReducer";

WebBrowser.maybeCompleteAuthSession();
const LoginScreen = () => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "839036897753-os8gnu9uia7fsope321lqrpsf38gcup3.apps.googleusercontent.com",
    androidClientId:
      "839036897753-55mb3m4126npsohqp5b76t8je59ktbcj.apps.googleusercontent.com",
    expoClientId:
      "839036897753-qgmbig12f5aekoehuel2m7ic049fhrgc.apps.googleusercontent.com",
  });

  // TODO : check if user is already logged in to the device and persist.
  const checkLocalUser = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      // console.log("local storage: ", userData);
      setUserInfo(userData);
    } catch (error) {
      alert(error.message);
    }
  };

  //  TODO : Create an user inside users colelction on google login if not exists
  const createUser = async (userId, userEmail, userPic, userName) => {
    const docRef = doc(db, "users", `${userId}`);
    const userExists = await getDoc(docRef);
    if (!userExists.exists()) {
      setDoc(doc(db, "users", `${userId}`), {
        role: "user",
        profilePic: userPic,
        email: userEmail,
        name: userName,
        luddies: 0,
        totalDoubts: 0,
        totalComments: 0,
        isPremium: false,
      });
      console.log("Account successfully created!!!");
    }
  };
  useEffect(() => {
    // console.log(response.type);
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    checkLocalUser();
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log(user);
        setUserInfo(user);
        await createUser(user.uid, user.email, user.photoURL, user.displayName);
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        // console.log(user);
        let userData = {};
        // console.log("before dispatch" + JSON.stringify(userData));
        userAccount = {
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
        };
        // this will trigger the login action inside our authReducer with payload userdata as argument
        dispatch(login(userAccount));
        // console.log("after Dispatch" + JSON.stringify(userAccount));
      } else {
        console.log("User is not authenticated");
      }
    });

    return () => unSubscribe();
  }, []);

  return userInfo ? (
    <HomeScreen promptAsync={promptAsync} />
  ) : (
    <SafeAreaView style={styles.loginScreen}>
      <View style={styles.title}>
        <Text style={styles.titleTextPart1}>DOUBTS</Text>
        <Text style={styles.titleTextPart2}>FLOW</Text>
      </View>

      <SafeAreaView style={styles.loginContainer}>
        <Text style={styles.loginHeader}>Connect using Google Account</Text>

        <Pressable
          style={styles.googleButtonContainer}
          onPress={() => {
            promptAsync({ useProxy: true });
          }}
        >
          <SocialIcon type="google" />
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginScreen: {
    backgroundColor: "#EFEFEF",
    flex: 1,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    marginTop: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  titleTextPart1: {
    fontSize: 50,
    fontWeight: "600",
    color: "#000000",
  },
  titleTextPart2: {
    fontSize: 50,
    fontWeight: "500",
    color: "#EA4335",
  },
  loginContainer: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },

  loginHeader: {
    fontSize: 20,
    fontWeight: "400",
    color: "#808080",
    marginVertical: 20,
  },
  googleButtonContainer: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  registerText: {
    color: "gray",
    fontSize: 16,
  },
});
