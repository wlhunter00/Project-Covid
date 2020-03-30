import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useStyle } from "../styles/styles";
const MAX_LENGTH = 40;

export default function WebViewScreen({ route, navigation }) {
  const { styles } = useStyle("container");
  const { url, title } = route.params;
  const displayTitle = title.length < MAX_LENGTH ? title : title.slice(0, 36) + "..."
  navigation.setOptions({ title: displayTitle });

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={styles.container}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        originWhitelist={["*"]}
      />
    </View>
  );
}
