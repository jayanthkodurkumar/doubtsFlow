import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import TextBox from "../components/TextBox";
import Navbar from "../components/Navbar";
import { Icon } from "react-native-elements";

const HelpScreen = () => {
  return (
    <SafeAreaView style={styles.helpContainer}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="gray" />
        </Pressable>
        <Text style={styles.helpText}>Settings</Text>
      </View>
      <Text>Reach out to our team</Text>
      <TextBox help={true} />
      <Navbar homeIcon={true} settingsIcon={true} />
    </SafeAreaView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  helpContainer: {
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
  helpText: {
    fontSize: 30,
    fontWeight: "600",
    flex: 0.8,
    textAlign: "center",
  },
});
