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
import * as Linking from "expo-linking";
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
import { auth, storage, reference } from "../../firebaseConfig";
import { FlutterwaveInit } from "flutterwave-react-native";
import WebViewModal from "./WebViewModal";

const SelectDelivery = ({ route }) => {
  const navigation = useNavigation();
  const [uploaded, setUploaded] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  const { data } = route.params;

  const UpdatesOders = () => {
    set(
      reference(database, "Orders/" + data[0].user[1] + `/${transactionId}`),
      {
        id: data[0].user[1],
        name: `${data[0].user[2]} ${data[0].user[4]}`,
        email: data[0].user[0],
        phone: data[0].user[6],
        matric: data[0].user[3],
        food: data[0].name,
        price: data[0].price,
        quantity: `${data[0].quantity} Quantity`,
        egg: `${data[0].topins[0]} Egg`,
        meat: `${data[0].topins[1]} Meat`,
        fish: `${data[0].topins[2]} Fish`,
        moimoi: `${data[0].topins[3]} Moi MOi`,
        moimoi: `${data[0].topins[4]} Plantain`,
      }
    )
      .then(() => {
        // setting userIdentify to userId so i can pass the same user id
        // to other functions that may need it
        setUploaded(true);
        navigation.replace("Orders");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   console.log(data[0].user);
  let deliveryFee = 400;
  const [total, setTotal] = useState(data[0].price + deliveryFee);
  const [ismodalVisible, setIsModalVisible] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);

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
    const Tx_id = generateTransactionReference(20);
    try {
      // initialize payment
      const Link = await FlutterwaveInit({
        tx_ref: Tx_id,
        authorization: "FLWPUBK_TEST-0f6335aff300d743e2c864258d738c41-X",
        customer: {
          email: data[0].user[0],
          phonenumber: data[0].user[6],
          name: `${data[0].user[2]} ${data[0].user[4]}`,
        },
        amount: total,
        currency: "NGN",
        payment_options: "card",
        redirect_url: "https://example.com/",
      });

      // Set the payment link in state
      setPaymentLink(Link);
      setTransactionId(Tx_id);
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
    openModal();
  };

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
              style={{ position: "absolute", left: 20, bottom: 30 }}
            >
              <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: 700 }}>
              SELECT DELIVERY
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
                    width: "100%",
                    height: 50,
                    paddingLeft: 10,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    // backgroundColor: "#424242",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: 700 }}>SUMMARY</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>
                    Food Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>
                    ₦{data[0].price}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>
                    Delivery fees
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>₦400</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>
                    Free Booking
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>₦0</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderWidth: 1,
                    borderTopColor: "black",
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>Total</Text>
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>
                    ₦{total}
                  </Text>
                </View>

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
                      width: "100%",
                      height: 50,
                      paddingLeft: 10,
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      // backgroundColor: "#424242",
                    }}
                  >
                    <Text
                      style={{ fontSize: 16, fontWeight: 700, marginTop: 20 }}
                    >
                      DELIVERY ADDRESS
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: 50,
                      paddingLeft: 10,
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 19,
                        fontWeight: 700,
                        marginBottom: 10,
                      }}
                    >
                      {data[0].user[2]} {data[0].user[4]}
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: 500 }}>
                      {data[1]}
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: 500 }}>
                      {transactionId}
                    </Text>
                  </View>
                  {transactionId == null ? (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handlePaymentInitiation()}
                    >
                      <Text style={{ color: "white", fontSize: 20 }}>
                        Proceed to Payment
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: "#D8C027" }]}
                      onPress={() => UpdatesOders()}
                    >
                      <Text style={{ color: "white", fontSize: 20 }}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </ScrollView>
            {transactionId == null ? (
              ""
            ) : (
              <View
                style={{
                  position: "fixed",
                  alignItems: "center",
                  justifyContent: "center",
                  bottom: 10,
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    color: "#D8C027",
                  }}
                >
                  Your Oder is being Processed. {"\n "} You can check the Order
                  Page for Confirmation
                </Text>
              </View>
            )}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <WebViewModal
        url={paymentLink}
        onClose={closeModal}
        visible={ismodalVisible}
      />
    </View>
  );
};

export default SelectDelivery;
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
