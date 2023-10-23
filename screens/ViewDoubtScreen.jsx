import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Doubts from "../components/Doubts";
import Comments from "../components/Comments";
import Navbar from "../components/Navbar";

const ViewDoubtScreen = ({ route }) => {
  // Access the doubt parameter from route.params
  let doubts = [];
  doubts.push(route.params?.doubt);

  // Check if doubt is defined before logging

  return (
    <SafeAreaView style={styles.container}>
      <Doubts viewDoubt={true} doubt={doubts} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          marginLeft: 14,
          marginVertical: 10,
        }}
      >
        Add Comments
      </Text>
      <Comments style={styles.comments} />

      <Navbar homeIcon={true} settingsIcon={true} helpIcon={true} />
    </SafeAreaView>
  );
};

export default ViewDoubtScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  comments: {
    flex: 0.1,
  },
});
