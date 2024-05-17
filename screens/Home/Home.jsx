import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import BottomNav from "./BottomNav";
import DataContext from "../../context/DataContext";
import EleganceMenu from "./EleganceMenu";
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

const Home = ({ navigation }) => {
  const { loggedInuser, SignUserout } = useContext(DataContext);
  const [allUsers, setAllUsers] = useState();
  const { colors } = useTheme();
  const [restaurant, setRestaurant] = useState();
  //   console.log(loggedInuser.email);

  useEffect(() => {
    const restaurantName = ["Elegance", "Cafeteria", "SweeTyme"];

    // Generate a random index within the range of the array length
    const randomIndex = Math.floor(Math.random() * restaurantName.length);

    // Use the random index to select a restaurant name from the array
    const selectedRestaurant = restaurantName[randomIndex];

    // console.log(selectedRestaurant);
    setRestaurant(selectedRestaurant);
    const dbRef = ref(database);
    get(child(dbRef, `${selectedRestaurant}Menu/`))
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
  }, [database]);

  const DATA = allUsers;

  const Item = ({ item, onPress, backgroundColor, textColor }) =>
    item.available ? (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("OrderScreen", {
            restaurant: restaurant,
            itemId: item.id,
            itemImage: item.image,
            itemName: item.name,
            itemPrice: item.price,
          })
        }
        style={[styles.item, { backgroundColor }]}
      >
        <Image
          style={{
            width: "100%",
            height: 160,
            borderRadius: 10,
            objectFit: "cover",
          }}
          // source={require("../../assets/chicken1.png")}
          source={{
            uri: item.image,
          }}
        />
        <Text style={[styles.title, { color: textColor, textAlign: "center" }]}>
          {item.name}
        </Text>
        <Text style={[styles.title, { color: textColor, textAlign: "center" }]}>
          ₦{item.price}
        </Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        disabled
        style={[styles.item, { backgroundColor, opacity: 0.5 }]}
      >
        <Image
          style={{
            width: "100%",
            height: 160,
            borderRadius: 10,
            objectFit: "cover",
          }}
          // source={require("../../assets/chicken1.png")}
          source={{
            uri: item.image,
          }}
        />
        <View
          style={{
            width: 100,
            marginTop: 10,
            backgroundColor: item.available ? "green" : "red",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            padding: 8,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>
            {item.available ? "Available" : "Unavailable"}
          </Text>
        </View>
      </TouchableOpacity>
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
        <View
          style={{
            paddingLeft: 10,
            alignItems: "start",
            justifyContent: "center",
            backgroundColor: "#F33F3F",
            width: "90%",
            height: 100,
            borderRadius: 15,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            Delivery to Doorsteps {"\n"}Crawford University, Igbesa {"\n"}Ogun
            State.
          </Text>
        </View>
        {/* <ScrollView
          style={{
            height: "100%",
            width: "90%",
          }}
        > */}

        {/* <View
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
            <Text style={{ color: "black", fontWeight: 600, fontSize: 25 }}>
              Chicken Teriyaki
            </Text>

            <TouchableOpacity style={styles.button}>
              <Text style={{ color: "white", fontSize: 20, fontWeight: 600 }}>
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
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/d97e/f609/64d5ffe2a3d624970673fc1386449ff0?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dkz2czE0nxrd39jM5FNJAKMF8drxN~mijWJ3qThlcjvVuggdyHaCPzKX03EuU~GOqIo0y5KUoOxR8CDQThinqhGgBsxb0a5Ad2h2hfZAuN2BCxVEmj3wL1P0E84WciHVzfJg8SZRF3c1kivTt9c3jJOZ27ONDUforUrVjAZXc3sK89DU4aQbXpe2Ksvjf8-qJAUduDCkRNyi1JnjhTKI0dkuRhMU3w-0i9Xo~zsFKGXSjR0yAOghH0QtTEXkYYI~aRGQjnFbLcb8ouw7sD4PwAvb5atIEpSZ0MiQRK5rUhKo8TvcUVmyDYLBotlNkmlRFdiCoxugLBmyN80fMUT7-w__",
              }}
            />
          </View> */}
        {/* </ScrollView> */}
        {allUsers === undefined ? (
          <ActivityIndicator size="large" color="#F33F3F" />
        ) : (
          <FlatList
            style={{
              height: "100%",
              width: "90%",
              marginBottom: 100,
            }}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            numColumns={2}
          />
        )}
        {/* <EleganceMenu /> */}
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
    width: "45%",
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
    marginLeft: 0,
    width: "48%",
    height: 250,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    marginTop: 10,
    fontSize: 15,
  },
});
