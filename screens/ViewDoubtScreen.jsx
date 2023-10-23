import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Doubts from "../components/Doubts";
import Comments from "../components/Comments";

const ViewDoubtScreen = ({ route }) => {
  // Access the doubt parameter from route.params
  const doubt = {};
  useEffect(() => {
    doubt = route.params?.doubt;
  }, []);

  // Check if doubt is defined before logging
  // if (doubt) {
  //   console.log(doubt);
  // }

  return (
    <SafeAreaView>
      <Doubts viewDoubt={true} doubt={doubt} />
      <Comments />
    </SafeAreaView>
  );
};

export default ViewDoubtScreen;

const styles = StyleSheet.create({});
