import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../components/Navbar";
import Headerbar from "../components/Headerbar";

import TextBox from "../components/TextBox";
import Doubts from "../components/Doubts";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { currentuser } from "../redux/reducers/userReducer";
import { logout } from "../redux/reducers/authReducer";

const HomeScreen = ({ promptAsync }) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // TODO: useEffect to fetch user data from users collection
  const [loggedUser, setLoggedUser] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      // console.log("user from store" + JSON.stringify(user));
      const uid = user.userId;
      const usersRef = doc(db, "users", uid);

      const userDoc = await getDoc(usersRef);

      const userData = [];

      if (userDoc.exists()) {
        const dataToPush = userDoc.data();
        userData.push(dataToPush);
      }
      setLoggedUser(userData);
      dispatch(currentuser(userData));
      return userData;
    };
    const fetchData = async () => {
      const userData = await fetchUsers();
    };
    fetchData();
    return () => {
      // clean up to prevent infinite fetchof user
    };
  }, []);
  console.log("home user", user);
  // console.log("render");

  // TODO: useEffect to fetch doubts and update state
  const [doubtsArray, setDoubtsArray] = useState([]);
  useEffect(() => {
    const fetchDoubts = async () => {
      const doubtsRef = collection(db, "doubts");

      const snapshot = await getDocs(doubtsRef);
      const data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setDoubtsArray(data);
      return data;
    };
    fetchDoubts();
  }, []);

  // TODO: get the new doubts collection
  useEffect(() => {
    const doubtsRef = collection(db, "doubts");

    const unsubscribe = onSnapshot(doubtsRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setDoubtsArray(data);
    });

    // clean up to stop getting data from firestore after homescreen component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  // console.log("db changed:", doubtsArray);
  return (
    <SafeAreaView style={styles.homeScreenContainer}>
      <View style={styles.headerContainer}>
        <Headerbar user={loggedUser} />
      </View>
      <ScrollView style={styles.bodyContainer}>
        <TextBox post={true} />
        <View style={styles.doubtsContainer}>
          {doubtsArray.map((value, index) => (
            <Doubts key={index} home={true} doubt={value} />
          ))}
        </View>

        <Pressable
          onPress={() => {
            // Sign out the user from Firebase
            try {
              AsyncStorage.clear();
              signOut(auth);
              dispatch(logout());
              dispatch(currentuser({}));
              console.log("User signed out");

              navigation.replace("Login");
            } catch (error) {
              console.error("Error signing out:", error);
            }
          }}
        >
          <Text>Sign Out</Text>
        </Pressable>
      </ScrollView>
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

  doubtsContainer: {
    flex: 0.83,
  },
  navbarContainer: {
    flex: 0.08,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
  },
});
