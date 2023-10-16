import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome5";
import { auth, db } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";

const TextBox = ({ post, help }) => {
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

  // TODO: add a doubt function
  const addDoubt = async () => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];

    try {
      const doubtsRef = await addDoc(collection(db, "doubts"), {
        userId: "dKe9twF3HKX9lKvu6I3RZkuzKCz1",
        title: title,
        datePosted: formattedDate,
        name: "Jayanth",
        doubt: text,
        downvotes: 0,
        upvotes: 0,
        totalComments: 0,
      });
      console.log("Document added with ID: ", doubtsRef.id);

      const addId = {
        postId: doubtsRef.id,
      };

      await updateDoc(doubtsRef, addId, { merge: true });

      const usersRef = collection(db, "users");

      setText("");
      setTitle("");
      textInputRef.current.clear();
      titleInputRef.current.clear();
    } catch (error) {
      console.log(error);
    }
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

        {post && (
          <Pressable onPress={addDoubt}>
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

export default TextBox;

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