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
import { useNavigation } from "@react-navigation/native";
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
const AddressScreen = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { data } = route.params;
  const [address, setAddress] = useState();

  const handleAddressChange = (text) => {
    setAddress(text);
  };
  //   console.log(data.restaurant);
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
              onPress={() => navigation.goBack()}
              style={{ position: "absolute", left: 20, bottom: 30 }}
            >
              <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: 700 }}>
              ADD NEW ADRESS
            </Text>
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
                      FirstName
                    </Text>
                    <TextInput
                      style={[styles.textInput, { color: "black" }]}
                      placeholderTextColor={colors.placeholder}
                      placeholder="Your Name"
                      value={data.user[2]}

                      //   onChangeText={handleLastNameChange}
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
                      LastName
                    </Text>
                    <TextInput
                      style={[styles.textInput, { color: "black" }]}
                      placeholderTextColor={colors.placeholder}
                      placeholder="Your LastName"
                      value={data.user[4]}
                      //   onChangeText={handleLastNameChange}
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
                      //   onChangeText={handleMatricChange}
                      keyboardType="numeric"
                      value={data.user[3]}
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
                      //   onChangeText={handlePhoneNumberChange}
                      keyboardType="numeric"
                      value={data.user[6]}
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
                      Address
                    </Text>
                    <TextInput
                      style={[styles.textInput, { color: "black" }]}
                      placeholderTextColor={colors.placeholder}
                      placeholder="Your Address"
                      onChangeText={handleAddressChange}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate("SelectDelivery", {
                        data: [data, address],
                      })
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

export default AddressScreen;

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
