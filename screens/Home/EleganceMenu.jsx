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
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import BottomNav from "./BottomNav";
import { useNavigation } from "@react-navigation/native";
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

const EleganceMenu = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // getting data fromm database
  const [allUsers, setAllUsers] = useState();
  const [LoadError, setLoadError] = useState();

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `EleganceMenu/`))
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
            restaurant: "Elegance",
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
            paddingBottom: 10,
          }}
        >
          Elegance Menu
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

export default EleganceMenu;

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
