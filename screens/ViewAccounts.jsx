import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, Image } from "react-native-elements";
import Navbar from "../components/Navbar";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ViewAccounts = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const usersRef = collection(db, "users");

    const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setUsers(data);
    });

    return () => {
      // cleanup
      unsubscribe();
    };
  }, []);
  //   console.log("users:", users);
  const awardLuddy = async (id) => {
    const userRef = doc(db, "users", id);
    const updateuser = users.find((user) => user.id === id);

    await updateDoc(userRef, {
      luddies: updateuser.luddies + 1,
    });

    const userDoc = await getDoc(userRef);
    // console.log(userDoc.data());
    const updateduser = userDoc.data();

    if (updateduser.luddies === 11) {
      await updateDoc(userRef, {
        isPremium: true,
      });
    }
    // console.log("Awarded 1 luddy");
  };
  return (
    <SafeAreaView style={styles.vaContainer}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="gray" />
        </Pressable>
        <Text style={styles.vaText}>Existing Users</Text>
      </View>
      <ScrollView style={{ gap: 50, flex: 0.7 }}>
        {users?.map((user, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.col1}>
              <Image
                style={styles.profilePic}
                source={{
                  uri: user.profilePic,
                }}
              />
            </View>
            {/* Profile Pic */}
            <View style={styles.col2}>
              <View style={styles.nameContainer}>
                <Text style={styles.key}>NAME</Text>
                <Text style={styles.value}>{user.name}</Text>
              </View>
              <View style={styles.emailContainer}>
                <Text style={styles.key}>E-MAIL</Text>
                <Text style={styles.value}>{user.email}</Text>
              </View>
              <View style={styles.premiumContainer}>
                <Text style={styles.key}>USER TYPE</Text>
                {user.isPremium ? (
                  <Text style={styles.value}>Premium User</Text>
                ) : (
                  <Text style={styles.value}>Normal Account</Text>
                )}
              </View>

              {/* name */}
              {/* email */}
              {/* PREMIUM USER or Normal USER */}

              <View>
                <Text style={styles.key}>LUDDIES</Text>
                <Text style={styles.value}>{user.luddies}</Text>
              </View>
              <View>
                <Text style={styles.key}>DOUBTS</Text>
                <Text style={styles.value}>{user.doubtsID.length}</Text>
              </View>
              <View>
                <Text style={styles.key}>COMMENTS</Text>
                <Text style={styles.value}>{user.totalComments}</Text>
              </View>

              {/* Luddies */}
              {/* Posts */}
              {/* Comments */}
              <Pressable onPress={() => awardLuddy(user.id)}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>AWARD LUDDIES</Text>
                </View>
              </Pressable>
              {/* Award Luddies */}
            </View>
          </View>
        ))}
      </ScrollView>
      <Navbar homeIcon={true} settingsIcon={true} />
    </SafeAreaView>
  );
};

export default ViewAccounts;

const styles = StyleSheet.create({
  vaContainer: {
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
  vaText: {
    fontSize: 30,
    fontWeight: "600",
    flex: 0.8,
    textAlign: "center",
  },
  card: {
    height: 500,
    width: 400,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 30,
    flexDirection: "row",
    marginHorizontal: 15,
  },

  col1: {
    borderWidth: 2,
    borderColor: "black",
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EA4335",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  col2: {
    borderWidth: 2,
    borderColor: "black",
    flex: 0.6,
    gap: 25,
    paddingTop: 10,
  },

  key: {
    fontWeight: "bold",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  value: { marginHorizontal: 10 },
  button: {
    borderRadius: 10,
    borderWidth: 2,
    height: 30,
    backgroundColor: "#EA4335",
    borderColor: "#EA4335",
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
