// DetailsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Touchable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { FlutterwaveInit } from "flutterwave-react-native";
import WebViewModal from "./WebViewModal";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Amala",
    image: require("../../assets/amala.jpg"),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    image: require("../../assets/amala.jpg"),
  },
];

const OrderScreen = ({ route }) => {
  const [ismodalVisible, setIsModalVisible] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);
  const { itemId, itemImage, itemName, itemPrice } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(itemPrice);
  const [defaultPrice, setDefaultPrice] = useState(2000);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedId, setSelectedId] = useState();

  //   Handel web view
  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Generating random text reference
  const generateTransactionReference = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handlePaymentInitiation = async () => {
    try {
      // initialize payment
      const Link = await FlutterwaveInit({
        tx_ref: generateTransactionReference(20),
        authorization: "FLWPUBK_TEST-0f6335aff300d743e2c864258d738c41-X",
        customer: {
          email: "ajogujoseph0317@gmail.com",
          phonenumber: "08146821934",
          name: "Joseph Ajogu",
        },
        amount: price,
        currency: "NGN",
        payment_options: "card",
        redirect_url: "https://example.com/",
      });

      // Set the payment link in state
      setPaymentLink(Link);
      console.log(Link);
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
    openModal();
  };

  //   handling state change for price
  const handlePlus = () => {
    if (quantity >= 1) {
      setQuantity(quantity + 1);
      setPrice(price + itemPrice);
    }
  };
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setPrice(price - itemPrice);
    }
  };

  const [checkboxGroup1, setCheckboxGroup1] = useState([
    { id: 1, title: "Checkbox 1", isChecked: false },
    { id: 2, title: "Checkbox 2", isChecked: false },
  ]);

  const [checkboxGroup2, setCheckboxGroup2] = useState([
    { id: 3, title: "Checkbox 3", isChecked: false },
    { id: 4, title: "Checkbox 4", isChecked: false },
  ]);

  const handleCheckboxPress = (checkbox, group) => {
    if (group === 1) {
      setCheckboxGroup1(
        checkboxGroup1.map((item) =>
          item.id === checkbox.id
            ? { ...item, isChecked: !item.isChecked }
            : item
        )
      );
    } else if (group === 2) {
      setCheckboxGroup2(
        checkboxGroup2.map((item) =>
          item.id === checkbox.id
            ? { ...item, isChecked: !item.isChecked }
            : item
        )
      );
    }
  };
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <ScrollView>
        <View style={{ height: "100%" }}>
          <View
            style={{
              marginTop: 20,
              padding: 30,
              width: "90%",

              backgroundColor: "#EDE9E9",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <Image
              style={{
                bottom: 10,
                right: 8,
                width: 150,
                height: 150,
              }}
              source={{ uri: itemImage }}
            />

            {/* Display additional details of the item */}
          </View>
          <View style={{ marginTop: 20, paddingLeft: 30 }}>
            <Text style={{ fontSize: 25, fontWeight: 700 }}>{itemName}</Text>
            <View
              style={{
                marginTop: 20,
                width: 200,
                height: 35,
                backgroundColor: "#EDE9E9",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={() => handleMinus()}>
                <AntDesign name="minuscircle" size={24} color="black" />
              </TouchableOpacity>

              <Text>{quantity}</Text>
              <TouchableOpacity onPress={() => handlePlus()}>
                <AntDesign name="pluscircle" size={24} color="black" />
              </TouchableOpacity>
              <Text>₦{price}</Text>
            </View>
            <View style={{ marginTop: 20, paddingLeft: 0 }}>
              <Text style={{ fontSize: 25, fontWeight: 700 }}>Soup</Text>
              <View
                style={{
                  marginTop: 10,
                  width: "90%",
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "space-between",
                  borderWidth: 1,
                  borderBlockColor: "gray",
                  borderRadius: 10,
                }}
              >
                {checkboxGroup1.map((checkbox) => (
                  <TouchableOpacity
                    key={checkbox.id}
                    style={styles.checkboxContainer}
                    onPress={() => handleCheckboxPress(checkbox, 1)}
                  >
                    <View
                      style={
                        checkbox.isChecked
                          ? styles.checkedBox
                          : styles.uncheckedBox
                      }
                    >
                      {checkbox.isChecked && (
                        <Text style={styles.checkMark}>✓</Text>
                      )}
                    </View>
                    <Text>{checkbox.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => handlePaymentInitiation()}
        style={{
          backgroundColor: "#F33F3F",
          width: "90%",
          alignSelf: "center",
          position: "absolute",
          bottom: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          height: 45,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          Add to Cart (N{price})
        </Text>
      </TouchableOpacity>
      <WebViewModal
        url={paymentLink}
        onClose={closeModal}
        visible={ismodalVisible}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

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
  checkboxGroup: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkedBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue", // Change color when checked
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: {
    color: "white",
  },
});
