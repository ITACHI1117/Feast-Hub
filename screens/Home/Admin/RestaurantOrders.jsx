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
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import BottomNav from "./components/BottomNav";
import { useNavigation } from "@react-navigation/native";
import { auth, storage, reference, database } from "../../../firebaseConfig";
import { ref, child, get, update } from "firebase/database";
import { AntDesign } from "@expo/vector-icons";
import DataContext from "../../../context/DataContext";
import { SimpleLineIcons } from "@expo/vector-icons";

const RestaurantOrders = ({ route }) => {
  const { loggedInuser, signOutUser, signed } = useContext(DataContext);
  const restaurantName = route.params.data;
  console.log(signed);

  async function redirect() {
    await signed;
    navigation.replace("LogIn");
  }

  !signed ? redirect() : "";

  const { colors } = useTheme();
  const navigation = useNavigation();

  // getting data fromm database
  const [allUsers, setAllUsers] = useState();
  const [LoadError, setLoadError] = useState();
  const [isAvailable, setIAvailable] = useState();

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `${restaurantName}Menu/`))
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
  //   console.log(allUsers[0].available);

  //   const UpdatesOders = (item, id, name, image, price) => {
  //     const newAvailability = !item.available;
  //     set(reference(database, `${restaurantName}Menu/${id}`), {
  //       available: newAvailability,
  //       id: id,
  //       image: image,
  //       name: name,
  //       price: price,
  //     })
  //       .then(() => {
  //         // setting userIdentify to userId so i can pass the same user id
  //         // to other functions that may need it
  //         setUploaded(true);
  //         navigation.replace("Orders");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     return;
  //   };

  const toggleAvailability = async (item) => {
    const updatedUsers = allUsers.map((user) => {
      if (user.id === item.id) {
        return { ...user, available: !item.available };
      }
      return user;
    });
    setAllUsers(updatedUsers);

    try {
      await update(ref(database, `${restaurantName}Menu/`), {
        [item.id]: { ...item, available: !item.available },
      });
      //   console.log("Availability updated successfully!");
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  const Item = React.memo(
    ({ item, onPress, backgroundColor, textColor }) => (
      <View style={[styles.item, { backgroundColor, marginBottom: 40 }]}>
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

        <TouchableOpacity
          onPress={() => toggleAvailability(item)}
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
            {item.available ? "available" : "unavailable"}
          </Text>
        </TouchableOpacity>
      </View>
    ),
    (prevProps, nextProps) => {
      // Memoization function to prevent re-renders when unnecessary
      return prevProps.item.available === nextProps.item.available;
    }
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
        <View style={{ position: "absolute", top: 0, left: 20 }}>
          <TouchableOpacity onPress={() => signOutUser()}>
            <SimpleLineIcons name="logout" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: colors.text,
            paddingBottom: 10,
          }}
        >
          {restaurantName} Menu
        </Text>

        <View
          style={{
            paddingLeft: 10,
            alignItems: "start",
            justifyContent: "center",
            width: "100%",
            height: 100,
            borderRadius: 15,
            marginBottom: 0,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 23,
              fontWeight: 300,
              marginBottom: 10,
            }}
          >
            Our Food
          </Text>
          <Text style={{ color: "#F33F3F", fontSize: 33, fontWeight: 700 }}>
            Special For You
          </Text>
        </View>

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

        <BottomNav />
      </View>
    </SafeAreaView>
  );
};

export default RestaurantOrders;

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
    marginLeft: 0,
    width: "48%",
    height: 250,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
  },
});
