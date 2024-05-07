import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import BottomNav from "./BottomNav";
import { useNavigation } from "@react-navigation/native";

const CafeteriaMenu = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

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
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
      price: "₦1500",
      image: require("../../assets/amala.jpg"),
    },
    {
      id: "58694a0f-d3da1-471f-bd96-145571e29d72",
      title: "Third Item",
      price: "₦1400",
      image: require("../../assets/amala.jpg"),
    },
    {
      id: "58694a0f-3da1f-471f-bd96-145571e29d72",
      title: "Third Item",
      price: "₦1000",
      image: require("../../assets/amala.jpg"),
    },
    {
      id: "58694a0f-3da1f-471f-bd96-145571e29d72",
      title: "Third Item",
      price: "₦1900",
      image: require("../../assets/amala.jpg"),
    },
  ];

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}
    >
      <Image
        style={{
          width: "100%",
          height: 160,
          borderRadius: 10,
          objectFit: "cover",
        }}
        source={item.image}
      />
      <Text style={[styles.title, { color: textColor, textAlign: "center" }]}>
        {item.title}
      </Text>
      <Text style={[styles.title, { color: textColor, textAlign: "center" }]}>
        {item.price}
      </Text>
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
          Cafeteria Menu
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
        <ScrollView
          sc
          style={{
            height: "100%",
            width: "90%",
            marginBottom: 100,
          }}
        >
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            numColumns={2}
          />
        </ScrollView>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
};

export default CafeteriaMenu;

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
