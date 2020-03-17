import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button } from "react-native";
import { WebView } from "react-native-webview";

export default function TrackerStatus({ route, navigation }) {
  const { symptoms } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        source={{
          html:
            '<iframe style="width:100%"; width="500" height="500" src="https://coronavirus.app/map?embed=true" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        }}
        style={styles.webView}
      />
      <Text> Hi </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  webView: {
    marginTop: 20,
    maxHeight: 200,
    width: 320,
    flex: 1
  }
});
