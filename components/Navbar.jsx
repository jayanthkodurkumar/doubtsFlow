import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const Navbar = ({ homeIcon, helpIcon, settingsIcon }) => {
  const navigate = useNavigation();
  const HomeIcon = () => {
    return (
      <Pressable
        onPress={() => {
          navigate.replace("Home");
        }}
      >
        <Icon style={styles.icon} name="home" size={40} color="black" />
      </Pressable>
    );
  };
  const HelpIcon = () => {
    return (
      <Pressable
        onPress={() => {
          navigate.replace("Help");
        }}
      >
        <Icon style={styles.icon} name="headset" size={40} color="black" />;
      </Pressable>
    );
  };
  const SettingsIcon = () => {
    return (
      <Pressable
        onPress={() => {
          navigate.replace("Settings");
        }}
      >
        <Icon style={styles.icon} name="cog" size={40} color="black" />
      </Pressable>
    );
  };
  return (
    <View style={styles.navbarContainer}>
      {homeIcon && <HomeIcon />}
      {helpIcon && <HelpIcon />}
      {settingsIcon && <SettingsIcon />}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#EFEFEF",
    // borderWidth: 4,
    // borderColor: "black",
  },
});
