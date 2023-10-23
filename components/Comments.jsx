import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native";
import { Icon } from "react-native-elements";

const Comments = () => {
  const [text, setText] = useState("");

  const textInputRef = useRef();

  const onTextChange = (enteredText) => {
    setText(enteredText);
  };

  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentInputContainer}>
        <KeyboardAwareScrollView>
          <TextInput
            style={styles.textInput}
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
  );
};

export default Comments;

const styles = StyleSheet.create({
  commentContainer: {
    flex: 0.5,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  commentInputContainer: {
    flex: 0.6,
    minHeight: 50,
  },
  commentInput: {
    flexWrap: "wrap",
    marginTop: 7,
    marginHorizontal: 5,
    textAlign: "justify",
  },
  commentFunctionContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingTop: 7,
    marginBottom: 5,
    gap: 20,
    borderTopColor: "black",
    borderTopWidth: 0.5,
  },
});
