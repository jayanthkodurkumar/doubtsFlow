import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PicturePost from "../components/PicturePost";

const Photos = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PicturePost />
    </SafeAreaView>
  );
};

export default Photos;

const styles = StyleSheet.create({});
