import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DataContext from "../../context/DataContext";

const Account = () => {
  const { signOutUser, signed } = useContext(DataContext);
  const navigation = useNavigation();

  async function redirect() {
    await signed;
    navigation.push("LogIn");
  }
  !signed ? redirect() : "";
  return (
    <View>
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
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 700, color: "white" }}>
          ACCOUNT
        </Text>
        <TouchableOpacity
          onPress={() => signOutUser()}
          style={{
            backgroundColor: "white",
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
            position: "absolute",
            right: 20,
            bottom: 30,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#F33F3F" }}>LogOut</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView>
        <ScrollView style={{ height: "80%", width: "100%" }}>
          <View style={{ marginTop: 30, width: "100%", alignItems: "center" }}>
            <Text style={{ fontWeight: 600, fontSize: 20 }}>
              MY FEASTHUB ACCOUNT
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
            <View
              style={{
                paddingLeft: 20,
                marginTop: 40,
                width: "30%",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <Entypo name="open-book" size={30} color="black" />
              <Text style={{ fontWeight: 500, fontSize: 20 }}>Orders</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
