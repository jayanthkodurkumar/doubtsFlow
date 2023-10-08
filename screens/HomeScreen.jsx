import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ promptAsync }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
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
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
