import {
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import DataContext from "../../context/DataContext";
import { database } from "../../firebaseConfig";
import {
  ref,
  child,
  get,
  serverTimestamp,
  set,
  push,
  onDisconnect,
  onValue,
  update,
  getDatabase,
} from "firebase/database";

const PersonalInfo = ({ navigation }) => {
  const { colors } = useTheme();
  const [currentUser, setCurrentUser] = useState();
  const [matricNumber, setMatricNumber] = useState("");
  const [LastName, setLastNmae] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [updated, setUpdated] = useState(false);

  const {
    email,
    password,
    user,
    username,
    phone,
    signUpError,
    setEmail,
    setPassword,
    submit,
    setPhone,
    setUsername,
    SignUpLoading,
    userIdentify,
  } = useContext(DataContext);

  const handleMatricChange = (text) => {
    setMatricNumber(text);
  };
  const handleLastNameChange = (text) => {
    setLastNmae(text);
  };
  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  //   async function redirect() {
  //     await user;
  //     navigation.replace("Lo");
  //   }

  //   user ? redirect() : "";

  //   Get user that just signed up
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${userIdentify}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCurrentUser(Object.values(snapshot.val()));
          //   console.log(allUsers);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadError(error);
      });
  }, [database]);

  //Update user info

  function writeNewPost(LastName, matricNumber, PhoneNumber) {
    const database = getDatabase();

    // A post entry.
    const postData = {
      email: currentUser[0],
      id: currentUser[1],
      name: currentUser[2],
      phone: currentUser[3],
      profile_picture: currentUser[4],
      lastname: LastName,
      matricNumber: matricNumber,
      phoneNumber: PhoneNumber,
    };

    // Get a key for a new Post.
    const newPostKey = push(child(ref(database), "users")).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates["users/" + currentUser[1]] = postData;

    return update(ref(database), updates)
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        setUpdated(true);
        function redirect() {
          navigation.push("Congrats");
        }

        redirect();
      });
  }

  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          enabled={true}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // style={{ flex: 1, width: "100%" }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 0,
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#F33F3F",
              height: 115,
              paddingTop: 30,
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", left: 20, bottom: 30 }}
            >
              <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: 700 }}>PERSONAL INFO</Text>
          </View>
          <SafeAreaView>
            <ScrollView style={{ height: "80%", width: "100%" }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 0,
                  height: "100%",
                }}
              >
                <Text style={{ fontSize: 20, marginBottom: 40 }}>
                  We just need you to fill in some details
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                    paddingTop: 5,
                    marginLeft: 0,
                  }}
                >
                  <View
                    style={{
                      width: "90%",
                      paddingTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        marginBottom: 10,
                        fontSize: 17,
                        fontWeight: 500,
                        marginLeft: 5,
                      }}
                    >
                      LastName
                    </Text>
                    <TextInput
                      style={[styles.textInput, { color: "black" }]}
                      placeholderTextColor={colors.placeholder}
                      placeholder="Your Last Name"
                      onChangeText={handleLastNameChange}
                    />
                  </View>
                  <View
                    style={{
                      width: "90%",
                      paddingTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        marginBottom: 10,
                        fontSize: 17,
                        fontWeight: 500,
                        marginLeft: 5,
                      }}
                    >
                      Matric Number
                    </Text>
                    <TextInput
                      style={[styles.textInput, { color: "black" }]}
                      placeholderTextColor={colors.placeholder}
                      placeholder="Your Matric Number"
                      onChangeText={handleMatricChange}
                      keyboardType="numeric"
                    />
                  </View>
                  <View
                    style={{
                      width: "90%",
                      paddingTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        marginBottom: 10,
                        fontSize: 17,
                        fontWeight: 500,
                        marginLeft: 5,
                      }}
                    >
                      Phone Number
                    </Text>
                    <TextInput
                      style={[styles.textInput, { color: "black" }]}
                      placeholderTextColor={colors.placeholder}
                      placeholder="Your Phone Number"
                      onChangeText={handlePhoneNumberChange}
                      keyboardType="numeric"
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      writeNewPost(LastName, matricNumber, PhoneNumber)
                    }
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>
                      Continue
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                position: "fixed",
                alignItems: "center",
                justifyContent: "center",
                bottom: 10,
                backgroundColor: "white",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 18 }}>
                For further support, you may contact{"\n"} the Help Center{" "}
              </Text>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#EDF0F7",
    width: "100%",
    height: 45,
    padding: 10,
    fontSize: 13,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 45,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#F33F3F",
    color: "white",
  },
});
