import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-elements";

const Navbar = ({ homeIcon, settingsIcon }) => {
  const navigate = useNavigation();
  const HomeIcon = () => {
    return (
      <Pressable
        onPress={() => {
          navigate.replace("Home");
        }}
      >
        <Text>
          {" "}
          <Icon style={styles.icon} name="home" size={40} color="black" />
        </Text>
      </Pressable>
    );
  };

  const SettingsIcon = () => {
    return (
      <Pressable
        onPress={() => {
          navigate.navigate("Settings");
        }}
      >
        <Text>
          <Icon style={styles.icon} name="cog" size={40} color="black" />
        </Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.navbarContainer}>
      {homeIcon && <HomeIcon />}

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
