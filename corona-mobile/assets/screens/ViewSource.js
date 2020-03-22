import * as React from "react";
import {
  View,
  Linking
} from "react-native";
import { useStyle } from "../styles/styles";
import { WebView } from "react-native-webview";

export default function ViewSource({ route, navigation }) {
  const { styles } = useStyle("containerFull");
  
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
        style={{flex: 1}}
      />
    </View>
  );
}
