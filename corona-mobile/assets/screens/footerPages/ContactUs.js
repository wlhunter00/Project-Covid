import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { defaults } from "./../../styles/styles.js";
import { SourceItem } from "../../components/FooterComponents";

export default function ContactUs({ route, navigation }) {
  return (
    <ScrollView
      style={{ backgroundColor: defaults.backgroundcolor }}
      contentContainerStyle={styles.container}
    >
      <Text> Contact Us </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
