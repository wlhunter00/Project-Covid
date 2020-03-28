import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useStyle } from "./../../styles/styles.js";
import { SourceItem } from "../../components/FooterComponents";

export default function AboutLFR({ route, navigation }) {
  const { styles, colors } = useStyle("container");
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.backgroundcolor }]}
    >
      <Text> About LFR </Text>
    </ScrollView>
  );
}
