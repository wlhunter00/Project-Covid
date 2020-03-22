import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { AntDesign } from "@expo/vector-icons"

export default function TrackerStatus({ route, navigation }) {
  let webview;
  const reload = () => {
    webview && webview.reload();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={reload}>
          <AntDesign name="reload1" color="white" size={20} style={{marginRight: 20}}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation, reload]);

  return (
    <View style={localStyles.container}>
      <WebView
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        source={{
          uri: "https://coronavirus.app/map?embed=true"
        }}
        style={{flex:1}}
        ref={r => { webview = r }}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  },
});
