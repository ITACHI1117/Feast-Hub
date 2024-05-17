import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomNav = ({ route }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const restaurantName = route;
  console.log(restaurantName);

  const navigateToPage = (menu) => {
    navigation.navigate(menu);
    setModalVisible(false);
  };
  return (
    <View style={styles.buttomNav}>
      <TouchableOpacity onPress={() => navigation.navigate("RestaurantOrders")}>
        {/* <Entypo name="home" size={24} color="black" /> */}
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity> */}

      <TouchableOpacity onPress={() => navigation.navigate("AllOrders")}>
        <Entypo name="open-book" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  buttomNav: {
    justifyContent: "space-between",
    paddingHorizontal: 25,
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    bottom: "0%",
    backgroundColor: "white",
    padding: 10,
    paddingBottom: 50,
  },
  backdrop: {
    backgroundColor: "green",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    position: "absolute",
    left: 40,
    bottom: 60,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "transparent",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 19,
    fontWeight: 600,
  },
});
