import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome5";

const TextBox = () => {
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
  const addPost = () => {
    console.log(title);
    console.log(text);
    setText("");
    setTitle("");
    textInputRef.current.clear();
    titleInputRef.current.clear();
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
        <Pressable>
          <Icon name="camera" size={22} color={"#808080"} />
        </Pressable>

        <Pressable onPress={addPost}>
          <Icon name="plus-circle" size={22} color={"#EA4335"} />
        </Pressable>
      </View>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  textContainer: {
    flex: 0.5,
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
  },

  textInputContainer: {
    flex: 0.6,
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
