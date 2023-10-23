import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";

const Headerbar = () => {
  const userDetails = useSelector((state) => state.currentuser.currentuser);

  useEffect(() => {
    console.log("header component user" + JSON.stringify(userDetails));
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.appNameContainer}>
          <Text style={styles.appNamePart1}>DOUBTS</Text>
          <Text style={styles.appNamePart2}>FLOW</Text>
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.premiumIconContainer}>
          <Icon name="crown" size={24} color="gold" />
        </View>
        {/* <Pressable style={styles.profilepictureContainer}>
          <Image
            style={styles.profilePic}
            source={{
              uri: userDetails[0].profilePic,
            }}
          />
        </Pressable> */}
      </View>
    </View>
  );
};

export default Headerbar;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    backgroundColor: "#EFEFEF",
  },
  leftContainer: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 0.7,
  },
  appNameContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  appNamePart1: {
    fontSize: 28,
    color: "#000000",
  },
  appNamePart2: {
    fontSize: 28,
    color: "#EA4335",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    flex: 0.3,
  },
  premiumIconContainer: {},
  profilepictureContainer: {},
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
