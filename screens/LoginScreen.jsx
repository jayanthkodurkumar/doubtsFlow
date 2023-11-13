import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

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
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import SettingsScreen from "./SettingsScreen";

const LoginScreen = () => {
  const [userInfo, setUserInfo] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    //
    GoogleSignin.configure({
      iosClientId:
        "1039216558637-7lclgpiqtdjavcr4qqvunhrfdvcrptqt.apps.googleusercontent.com",
      webClientId:
        "1039216558637-tbnkgfkj14913cvh9gs4ot85c3ap75le.apps.googleusercontent.com",
    });
  }, []);

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

  const googlePrompt = async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const { idToken, user } = await GoogleSignin.signIn();
      // console.log(user);

      const credential = GoogleAuthProvider.credential(idToken);

      signInWithCredential(auth, credential);
      // console.log("auth success");
      //  navigation.navigate("Home");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert("Google Sign-In Failed");
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
        doubtsID: [],
        id: userId,
      });
      // console.log("Account successfully created!!!");
    }
  };

  useEffect(() => {
    checkLocalUser();
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log(user);
        setUserInfo(user);
        await createUser(user.uid, user.email, user.photoURL, user.displayName);
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        // console.log(user);
        // console.log("before dispatch" + JSON.stringify(userData));
        userAccount = {
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
        };
        // this will trigger the login action inside our authReducer with payload userdata as argument

        // console.log("before Dispatch" + JSON.stringify(userAccount));
        dispatch(login(userAccount));

        navigation.navigate("Home");

        // console.log("after Dispatch" + JSON.stringify(userAccount));
      } else {
        console.log("User is not authenticated");
      }
    });

    return () => unSubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.loginScreen}>
      <View style={styles.title}>
        <Text style={styles.titleTextPart1}>DOUBTS</Text>
        <Text style={styles.titleTextPart2}>FLOW</Text>
      </View>

      <SafeAreaView style={styles.loginContainer}>
        <Text style={styles.loginHeader}>Connect using Google Account</Text>

        <Pressable style={styles.googleButtonContainer} onPress={googlePrompt}>
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
