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
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/c39c/89b1/85eb8a0b41d5183b1a109a5976570aad?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dOumXe6RO2xuKskbn09PMpkOtzr-6hujq4uDCh7grjwjaZW25qSs7AGJfPTJ2sw5VnCqVBMWgWcxiOKE3WgtHSjnozXO9oedlkVGJ4zLu~37SZm~b4JqnuroJLgQW8vSDzT1yLtAHFwo830Xi56rTsTTW0Gm35K2hZx5slAb7~l7ZNIP~qI0R~obsSx9VMaAu9HGchTVM0QcPlzz2zrfvs1jQhW5kDk3WFcUeq4U9dIviPw5WjVqo6Bnalbm7mU-v8vVuhzaw0-mO0Z0yzJFRoyGw21r6twHsLBzjqKQ28P47OCvxyCIE0TH65iQD2HHEepV4JdKpSKXU9LDztXr1Q__",
          }}
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
          onPress={() => navigation.push("LogIn")}
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
