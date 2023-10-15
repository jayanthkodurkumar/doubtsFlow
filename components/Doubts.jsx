import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Doubts = ({ home, viewDoubt }) => {
  let doubts = {
    1: {
      doubtid: 1,
      title: "title 1",
      datePosted: 19 / 15 / 2023,
      commentsCollection: {
        10: {
          commentid: 10,
          name: "John Doe",
          isCorrect: true,
          upvotes: 1,
          downvotes: 3,
          comment: "comment 1",
        },
      },
      doubt: "this is a doubt",
      downvotes: 3,
      upvotes: 3,
      totalComments: 10,
    },
    2: {
      doubtid: 2,
      title: "title 2",
      datePosted: 19 / 15 / 2023,
      commentsCollection: {
        20: {
          commentid: 20,
          name: "John Doe",
          isCorrect: true,
          upvotes: 1,
          downvotes: 3,
          comment: "comment 2",
        },
      },
      doubt: "this is a doubt 2",
      downvotes: 3,
      upvotes: 3,
      totalComments: 10,
    },
    3: {
      doubtid: 3,
      title: "title 3",
      datePosted: 19 / 15 / 2023,
      commentsCollection: {
        30: {
          commentid: 30,
          name: "John Doe",
          isCorrect: true,
          upvotes: 1,
          downvotes: 3,
          comment: "comment 3",
        },
      },
      doubt: "this is a doubt 3",
      downvotes: 3,
      upvotes: 3,
      totalComments: 10,
    },
  };
  const Home = () => {
    return (
      <ScrollView style={homestyles.doubtContainer}>
        <View style={homestyles.doubtBox}>
          <View style={homestyles.doubtTitleContainer}>
            <Text style={homestyles.doubtTitle}> </Text>
          </View>

          <View style={homestyles.doubtDetails}></View>
          <View style={homestyles.doubtContentContainer}>
            <Text style={homestyles.doubtContent}></Text>
          </View>

          <Pressable style={homestyles.readmore}>
            <Text style={homestyles.readmoreText}>Read more</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  };

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

const homestyles = StyleSheet.create({
  doubtContainer: {
    flex: 0.6,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 15,
  },
});

const viewdoubtstyles = StyleSheet.create({});
