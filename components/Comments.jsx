import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native";

const Comments = () => {
  const [text, setText] = useState("");

  const textInputRef = useRef();

  const onTextChange = (enteredText) => {
    setText(enteredText);
  };

  const comments = [
    {
      id: 1,
      comment: "comment 1",
      name: "johne",
      date: "oct 23",
      isCorrect: false,
    },
    {
      id: 2,
      comment: "comment 2",
      name: "dave",
      date: "oct 23",
      isCorrect: false,
    },
    {
      id: 3,
      comment:
        "comment 3The shoes had been there for as long as anyone could remember. In fact, it was difficult for anyone to come up with a date they had first appeared. It had seemed they'd always been there and yet they seemed so out of place. Why nobody had removed them was a question that had been asked time and again, but while they all thought it, nobody had ever found the energy to actually do it. So, the shoes remained on the steps, out of place in one sense, but perfectly normal in another.",
      name: "maek",
      date: "oct 23",
      isCorrect: true,
    },
    {
      id: 4,
      comment:
        "comment 3The shoes had been there for as long as anyone could remember. In fact, it was difficult for anyone to come up with a date they had first appeared. It had seemed they'd always been there and yet they seemed so out of place. Why nobody had removed them was a question that had been asked time and again, but while they all thought it, nobody had ever found the energy to actually do it. So, the shoes remained on the steps, out of place in one sense, but perfectly normal in another.",
      name: "maek",
      date: "oct 23",
      isCorrect: true,
    },
    {
      id: 5,
      comment:
        "comment 3The shoes had been there for as long as anyone could remember. In fact, it was difficult for anyone to come up with a date they had first appeared. It had seemed they'd always been there and yet they seemed so out of place. Why nobody had removed them was a question that had been asked time and again, but while they all thought it, nobody had ever found the energy to actually do it. So, the shoes remained on the steps, out of place in one sense, but perfectly normal in another.",
      name: "maek",
      date: "oct 23",
      isCorrect: true,
    },
  ];

  const ViewComments = () => {
    return (
      <ScrollView style={styles.viewCommentcontainer}>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.individualComment}>
            <Text style={styles.commentText}>{comment.comment}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.commentName}>
                By {comment.name} on {comment.date}
              </Text>
              {comment.isCorrect && (
                <Icon
                  name="check-circle"
                  type="font-awesome"
                  color="green"
                  size={20}
                />
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.commentContainer}>
        <View style={styles.commentInputContainer}>
          <KeyboardAwareScrollView>
            <TextInput
              style={styles.commentInput}
              placeholder="ADD A COMMENT..."
              multiline={true}
              onChangeText={onTextChange}
              ref={textInputRef}
            ></TextInput>
          </KeyboardAwareScrollView>
        </View>
        <View style={styles.commentFunctionContainer}>
          <Pressable>
            <Icon name="add-comment" size={22} color={"#808080"} />
          </Pressable>
        </View>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          marginLeft: 14,
          marginVertical: 10,
        }}
      >
        Existing Comments
      </Text>
      <ViewComments />
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  commentContainer: {
    flex: 0.52,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  commentInputContainer: {
    flex: 0.9,
    maxHeight: 100,
  },
  commentInput: {
    flexWrap: "wrap",
    marginTop: 7,
    marginHorizontal: 10,
    textAlign: "justify",
  },
  commentFunctionContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    borderTopColor: "black",
    borderTopWidth: 0.25,
  },

  viewCommentcontainer: {
    flex: 0.6,
    padding: 10,
    gap: 15,
  },
  individualComment: {
    marginBottom: 10,
    borderWidth: 0.2,
    borderColor: "black",
    padding: 10,
    gap: 15,
  },
  commentText: {
    fontSize: 16,
    textAlign: "justify",
  },
  commentName: {
    fontSize: 12,
    color: "gray",
  },
});
