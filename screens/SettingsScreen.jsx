import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { doc, deleteDoc, collection, getDoc } from "firebase/firestore";
import { currentuser } from "../redux/reducers/userReducer";
import { logout } from "../redux/reducers/authReducer";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const userDetails = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.currentuser.currentuser);
  const dispatch = useDispatch();
  // console.log(userDetails);

  // TODO: useEffect to fetch user data from users collection
  const [loggedUser, setLoggedUser] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      // console.log("user from store" + JSON.stringify(user));

      const uid = userDetails.userId;
      const usersRef = doc(db, "users", uid);

      const userDoc = await getDoc(usersRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setLoggedUser(userData);
        dispatch(currentuser(userData));
      }

      // return userData;
    };

    fetchUsers();

    return () => {
      // clean up to prevent infinite fetch of user
    };
  }, []);
  // data is null for the first time I mount the component
  // subsequent re-render of the homescreen works as expected.

  console.log("settings screen:", loggedUser);

  const signout = () => {
    // Sign out the user from Firebase
    try {
      AsyncStorage.clear();
      signOut(auth);
      console.log("User signed out");
      dispatch(logout());
      dispatch(currentuser({}));
      navigation.replace("Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const deleteAccount = async () => {
    // console.log(auth.currentUser);

    await auth.currentUser.delete();
    console.log("accoutn deleted");

    const docId = userDetails.userId;
    const docRef = doc(db, "users", docId);
    const userData = await getDoc(docRef);
    const posts = userData.data().doubtsID;
    console.log(posts);
    const doubtsRef = collection(db, "doubts");
    for (let i = 0; i < posts.length; i++) {
      const id = posts[i];
      const userdoubt = doc(doubtsRef, id);
      await deleteDoc(userdoubt);
    }

    await deleteDoc(docRef);

    Alert.alert("Account Deleted", "Sorry to see you go.", [
      {
        text: "OK",
      },
    ]);
    AsyncStorage.clear();
    dispatch(currentuser({}));
    navigation.replace("Login");
    // signout();
  };
  return (
    <SafeAreaView style={styles.settingsContainer}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="gray" />
        </Pressable>
        <Text style={styles.settingsText}>Settings</Text>
      </View>
      <Pressable
        onPress={() => {
          navigation.replace("Home");
        }}
      ></Pressable>
      <View style={styles.bodyContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name="person" size={40} color="black" />
            <Text style={styles.iconText}>Account Details</Text>
          </View>
        </Pressable>
        {user && user?.role === "admin" && (
          <Pressable
            onPress={() => {
              navigation.navigate("Viewaccount");
            }}
          >
            <View style={styles.iconContainer}>
              <Icon style={styles.icon} name="list" size={40} color="black" />
              <Text style={styles.iconText}>View Accounts</Text>
            </View>
          </Pressable>
        )}
        {user && user?.role === "user" && (
          <Pressable onPress={deleteAccount}>
            <View style={styles.iconContainer}>
              <Icon style={styles.icon} name="delete" size={40} color="black" />
              <Text style={styles.iconText}>Delete your account</Text>
            </View>
          </Pressable>
        )}

        <Pressable onPress={signout}>
          <View style={styles.iconContainer}>
            <Icon
              style={styles.icon}
              name="exit-to-app"
              size={40}
              color="black"
            />
            <Text style={styles.iconText}>Logout</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.navbarContainer}>
        <Navbar homeIcon={true} />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,

    justifyContent: "space-between",
  },
  headerContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  goBack: {
    flex: 0.1,
  },
  settingsText: {
    fontSize: 30,
    fontWeight: "600",
    flex: 0.8,
    textAlign: "center",
  },
  bodyContainer: {
    flex: 0.7,
    gap: 50,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 30,
    marginLeft: 40,
  },
  iconText: {
    fontSize: 18,
    fontWeight: "300",
  },
  navbarContainer: {
    flex: 0.08,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
  },
});
