import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { Entypo } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

export default function TrackerStatus({ route, navigation }) {
  let webview;
  const reload = () => {
    webview && webview.reload();
    navigation.na;
  };

  React.useEffect(() => {
    Toast.show(
      "Disclaimer: Any ads or donation links on this page are not affiliated with Project Covid.",
      {
        duration: Toast.durations.LONG,
        backgroundColor: "#43a047",
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        position: -100,
      }
    );
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={reload} style={{ marginRight: 20 }}>
          <Entypo name={"ccw"} size={25} color={"white"} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Sources", {
              initiallyOpenedSourceType: "Live Tracker",
            });
          }}
          style={{ marginLeft: 20, marginTop: 0 }}
        >
          <Text style={{ color: "white", fontSize: 17 }}>Sources</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, reload]);

  const INJECTED_JAVASCRIPT = `
        function cssEngine(rule) {
          var css = document.createElement('style'); // Creates <style></style>
          css.type = 'text/css'; // Specifies the type
          if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
          else css.appendChild(document.createTextNode(rule)); // Support for the rest
          document.getElementsByTagName("head")[0].appendChild(css); // Specifies where to place the css
        };

        var cssRules = 'buttons.action-buttons-share, button.donate-btn, div.header-logo, div.header-powered, div.header-legalese, div.action-buttons, div.coffee-banner  { display: none !important;}';

        cssEngine(cssRules);
        true;
  `;

  return (
    <View style={localStyles.container}>
      <WebView
        originWhitelist={["https://coronavirus.app", "https://crnvr.us"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        source={{
          uri: "https://crnvr.us/map",
        }}
        style={{ flex: 1 }}
        ref={(r) => { webview = r; }}
        injectedJavaScript={INJECTED_JAVASCRIPT}

        onMessage={(event) => {
          console.log(event.nativeEvent.data);
        }}
        onError={console.error.bind(console, 'error')}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#F5FCFF",
  },
});
