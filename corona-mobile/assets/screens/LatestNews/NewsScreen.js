import React, { Component } from "react";

import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function NewsScreen({ route, navigation }) {
  const { site } = route.params;
  navigation.setOptions({ title: site.title });

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: site.source }}
        style={styles.webview}
        startInLoadingState
        originWhitelist={["*"]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  webview: {
    flex: 1
  }
});
