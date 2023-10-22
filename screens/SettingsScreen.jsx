import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";

const SettingsScreen = () => {
  const navigation = useNavigation();

  const logout = () => {
    // Sign out the user from Firebase
    try {
      AsyncStorage.clear();
      signOut(auth);
      console.log("User signed out");
      navigation.replace("Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
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
        <View style={styles.iconContainer}>
          <Icon style={styles.icon} name="person" size={40} color="black" />
          <Text style={styles.iconText}>Account Details</Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.replace("Help");
          }}
        >
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name="headset" size={40} color="black" />
            <Text style={styles.iconText}>Help</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.replace("Help");
          }}
        >
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name="delete" size={40} color="black" />
            <Text style={styles.iconText}>Delete your account</Text>
          </View>
        </Pressable>
        <Pressable onPress={logout}>
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
        <Navbar homeIcon={true} helpIcon={true} />
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
