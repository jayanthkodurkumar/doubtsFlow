import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewDoubtScreen = () => {
  const { doubt } = route.params;
  console.log(doubt);
  return (
    <SafeAreaView>
      <Text>ViewDoubtScreen</Text>
    </SafeAreaView>
  );
};

export default ViewDoubtScreen;

const styles = StyleSheet.create({});
