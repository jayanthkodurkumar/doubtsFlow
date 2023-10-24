import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome5";
import { auth, db } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const HelpBox = ({ post, help }) => {
  const userDetails = useSelector((state) => state.auth.user);
  // useEffect(() => {
  //   console.log("user from store" + JSON.stringify(userDetails));
  // }, []);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const textInputRef = useRef();
  const titleInputRef = useRef();

  const onTextChange = (enteredText) => {
    setText(enteredText);
  };
  const onTitleChange = (enteredTitle) => {
    setTitle(enteredTitle);
  };

  return (
    <View style={styles.textContainer}>
      <View style={styles.titleInputContainer}>
        <KeyboardAwareScrollView>
          <TextInput
            style={styles.titleInput}
            flex={1}
            placeholder="SUGGEST A TITLE"
            multiline={true}
            onChangeText={onTitleChange}
            ref={titleInputRef}
          ></TextInput>
        </KeyboardAwareScrollView>
      </View>
      <View style={styles.textInputContainer}>
        <KeyboardAwareScrollView>
          <TextInput
            style={styles.textInput}
            placeholder="HAVE A DOUBT?"
            multiline={true}
            onChangeText={onTextChange}
            ref={textInputRef}
          ></TextInput>
        </KeyboardAwareScrollView>
      </View>
      <View style={styles.textFunctionContainer}>
        {post && (
          <Pressable>
            <Icon name="plus-circle" size={22} color={"#EA4335"} />
          </Pressable>
        )}
        {help && (
          <Pressable>
            <Icon name="plus-circle" size={22} color={"#EA4335"} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default HelpBox;

const styles = StyleSheet.create({
  textContainer: {
    flex: 0.9,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  titleInputContainer: {
    flex: 0.2,
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
  titleInput: {
    flexWrap: "wrap",
    marginTop: 7,
    marginHorizontal: 5,
    textAlign: "justify",
    fontWeight: "bold",
  },

  textInputContainer: {
    flex: 0.6,
    minHeight: 200,
  },
  textInput: {
    flexWrap: "wrap",
    marginTop: 7,
    marginHorizontal: 5,
    textAlign: "justify",
  },
  textFunctionContainer: {
    flex: 0.2,
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
