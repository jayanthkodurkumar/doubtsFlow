import { StyleSheet, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

const Navbar = ({ homeIcon, helpIcon, settingsIcon }) => {
  const HomeIcon = () => {
    return <Icon style={styles.icon} name="home" size={40} color="black" />;
  };
  const HelpIcon = () => {
    return <Icon style={styles.icon} name="headset" size={40} color="black" />;
  };
  const SettingsIcon = () => {
    return <Icon style={styles.icon} name="cog" size={40} color="black" />;
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
