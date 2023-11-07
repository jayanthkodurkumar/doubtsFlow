import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Doubts from "../components/Doubts";
import Comments from "../components/Comments";
import Navbar from "../components/Navbar";

const ViewDoubtScreen = ({ route }) => {
  // Access the doubt parameter from route.params
  let doubts = [];
  doubts.push(route.params?.doubt);
  console.log(doubts);

  // Check if doubt is defined before logging
  console.log("VD", doubts);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Doubts viewDoubt={true} doubt={doubts} style={styles.doubts} />
        {doubts && doubts[0]?.isSolved ? (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              marginLeft: 14,
              marginVertical: 10,
            }}
          >
            Doubt Solved
          </Text>
        ) : (
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
        )}

        <Comments style={styles.comments} currentDoubt={doubts} />
      </ScrollView>
      <Navbar homeIcon={true} settingsIcon={true} />
    </SafeAreaView>
  );
};

export default ViewDoubtScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
