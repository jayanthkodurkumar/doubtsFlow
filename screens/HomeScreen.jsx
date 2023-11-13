import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../components/Navbar";
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
import { Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";

const HomeScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // TODO: useEffect to fetch user data from users collection
  const [loggedUser, setLoggedUser] = useState(null);
  const [totalDoubts, setTotalDoubts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      // console.log("user from store" + JSON.stringify(user));

      const uid = user.userId;
      const usersRef = doc(db, "users", uid);

      const querySnapshot = await getDocs(collection(db, "users"));

      const usersSize = querySnapshot.size;
      setTotalUsers(usersSize);
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
  // console.log("home user", loggedUser);

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

      const sortedData = data.slice().sort((a, b) => {
        const date1 = new Date(a.datePosted);
        const date2 = new Date(b.datePosted);
        return date2 - date1;
      });
      // console.log(sortedData);
      setDoubtsArray(sortedData);
      return sortedData;
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
      const doubtsSize = querySnapshot.size;
      setTotalDoubts(doubtsSize);
      const sortedData = data.slice().sort((a, b) => {
        const date1 = new Date(a.datePosted);
        const date2 = new Date(b.datePosted);
        return date2 - date1;
      });
      // console.log(sortedData);
      setDoubtsArray(sortedData);
    });

    // clean up to stop getting data from firestore after homescreen component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  // console.log("db changed:", doubtsArray);
  // console.log(totalDoubts + " " + totalUsers);
  // Header Bar
  const Headerbar = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.appNameContainer}>
            <Text style={styles.appNamePart1}>DOUBTS</Text>
            <Text style={styles.appNamePart2}>FLOW</Text>
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.premiumIconContainer}>
            {loggedUser && loggedUser?.isPremium ? (
              <Icon name="crown" size={24} color="gold" />
            ) : (
              <Icon name="crown" size={24} color="grey" />
            )}
          </View>
          <Pressable
            style={styles.profilepictureContainer}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              style={styles.profilePic}
              source={{
                uri: user.profilePic,
              }}
            />
          </Pressable>
        </View>
      </View>
    );
  };
  // console.log(doubtsArray);
  return (
    <SafeAreaView style={styles.homeScreenContainer}>
      <View style={styles.headerContainer}>
        <Headerbar user={loggedUser} />
      </View>
      <ScrollView style={styles.bodyContainer}>
        {/* User Banner */}
        {loggedUser && loggedUser?.role == "user" && (
          <View style={styles.banner}>
            <View style={styles.banner1}>
              <View style={styles.totalDoubts}>
                <View style={styles.stats}>
                  <Text style={styles.numbers}>{loggedUser?.totalDoubts}</Text>
                </View>
              </View>
              <View style={styles.totalLuddies}>
                <View style={styles.stats}>
                  <Text style={styles.numbers}>{loggedUser?.luddies}</Text>
                </View>
              </View>
            </View>
            <View style={styles.banner2}>
              <Text style={styles.type1}>TOTAL DOUBTS</Text>
              <Text style={styles.type2}>LUDDIES</Text>
            </View>
          </View>
        )}
        {/* admin banner */}
        {loggedUser && loggedUser?.role == "admin" && (
          <View style={styles.banner}>
            <View style={styles.banner1}>
              <View style={styles.totalDoubts}>
                <View style={styles.stats}>
                  <Text style={styles.numbers}>{totalUsers}</Text>
                </View>
              </View>
              <View style={styles.totalLuddies}>
                <View style={styles.stats}>
                  <Text style={styles.numbers}>{totalDoubts}</Text>
                </View>
              </View>
            </View>
            <View style={styles.banner2}>
              <Text style={styles.type1}>TOTAL USERS</Text>
              <Text style={styles.type2}>DOUBTS</Text>
            </View>
          </View>
        )}
        {/* Conditionally rendering texbox if there is a loggedUser */}
        {loggedUser !== null && <TextBox post={true} user={loggedUser} />}
        {/*  */}
        <View style={styles.doubtsContainer}>
          {doubtsArray.map((value, index) => (
            <Doubts key={index} home={true} doubt={value} user={loggedUser} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.navbarContainer}>
        <Navbar homeIcon={true} settingsIcon={true} />
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    backgroundColor: "#EFEFEF",
  },
  leftContainer: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 0.7,
  },
  appNameContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  appNamePart1: {
    fontSize: 28,
    color: "#000000",
  },
  appNamePart2: {
    fontSize: 28,
    color: "#EA4335",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    flex: 0.3,
  },
  premiumIconContainer: {},
  profilepictureContainer: {},
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  banner: {
    marginVertical: 30,
    height: 300,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EA4335",
  },

  banner1: {
    height: 300,
    width: "100%",
    backgroundColor: "#EA4335",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
    padding: 5,
  },

  totalDoubts: {
    backgroundColor: "white",
    height: 200,
    width: 200,
    flex: 0.5,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  stats: {
    backgroundColor: "#EA4335",
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  numbers: {
    color: "#FFF",
    fontSize: 64,
    fontWeight: "600",
  },
  totalLuddies: {
    backgroundColor: "white",
    height: 200,
    width: 200,
    flex: 0.5,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  banner2: {
    backgroundColor: "#EA4335",
    width: "100%",
    flexDirection: "row",
  },
  type1: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    flex: 1,
    alignSelf: "flex-start",
    textAlign: "center",
    paddingBottom: "5%",
  },
  type2: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    flex: 1,
    alignSelf: "flex-start",
    textAlign: "center",
  },
});
