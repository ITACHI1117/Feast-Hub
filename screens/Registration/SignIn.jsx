import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import DataContext from "../../context/DataContext";

const CreateAccount = ({ navigation }) => {
  const { colors } = useTheme();
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
  } = useContext(DataContext);

  async function redirect() {
    await user;
    setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      // navigate(`/profile`, { replace: false });
      navigation.navigate("Congrats");
    });
  }

  user ? redirect() : "";

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleNameChange = (text) => {
    setUsername(text);
  };
  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          enabled={true}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // style={{ flex: 1, width: "100%" }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              paddingTop: 10,
            }}
          >
            <View style={{ top: 10, right: "40%" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView
              contentContainerStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              style={{
                height: "100%",
                width: "100%",
              }}
              showsVerticalScrollIndicator={false}
            >
              <Text
                style={{
                  paddingTop: 80,
                  fontSize: 35,
                  fontWeight: 700,
                  color: colors.text,
                  paddingBottom: 20,
                }}
              >
                Sign Up
              </Text>
              <Text
                style={{
                  paddingTop: 5,
                  fontSize: 17,
                  fontWeight: 400,
                  color: colors.text,
                  paddingBottom: 20,
                }}
              >
                Create account and choose favorite menu
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
                    Name
                  </Text>
                  <TextInput
                    style={[styles.textInput, { color: "black" }]}
                    placeholderTextColor={colors.placeholder}
                    placeholder="Your name"
                    onChangeText={handleNameChange}
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
                    Email
                  </Text>
                  <TextInput
                    style={[styles.textInput, { color: "black" }]}
                    placeholderTextColor={colors.placeholder}
                    placeholder="Your Enail"
                    onChangeText={handleEmailChange}
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
                    Password
                  </Text>
                  <TextInput
                    style={[styles.textInput, { color: "black" }]}
                    placeholderTextColor={colors.placeholder}
                    placeholder="Your Password"
                    onChangeText={handlePasswordChange}
                    secureTextEntry={true}
                  />
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => submit()}
                >
                  <Text style={{ color: "white", fontSize: 15 }}>Register</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{ paddingTop: 20 }}
                onPress={() => navigation.navigate("LogIn")}
              >
                <Text
                  style={{ color: "#959598", fontSize: 15, paddingBottom: 20 }}
                >
                  Have an account?
                  <Text style={{ color: "#F33F3F" }}> Sign In</Text>
                </Text>
              </TouchableOpacity>
              <Text style={{ color: "red" }}>{signUpError}</Text>
            </ScrollView>
            <View
              style={{
                position: "fixed",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>By clicking Register, you agree to our</Text>
              <Text
                style={{ color: "#F33F3F", marginTop: 10, marginBottom: 20 }}
              >
                Terms and Data Policy
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CreateAccount;

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
