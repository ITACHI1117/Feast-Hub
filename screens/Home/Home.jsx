import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import BottomNav from "./BottomNav";
import DataContext from "../../context/DataContext";

const Home = () => {
  const { loggedInuser } = useContext(DataContext);
  const { colors } = useTheme();
  //   console.log(loggedInuser.email);
  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: colors.text,
            paddingBottom: 20,
          }}
        >
          Home
        </Text>
        <ScrollView
          style={{
            height: "100%",
            width: "90%",
          }}
        >
          <View
            style={{
              paddingLeft: 10,
              alignItems: "start",
              justifyContent: "center",
              backgroundColor: "#F33F3F",
              width: "100%",
              height: 100,
              borderRadius: 15,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              Delivery to Doorsteps {"\n"}Crawford University, Igbesa {"\n"}Ogun
              State.
            </Text>
          </View>
          <View
            style={{
              paddingLeft: 20,
              alignItems: "start",
              justifyContent: "center",
              backgroundColor: "#f76a6a",
              width: "100%",
              height: 200,
              borderRadius: 15,
            }}
          >
            <Text style={{ color: "black", fontWeight: 600, fontSize: 30 }}>
              Chicken Teriyaki
            </Text>

            <TouchableOpacity style={styles.button}>
              <Text style={{ color: "white", fontSize: 23, fontWeight: 600 }}>
                Order Now
              </Text>
            </TouchableOpacity>
            <Image
              style={{
                position: "absolute",
                bottom: 10,
                right: 8,
                width: 150,
                height: 150,
              }}
              source={require("../../assets/chicken1.png")}
            />
          </View>
        </ScrollView>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 45,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#F33F3F",
    color: "white",
  },
});
