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
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import DataContext from "../../context/DataContext";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const AdminLogin = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("Elegance");

  const { colors } = useTheme();

  const {
    email,
    password,
    loginError,
    LoginLoading,
    allUsers,
    signIn,
    signed,
    setEmail,
    setPassword,
    loggedInUser,
  } = useContext(DataContext);

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  console.log(signed);
  // Stroing Email value and then redirecting
  async function redirect() {
    await signed;
    navigation.replace("RestaurantOrders", { data: selectedValue });
  }

  signed ? redirect() : "";

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
            {/* <View style={{ position: "absolute", top: 20, left: 20 }}>
              <TouchableOpacity>
                <AntDesign name="arrowleft" size={30} color="black" />
              </TouchableOpacity>
            </View> */}
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
                Welcome Back 👏
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
                Sign into your restaurant account
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
                  <Picker
                    style={{ height: 150 }}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedValue(itemValue)
                    }
                  >
                    <Picker.Item label="Elegance" value="Elegance" />
                    <Picker.Item label="Cafeteria" value="Cafeteria" />
                    <Picker.Item label="SweeTyme" value="SweeTyme" />
                  </Picker>
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
                    placeholder="Your Email"
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
                  onPress={() => signIn()}
                  style={styles.button}
                >
                  <Text style={{ color: "white", fontSize: 15 }}>Login</Text>
                </TouchableOpacity>
              </View>

              {/* <TouchableOpacity
                style={{ paddingTop: 20 }}
                onPress={() => navigation.navigate("SignIn")}
              >
                <Text
                  style={{ color: "#959598", fontSize: 15, paddingBottom: 20 }}
                >
                  Don’t have an account?
                  <Text style={{ color: "#F33F3F" }}> Sign Up</Text>
                </Text>
              </TouchableOpacity> */}
              <Text style={{ color: "red", fontSize: 15 }}>{loginError}</Text>
              {LoginLoading ? (
                <ActivityIndicator size="large" color="#F33F3F" />
              ) : (
                ""
              )}
            </ScrollView>
            {/* <View
              style={{
                position: "fixed",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{ color: "#F33F3F", marginTop: 10, marginBottom: 20 }}
                >
                  Admin?
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AdminLogin;

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
    color: "black",
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
