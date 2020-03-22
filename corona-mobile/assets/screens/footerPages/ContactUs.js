import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useStyle } from "./../../styles/styles.js";
import { SourceItem } from "../../components/FooterComponents";

export default function ContactUs({ route, navigation }) {
  const { styles } = useStyle();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.container}
    >
      <Text> Contact Us </Text>
    </ScrollView>
  );
}

