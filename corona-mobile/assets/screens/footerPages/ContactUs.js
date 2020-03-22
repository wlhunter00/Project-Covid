import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useStyle } from "./../../styles/styles.js";
import { SourceItem } from "../../components/FooterComponents";
import { WebView } from "react-native-webview";


export default function ContactUs({ route, navigation }) {
  const { styles } = useStyle("container", "boxContainer", "subtitle");

  // return (
  //   <View
  //     style={{ backgroundColor: defaults.backgroundcolor }}
  //     contentContainerStyle={styles.container}
  //   >
  //     <Text style={styles.header}> Contact Us </Text>
  //     <View style={{ marginTop: 10, marginRight: 10, marginLeft: 10 }}>
  //       <View style={boxStyles.container}>
  //         <WebView
  //           javaScriptEnabled={true}
  //           domStorageEnabled={true}
  //           startInLoadingState={true}
  //           source={{
  //           uri: "https://us19.list-manage.com/survey?u=31c07122a61d1793401ba033b&id=869072057c"
  //         }}
  //         style={styles.webView}
  //         />
  //       </View>
  //     </View>
  //     <Text style={styles.subtitle}>Also feel free to reach out to us at satvik@runawayapp.com.</Text>
  //   </View>
  // );
  return (
    <View style={styles.container}>
    <WebView
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      scrollEnabled={false}
      source={{
        uri: "https://us19.list-manage.com/survey?u=31c07122a61d1793401ba033b&id=869072057c"
      }}
      style={{flex: 1}}
      />
    <View style={{ marginTop: 10, marginRight: 10, marginLeft: 10, marginBottom: 40 }}>
    <View style={styles.boxContainer}>
        <Text style={styles.subtitle}>Also feel free to reach out to us at satvik@runawayapp.com.</Text>
    </View>
    </View>
  </View>
  );
}
