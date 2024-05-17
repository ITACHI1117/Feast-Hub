import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
// import BottomNav from "./BottomNav";
import { useNavigation } from "@react-navigation/native";
import { database } from "../../../firebaseConfig";
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
import { AntDesign } from "@expo/vector-icons";
import DataContext from "../../../context/DataContext";

const AllOrders = ({ route }) => {
  // getting restuarant name from the previous screen
  const restaurantName = route.params.data;

  const navigation = useNavigation();
  const { colors } = useTheme();
  const [allUsers, setAllUsers] = useState();
  const [LoadError, setLoadError] = useState();
  const { userIdentify, user } = useContext(DataContext);
  const [currentUser, setCurrentUser] = useState();
  const [restaurant, setRestaurant] = useState(restaurantName);

  // getting user id
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCurrentUser(snapshot.val());
          // console.log(Object.values(snapshot.val()));
          get(child(dbRef, `Orders/${restaurant}/${snapshot.val().id}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                // setAllUsers(Object.values(snapshot.val()));
                const mappedData = Object.values(snapshot.val()).map((item) => {
                  if (!item) {
                    return {}; // Return an empty object if item is undefined
                  }
                  // Perform operations on each object
                  return {
                    name: item.name,
                    email: item.email,
                    food: item.food,
                    price: item.price,
                    phone: item.phone,
                    foodImage: item.foodImage,
                    address: item.address,
                  };
                });
                setAllUsers(mappedData);
              } else {
                setAllUsers("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
              setLoadError(error);
            });
        } else {
          console.log("No data available");
        }
        console.log(currentUser);
      })
      .catch((error) => {
        console.error(error);
        setLoadError(error);
      });
  }, [restaurant]);

  const handleRestaurant = (restaurantName) => {
    setRestaurant(restaurantName);
  };

  // getting dummy menus

  // useEffect(() => {
  //   const dbRef = ref(database);
  //   get(child(dbRef, `EleganceMenu/`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         setAllUsers(Object.values(snapshot.val()));
  //         //   console.log(allUsers);
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoadError(error);
  //     });
  // }, [database]);

  // if (allUsers != undefined) {
  //   const mappedData = allUsers.map((item) => {
  //     // Perform operations on each object
  //     return {
  //       name: item.name,
  //       email: item.email,
  //       food: item.food,
  //       price: item.price,
  //     };
  //   });
  //   console.log(mappedData);
  // } else {
  //   console.log("undefined");
  // }

  const DATA = allUsers;

  const Item = ({ item, onPress, backgroundColor, textColor }) =>
    allUsers != "No data available" ? (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("OrderScreen", {
            restaurant: "Elegance",
            itemId: item.id,
            itemImage: item.image,
            itemName: item.name,
            itemPrice: item.price,
          })
        }
        style={[styles.item, { backgroundColor: "#F2EEEE" }]}
      >
        <Image
          style={{
            width: "40%",
            height: 140,
            // borderRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            objectFit: "cover",
          }}
          // source={require("../../assets/amala.jpg")}
          source={{
            uri: item.foodImage,
          }}
        />
        <View
          style={{
            paddingLeft: 20,
            paddingTop: 10,
            backgroundColor: "white",
            height: 140,
            width: "60%",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Text
            style={[
              styles.title,
              { color: "black", fontSize: 18, fontWeight: 600 },
            ]}
          >
            {/* Adenekan Temilade */}
            {item.name}
          </Text>
          <Text
            style={[styles.title, { color: colors.textColor, fontSize: 16 }]}
          >
            {item.food}
          </Text>
          <Text
            style={[styles.title, { color: colors.textColor, fontSize: 16 }]}
          >
            {item.address}
          </Text>
          <Text style={[styles.title, { color: colors.textColor }]}>
            +234 {item.phone}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            position: "absolute",
            bottom: 50,
            paddingLeft: 15,
          }}
        >
          <Text
            style={[
              styles.title,
              { color: colors.textColor, fontSize: 18, fontWeight: 600 },
            ]}
          >
            Food Total
            {/* {item.name} */}
          </Text>
          <Text
            style={[
              styles.title,
              { color: colors.textColor, fontSize: 18, fontWeight: 600 },
            ]}
          >
            ₦{item.price}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            position: "absolute",
            bottom: 20,
            paddingLeft: 15,
          }}
        >
          <Text
            style={[
              styles.title,
              { color: colors.textColor, fontSize: 18, fontWeight: 600 },
            ]}
          >
            Delivery Fee
            {/* {item.name} */}
          </Text>
          <Text
            style={[
              styles.title,
              { color: colors.textColor, fontSize: 18, fontWeight: 600 },
            ]}
          >
            ₦400
            {/* {item.name} */}
          </Text>
        </View>
      </TouchableOpacity>
    ) : (
      ""
    );

  const [selectedId, setSelectedId] = useState();

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "white";
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
    <View style={{ backgroundColor: "#F2EEEE", height: "100%" }}>
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
          My Oders
        </Text>
      </View>

      {allUsers != "No data available" ? (
        <FlatList
          style={{
            height: "100%",
            width: "100%",
            marginBottom: 10,
            paddingBottom: 150,
          }}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          // numColumns={1}
        />
      ) : (
        <Text>NO Oders</Text>
      )}
    </View>
  );
};

export default AllOrders;

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
    // justifyContent: "space-around",
    marginLeft: 0,
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
  },
  title: {
    textAlign: "left",
    marginTop: 10,
    fontSize: 15,
  },
  navText: {
    fontSize: 18,
    fontWeight: 700,
  },
});
