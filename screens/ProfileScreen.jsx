import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import Navbar from "../components/Navbar";
import { Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { currentuser } from "../redux/reducers/userReducer";
import { db } from "../firebase";
const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const [loggedUser, setLoggedUser] = useState([]);
  const [adminCode, setAdminCode] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      // console.log("user from store" + JSON.stringify(user));
      const userData = [];
      const uid = user.userId;
      const usersRef = doc(db, "users", uid);

      const userDoc = await getDoc(usersRef);

      if (userDoc.exists()) {
        const dataToPush = userDoc.data();
        userData.push(dataToPush);
      }
      setLoggedUser(userData);
    };
    const fetchData = async () => {
      const userData = await fetchUsers();
    };
    fetchData();
    return () => {
      // clean up to prevent infinite fetchof user
    };
  }, []);
  console.log(loggedUser);
  const code = () => {
    const admincode = "12345";
    const usersRef = collection(db, "users");
    console.log("button pressed");
    const userRef = doc(usersRef, loggedUser[0].id);
    if (adminCode === "12345") {
      updateDoc(userRef, { role: "admin" });
      Alert.alert("Success", "Congratulations! You are now an admin.", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
      navigation.navigate("Home");
    } else {
      Alert.alert("Failure", "Invalid Code", [{ text: "OK" }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="gray" />
        </Pressable>

        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View
        style={{
          alignItems: "baseline",
          justifyContent: "center",
          marginTop: 30,
          flexDirection: "row",
        }}
      >
        <Image
          style={styles.profilePic}
          source={{
            uri: loggedUser[0]?.profilePic,
          }}
        />
        <View style={styles.premiumIconContainer}>
          <Icon type="font-awesome" name="crown" size={24} color="gold" />
        </View>
      </View>
      <View style={styles.bodyContainer}>
        {loggedUser.map((userInfo, i) => (
          <View style={styles.data} key={i}>
            <Text style={styles.key}>Name</Text>
            <Text style={styles.value}>{userInfo.name}</Text>
            <Text style={styles.key}>Email</Text>
            <Text style={styles.value}>{userInfo.email}</Text>
            <Text style={styles.key}>Total Doubts</Text>
            <Text style={styles.value}> {userInfo.totalDoubts}</Text>
            <Text style={styles.key}>Total Comments </Text>
            <Text style={styles.value}>{userInfo.totalComments}</Text>
            <Text style={styles.key}>Luddies </Text>
            <Text style={styles.value}>{userInfo.luddies}</Text>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              ENTER THE ADMIN CODE TO SWITCH TO ADMIN MODE
            </Text>
            <TextInput
              placeholder="Your Code"
              onChangeText={(enteredText) => {
                setAdminCode(enteredText);
              }}
              style={styles.value}
            ></TextInput>
            <Pressable
              onPress={() => code()}
              style={{
                backgroundColor: "#ea4335",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
            </Pressable>
          </View>
        ))}
      </View>

      <Navbar homeIcon={true} settingsIcon={true} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
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
  headerText: {
    fontSize: 30,
    fontWeight: "600",
    flex: 0.8,
    textAlign: "center",
  },
  bodyContainer: {
    flex: 0.92,
    alignItems: "left",
    justifyContent: "center",
    marginHorizontal: 20,
  },

  data: {
    gap: 20,
  },
  navbarContainer: {
    flex: 0.08,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  key: {
    fontSize: 20,
    fontWeight: "bold",
  },
  value: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingLeft: 2,
  },
});
