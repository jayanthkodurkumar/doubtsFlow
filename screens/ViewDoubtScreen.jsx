import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Doubts from "../components/Doubts";

const ViewDoubtScreen = () => {
  // const { doubt } = route.params;
  // console.log(doubt);
  return (
    <SafeAreaView>
      <Doubts viewDoubt={true} />
    </SafeAreaView>
  );
};

export default ViewDoubtScreen;

const styles = StyleSheet.create({});
