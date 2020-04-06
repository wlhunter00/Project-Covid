import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useStyle } from "../styles/styles";
var URL = require('url');


function ConstructOriginWhitelist(urlString){
  let parsedUrl = URL.parse(urlString);
  console.log(parsedUrl.protocol + "//" + parsedUrl.host + "/*");
  return [parsedUrl.protocol + "//" + parsedUrl.host + "*"];
}


export default function WebViewScreen({ route, navigation }) {
  const { styles } = useStyle("container");
  const { url, title, originWhitelist } = route.params;
  navigation.setOptions({ title: title })

  console.log(route.params)

  // var activeWhitelist = (originWhitelist === undefined) ? ConstructOriginWhitelist(url) : originWhitelist;
  var activeWhitelist = (originWhitelist === undefined) ? ["*"] : originWhitelist;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={styles.container}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        originWhitelist={activeWhitelist}
        mediaPlaybackRequiresUserAction={true}
      />
    </View>
  );
}
