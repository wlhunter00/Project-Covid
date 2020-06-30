import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { Entypo } from "@expo/vector-icons";

export default function TrackerStatus({ route, navigation }) {
  let webview;
  const reload = () => {
    // webview && webview.reload();
    navigation.na
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={reload} style={{marginRight: 20}}>
          <Entypo name={"ccw"} size={25} color={"white"} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity  style={{marginLeft: 20, marginTop: 0}}>
          <Text style={{color: "white", fontSize: 17}}>Sources</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation, reload]);

  return (
    <View style={localStyles.container}>
      <WebView
        originWhitelist={["https://coronavirus.app", "https://crnvr.us"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        source={{
          uri: "https://crnvr.us/map"
        }}
        style={{ flex: 1 }}
        ref={r => {
          webview = r;
        }}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  }
});
