import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useStyle } from "../styles/styles";

export default function WebViewScreen({ route, navigation }) {
  const { styles } = useStyle("container");
  const { url, title, originWhitelist } = route.params;
  navigation.setOptions({ title: title })

  console.log(route.params)

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={styles.container}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        originWhitelist={(originWhitelist === undefined) ? ["*"] : originWhitelist}
      />
    </View>
  );
}
