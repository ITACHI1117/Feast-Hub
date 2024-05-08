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

const BottomNav = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToPage = (menu) => {
    navigation.navigate(menu);
    setModalVisible(false);
  };
  return (
    <View style={styles.buttomNav}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => navigateToPage("EleganceMenu")}>
              <Text style={styles.modalText}>ELEGANCE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToPage("CafeteriaMenu")}>
              <Text style={styles.modalText}>CAFETERIA</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToPage("SweeTymeMenu")}>
              <Text style={styles.modalText}>SWEETYME</Text>
            </TouchableOpacity>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <MaterialIcons name="cancel" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Entypo name="home" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <FontAwesome5 name="user-alt" size={24} color="black" />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <AntDesign name="questioncircle" size={24} color="black" />
      </TouchableOpacity> */}
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
    left: "25%",
    right: "25%",
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
