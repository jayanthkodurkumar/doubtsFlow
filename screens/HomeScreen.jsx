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
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { currentuser } from "../redux/reducers/userReducer";

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
    fetchUsers();
  }, [user]);

  // TODO: useEffect to fetch data from doubts collection whenever doubtsArray changes
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
  }, [doubtsArray]);
  // console.log(doubtsArray);

  return (
    <SafeAreaView style={styles.homeScreenContainer}>
      <View style={styles.headerContainer}>
        <Headerbar />
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
