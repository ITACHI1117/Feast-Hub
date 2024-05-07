import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React from "react";
// const loader = require('../assets/loader.gif');

const FlutterwaveCheckoutLoader = () => {
  return (
    <View style={styles.loadingImage} testID="flw-checkout-loader">
      <ActivityIndicator size="large" color="#F33F3F" />
      {/* Gif  */}
      {/* <Image
        source={require('./assets/loader.gif')}
        resizeMode="contain"
        style={styles.loadingImage}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingImage: {
    position: "absolute",
    top: "50%",
    left: "45%",
    // width: 200,
    // height: 200,
    resizeMode: "contain",
  },
});

export default FlutterwaveCheckoutLoader;
