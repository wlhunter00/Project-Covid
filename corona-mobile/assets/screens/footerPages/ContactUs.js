import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useStyle } from "./../../styles/styles.js";
import { SourceItem } from "../../components/FooterComponents";
import { WebView } from "react-native-webview";
import { Entypo } from "@expo/vector-icons";
import BigHeaderScrollView from "../../components/BigHeaderScrollView.js";

export default function ContactUs({ route, navigation }) {
  const { styles, colors, isDark } = useStyle("container", "boxContainer", "subtitle");

  return (
    <View style={styles.container}>
      <BigHeaderScrollView title="Contact Us" description="Get in touch with us." image={
        <Entypo
          name="mail"
          size={100}
          color={!isDark ? colors.textcolor : "#444"} />
      }>
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scrollEnabled={false}
        source={{
          uri:
            "https://us19.list-manage.com/survey?u=31c07122a61d1793401ba033b&id=869072057c"
        }}
        style={{ flex: 1 }}
      />
      <View
        style={{
          marginTop: 10,
          marginRight: 10,
          marginLeft: 10,
          marginBottom: 40
        }}
      >
        <View style={[styles.boxContainer, { marginBottom: 20 }]}>
          <Text style={[styles.subtitle, { marginTop: 0 }]}>
            For app-related inquiries reach out to us at
            info@LFRinternational.org.
          </Text>
        </View>
        <View style={[styles.boxContainer, { marginBottom: 0 }]}>
          <Text style={[styles.subtitle, { marginTop: 0 }]}>
            For press inquiries please reach out to satvik@runawayapp.com.
          </Text>
        </View>
        </View>
      </BigHeaderScrollView>
    </View>
  );
}
