import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Doubts = ({ home, viewDoubt, doubt, user }) => {
  const navigation = useNavigation();

  const handleReadMore = () => {
    navigation.navigate("ViewDoubt", { doubt: doubt });
  };
  const role = doubt.role;
  // console.log(role);
  // TODO: home page doubts component
  const Home = () => {
    return (
      <View style={homestyles.doubtContainers}>
        <View style={homestyles.doubtBox}>
          <View style={homestyles.doubtTitleContainer}>
            {doubt && role === "admin" ? (
              <Text style={[homestyles.doubtTitle, { color: "red" }]}>
                {" "}
                {doubt.title}
              </Text>
            ) : (
              <Text style={homestyles.doubtTitle}> {doubt.title}</Text>
            )}
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

          <Pressable
            style={homestyles.readmore}
            onPress={() => {
              handleReadMore(doubt);
            }}
          >
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
    // console.log(doubt[0]);
    const [loggedUser, setLoggedUser] = useState(null);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
      const fetchUsers = async () => {
        // console.log("user from store" + JSON.stringify(user));
        const userData = [];
        const uid = user.userId;
        const usersRef = doc(db, "users", uid);

        const userDoc = await getDoc(usersRef);

        if (userDoc.exists()) {
          const dataToPush = userDoc.data();
          userData.push(dataToPush);
        }
        setLoggedUser(userData);
      };
      const fetchData = async () => {
        const userData = await fetchUsers();
      };
      fetchData();
      return () => {
        // clean up to prevent infinite fetchof user
      };
    }, []);
    console.log("logged user on view doubt", loggedUser);
    const deleteDoubt = async (doubtId) => {
      try {
        const updatedDoubtsID = loggedUser[0].doubtsID.filter(
          (id) => id !== doubtId
        );
        const userRef = doc(db, "users", loggedUser[0].id);

        await updateDoc(userRef, { doubtsID: updatedDoubtsID });
        const doubtRef = doc(db, "doubts", doubtId);
        await deleteDoc(doubtRef);

        console.log("post deleted");
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <View style={viewdoubtstyles.doubtContainers}>
        <View style={viewdoubtstyles.doubtBox}>
          <View style={viewdoubtstyles.doubtTitleContainer}>
            {doubt && doubt[0].role === "admin" ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",

                  width: "100%",
                }}
              >
                <Text
                  style={[
                    viewdoubtstyles.doubtTitle,
                    {
                      color: "red",
                      flex: 0.99,
                      justifyContent: "flex-start",
                    },
                  ]}
                >
                  {" "}
                  {doubt[0].title}
                </Text>
              </View>
            ) : (
              <Text
                style={[
                  viewdoubtstyles.doubtTitle,
                  {
                    color: "black",
                    flex: 0.99,
                    justifyContent: "flex-start",
                  },
                ]}
              >
                {" "}
                {doubt[0].title}
              </Text>
            )}

            {doubt &&
              loggedUser &&
              (loggedUser[0].role === "admin" ||
                loggedUser[0].id === doubt[0].userId) && (
                <Pressable onPress={() => deleteDoubt(doubt[0].doubtID)}>
                  <View style={viewdoubtstyles.iconContainer}>
                    <Icon
                      style={viewdoubtstyles.icon}
                      name="delete"
                      size={30}
                      color="red"
                    />
                  </View>
                </Pressable>
              )}
          </View>
          {/* // loggedUser[0]?.id === doubt[0]?.userId) && */}
          <View style={viewdoubtstyles.doubtDetails}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontStyle: "italic", color: "#808080", fontSize: 8 }}
              >
                Posted by &nbsp;
              </Text>
              <Text style={{ fontStyle: "italic", fontSize: 8 }}>
                {doubt[0].name}&nbsp;
              </Text>
            </View>
            <View>
              <Text
                style={{ fontStyle: "italic", color: "#808080", fontSize: 8 }}
              >
                on {doubt[0].datePosted} &nbsp;
              </Text>
            </View>
          </View>
          <View style={viewdoubtstyles.doubtContentContainer}>
            <Text style={viewdoubtstyles.doubtContent}>{doubt[0].doubt}</Text>
          </View>
        </View>
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

const viewdoubtstyles = StyleSheet.create({
  doubtContainers: {
    // flex: 0.7,
    marginVertical: 20,
    marginHorizontal: 15,
    backgroundColor: "#EFEFEF",
  },
  doubtBox: {
    // flex: 1,
    justifyContent: "center",
  },
  doubtTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    flex: 0.2,
  },
});
