import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

const Congrats = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingTop: 10,
          marginTop: -20,
        }}
      >
        <Image
          style={{ width: 250, height: 250 }}
          source={require("../../assets/present.png")}
        />
        <Text
          style={{
            paddingTop: 80,
            fontSize: 35,
            fontWeight: 700,
            color: colors.text,
            paddingBottom: 20,
          }}
        >
          Congratulations!
        </Text>
        <Text
          style={{
            paddingTop: 30,
            fontSize: 20,
            fontWeight: 400,
            color: colors.text,
            paddingBottom: 20,
            textAlign: "center",
          }}
        >
          Your account is complete, please try the {"\n"} best menu from us
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("LogIn")}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Congrats;

const styles = StyleSheet.create({
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
