import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking
} from "react-native";
import { ActionButton } from "../../components/Buttons";
import { styles } from "../../styles/styles";
import { WebView } from "react-native-webview";

export default function CenterFinder({ route, navigation }) {
  const openUrl = () => {
    Linking.canOpenURL(route.params.url).then(canOpen => {
      if (canOpen) {
        Linking.openURL(route.params.url);
      }
    });
  };

  return (
    <View style={styles.containerFull}>
      <WebView
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        source={{
          uri: route.params.url
        }}
        style={styles.webView}
      />
    </View>
  );
}
