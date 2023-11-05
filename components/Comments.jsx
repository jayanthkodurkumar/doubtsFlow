import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";

const Comments = ({ currentDoubt }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      // console.log("user from store" + JSON.stringify(user));

      const uid = user.userId;
      const usersRef = doc(db, "users", uid);

      const userDoc = await getDoc(usersRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setLoggedUser(userData);
        dispatch(currentuser(userData));
      }

      // return userData;
    };

    fetchUsers();

    return () => {
      // clean up to prevent infinite fetch of user
    };
  }, []);
  const docId = currentDoubt[0].doubtID;

  // console.log("doubt on comments component", currentDoubt);
  // console.log("comments array: ", currentDoubt[0].comments);

  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  const [comment, setComment] = useState("");

  const commentInputRef = useRef();

  const onCommentChange = (enteredComment) => {
    setComment(enteredComment);
  };

  // TODO: fetch all comments
  const [commentsArray, setCommentsArray] = useState([]);

  // TODO: get the new doubts collection
  useEffect(() => {
    const doubtsRef = collection(db, "doubts");

    const docRef = doc(doubtsRef, docId);
    // console.log(docRef);
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      const data = docSnapshot.data();
      if (data && data.comments) {
        setCommentsArray(data.comments);
      }
    });

    // clean up to stop getting data from firestore after homescreen component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  // console.

  // console.log("new comments array", commentsArray);
  // TODO: add a doubt function
  const len = commentsArray.length;
  const addComment = async () => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];

    try {
      const doubtsRef = collection(db, "doubts");
      const docRef = doc(doubtsRef, docId);

      const userComment = {
        id: len + 3,
        date: formattedDate,
        name: user.name,
        content: comment,
        isCorrect: false,
        userID: user.userId,
      };
      await updateDoc(docRef, { comments: arrayUnion(userComment) });

      const userRef = doc(db, "users", user.userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      // const updateuser = userRef.find((account) => account.id === user.userId);

      await updateDoc(userRef, {
        totalComments: userData.totalComments + 1,
      });

      // console.log("Comment added successfully");
      // console.log("updated post:", currentDoubt[0].comments);
      setComment("");

      // Check if the ref is not null before calling clear
      if (commentInputRef.current) {
        commentInputRef.current.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  var commentsArrayLength = commentsArray.length;

  // fetchcomment
  const findComment = (commentID) => {
    const comment = commentsArray.find((comment) => comment.id === commentID);
    if (comment) {
      return comment;
    }
  };
  const markCorrect = async (commentID) => {
    const comment = findComment(commentID);

    if (comment) {
      const changedCorrect = !comment.isCorrect;

      const doubtsRef = collection(db, "doubts");
      const docRef = doc(doubtsRef, docId);

      const currentComment = commentsArray.findIndex(
        (cmt) => cmt.id === commentID
      );

      const updatedCommentsArray = [...commentsArray];
      updatedCommentsArray[currentComment].isCorrect = changedCorrect;

      await updateDoc(docRef, { comments: updatedCommentsArray });
    }
  };

  const ViewComments = () => {
    return (
      <ScrollView style={styles.viewCommentcontainer}>
        {commentsArrayLength > 0 ? (
          commentsArray.map((comment) => (
            <View key={comment.id} style={styles.individualComment}>
              <Pressable onPress={() => markCorrect(comment.id)}>
                <View>
                  {loggedUser && loggedUser?.role === "admin" && (
                    <Icon
                      name="check"
                      type="font-awesome"
                      size={30}
                      color="green"
                    />
                  )}
                </View>
              </Pressable>
              <Text style={styles.commentText}>{comment.content}</Text>
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
          ))
        ) : (
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            No comments yet...
          </Text>
        )}
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {currentDoubt && currentDoubt[0]?.isSolved !== true && (
        <View style={styles.commentContainer}>
          <View style={styles.commentInputContainer}>
            <KeyboardAwareScrollView>
              <TextInput
                style={styles.commentInput}
                placeholder="ADD A COMMENT..."
                multiline={true}
                onChangeText={onCommentChange}
                ref={commentInputRef}
              ></TextInput>
            </KeyboardAwareScrollView>
          </View>
          <View style={styles.commentFunctionContainer}>
            <Pressable onPress={addComment}>
              <Icon name="add-comment" size={22} color={"#808080"} />
            </Pressable>
          </View>
        </View>
      )}

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
    flex: 1,
    gap: 15,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  commentInputContainer: {
    flex: 0.9,
    height: 100,
  },
  commentInput: {
    flexWrap: "wrap",
    marginTop: 7,
    marginHorizontal: 10,
    textAlign: "justify",
  },
  commentFunctionContainer: {
    flex: 0.1,
    height: 30,
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
