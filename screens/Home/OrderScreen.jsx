// DetailsScreen.js
import React, { useContext, useEffect, useState } from "react";
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
} from "firebase/database";

import { FlutterwaveInit } from "flutterwave-react-native";
import WebViewModal from "./WebViewModal";
import DataContext from "../../context/DataContext";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = ({ route }) => {
  const navigation = useNavigation();

  const [ismodalVisible, setIsModalVisible] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);
  const { restaurant, itemId, itemImage, itemName, itemPrice } = route.params;
  const [quantity1, setQuantity1] = useState(1);
  const [eggQuantity2, setEggQuantity2] = useState(0);
  const [meatQuantity2, setMeatQuantity2] = useState(0);
  const [fishQuantity2, setEFishQuantity2] = useState(0);
  const [moiMoiQuantity2, setMoiMoiQuantity2] = useState(0);
  const [plantainQuantity2, setplantainQuantity2] = useState(0);
  const [price, setPrice] = useState(itemPrice);
  const [defaultPrice, setDefaultPrice] = useState(2000);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [currentUser, setCurrentUser] = useState();

  const { userIdentify, user } = useContext(DataContext);
  // console.log(user.uid);
  let eggPrice = 200;

  const Data = [
    {
      toppin: "Egg",
      price: 200,
      quantity: eggQuantity2,
      setquantity: setEggQuantity2,
    },
    {
      toppin: "Meat",
      price: 100,
      quantity: meatQuantity2,
      setquantity: setMeatQuantity2,
    },
    {
      toppin: "Fish",
      price: 300,
      quantity: fishQuantity2,
      setquantity: setEFishQuantity2,
    },
    {
      toppin: "Moi Moi",
      price: 300,
      quantity: moiMoiQuantity2,
      setquantity: setMoiMoiQuantity2,
    },
    {
      toppin: "Plantain",
      price: 100,
      quantity: plantainQuantity2,
      setquantity: setplantainQuantity2,
    },
  ];

  // console.log(userIdentify);

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${user.uid}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCurrentUser(Object.values(snapshot.val()));
          //   console.log(currentUser);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadError(error);
      });
  }, [database]);

  //   handling state change for price
  const handlePlus = (price, setQuantity) => {
    setQuantity((quantity) => quantity + 1);
    setPrice((itemPrice) => itemPrice + price);
  };
  const handleMinus = (price, setQuantity) => {
    setQuantity((quantity) => quantity - 1);
    setPrice((itemPrice) => itemPrice - price);
  };

  //   Cart Details
  const OrderDetails = {
    restaurant: restaurant,
    user: currentUser,
    name: itemName,
    quantity: quantity1,
    topins: [
      eggQuantity2,
      meatQuantity2,
      fishQuantity2,
      moiMoiQuantity2,
      plantainQuantity2,
    ],
    price: price,
    foodImage: itemImage,
    // Other data
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%", paddingBottom: 400 }}>
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
              {quantity1 == 1 ? (
                <TouchableOpacity
                  disabled
                  onPress={() => handleMinus(itemPrice, setQuantity1)}
                >
                  <AntDesign name="minuscircle" size={24} color="gray" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleMinus(itemPrice, setQuantity1)}
                >
                  <AntDesign name="minuscircle" size={24} color="#F33F3F" />
                </TouchableOpacity>
              )}

              <Text>{quantity1}</Text>
              <TouchableOpacity
                onPress={() => handlePlus(itemPrice, setQuantity1)}
              >
                <AntDesign name="pluscircle" size={24} color="#F33F3F" />
              </TouchableOpacity>
              <Text>₦{price}</Text>
            </View>
            <View style={{ marginTop: 20, paddingLeft: 0 }}>
              <Text style={{ fontSize: 25, fontWeight: 700 }}>Toppins</Text>
              <View
                style={{
                  marginTop: 10,
                  width: "90%",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "space-between",
                  // borderWidth: 1,
                  // borderBlockColor: "gray",
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              >
                <ScrollView style={{ marginBottom: 100 }}>
                  {Data.map(({ toppin, price, quantity, setquantity }) => {
                    return (
                      <View
                        key={toppin}
                        style={{
                          width: "100%",
                          height: 50,
                          alignItems: "center",
                          justifyContent: "space-between",
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: 20,
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>{toppin}</Text>
                        <Text>₦{price}</Text>
                        <View
                          style={{
                            marginTop: 0,
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
                          {quantity == 0 ? (
                            <TouchableOpacity
                              disabled
                              onPress={() => handleMinus(price, setquantity)}
                            >
                              <AntDesign
                                name="minuscircle"
                                size={24}
                                color="gray"
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => handleMinus(price, setquantity)}
                            >
                              <AntDesign
                                name="minuscircle"
                                size={24}
                                color="#F33F3F"
                              />
                            </TouchableOpacity>
                          )}

                          <Text>{quantity}</Text>
                          <TouchableOpacity
                            onPress={() => handlePlus(price, setquantity)}
                          >
                            <AntDesign
                              name="pluscircle"
                              size={24}
                              color="#F33F3F"
                            />
                          </TouchableOpacity>
                          <Text>₦{price}</Text>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        // onPress={() => handlePaymentInitiation()}
        onPress={() =>
          navigation.navigate("AddressScreen", { data: OrderDetails })
        }
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
        <Text style={{ color: "white", fontSize: 18 }}>Order (N{price})</Text>
      </TouchableOpacity>
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
