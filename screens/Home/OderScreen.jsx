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

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Amala",
    price: "₦1700",
    image: require("../../assets/amala.jpg"),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    price: "₦2000",
    image: require("../../assets/amala.jpg"),
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={() => onPress} style={[styles.item]}>
    <View
      style={{
        width: 30,
        height: 30,
        backgroundColor,
        marginRight: 10,
        borderRadius: 10,
      }}
    ></View>
    <Text style={[styles.title, { color: textColor, textAlign: "center" }]}>
      {item.title}
    </Text>
  </TouchableOpacity>
);

const OrderScreen = ({ route }) => {
  const { itemId } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(2000);
  const [defaultPrice, setDefaultPrice] = useState(2000);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedId, setSelectedId] = useState();

  // getting data fromm database
  const [allUsers, setAllUsers] = useState();
  const [LoadError, setLoadError] = useState();

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `EleganceMenu/${itemId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAllUsers(Object.values(snapshot.val()));
          //   console.log(allUsers);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadError(error);
      });
  }, [itemId]);

  const handlePlus = () => {
    if (quantity >= 1) {
      setQuantity(quantity + 1);
      setPrice(price + defaultPrice);
    }
  };
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setPrice(price - defaultPrice);
    }
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <ScrollView>
      <SafeAreaView>
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
            source={require("../../assets/amala.jpg")}
          />
          {/* Display additional details of the item */}
        </View>
        <View style={{ marginTop: 20, paddingLeft: 30 }}>
          <Text style={{ fontSize: 25, fontWeight: 700 }}>{allUsers[2]}</Text>
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
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    width: "90%",
    overflow: "hidden",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
  },
});
