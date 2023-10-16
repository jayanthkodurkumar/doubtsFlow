import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Doubts = ({ home, viewDoubt, doubt }) => {
  // TODO: home page doubts component
  const Home = () => {
    return (
      <View style={homestyles.doubtContainers}>
        <View style={homestyles.doubtBox}>
          <View style={homestyles.doubtTitleContainer}>
            <Text style={homestyles.doubtTitle}> {doubt.title}</Text>
          </View>

          <View style={homestyles.doubtDetails}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontStyle: "italic", color: "#808080", fontSize: 8 }}
              >
                Posted by &nbsp;
              </Text>
              <Text style={{ fontStyle: "italic", fontSize: 8 }}>
                {doubt.name}&nbsp;
              </Text>
            </View>
            <View>
              <Text
                style={{ fontStyle: "italic", color: "#808080", fontSize: 8 }}
              >
                on {doubt.datePosted}&nbsp;
              </Text>
            </View>
          </View>
          <View style={homestyles.doubtContentContainer}>
            <Text style={homestyles.doubtContent} numberOfLines={5}>
              {doubt.doubt}
            </Text>
          </View>

          <Pressable style={homestyles.readmore}>
            <Text style={homestyles.readmoreText}>Read more...</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  const homestyles = StyleSheet.create({
    doubtContainers: {
      flex: 0.7,
      marginVertical: 20,
      marginHorizontal: 15,
      backgroundColor: "#EFEFEF",
    },
    doubtBox: {
      flex: 1,
      justifyContent: "center",
    },
    doubtTitleContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    doubtTitle: {
      fontSize: 32,
      fontWeight: "bold",
    },
    doubtDetails: {
      flexDirection: "row",
      justifyContent: "flex-end",
      borderBottomWidth: 1,
      borderColor: "#808080",
      marginBottom: 10,
    },
    doubtContentContainer: {
      marginTop: 5,
    },
    doubtContent: {
      fontSize: 18,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "justify",
    },
    readmore: {
      height: 40,
      borderRadius: 18,
      marginTop: 10,
      backgroundColor: "#EA4335",
      alignItems: "center",
      justifyContent: "center",
    },
    readmoreText: {
      color: "white",
      fontSize: 18,
    },
  });

  // TODO: view a doubt page component
  const ViewDoubt = () => {
    return (
      <View>
        <Text>this is view doubt page</Text>
      </View>
    );
  };
  return (
    <>
      {home && <Home />}
      {viewDoubt && <ViewDoubt />}
    </>
  );
};

export default Doubts;

const viewdoubtstyles = StyleSheet.create({});