import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { defaults } from "./../../styles/styles.js";
import { SourceItem } from "../../components/FooterComponents";

export default function Sources({ route, navigation }) {
  return (
    <ScrollView
      style={{ backgroundColor: defaults.backgroundcolor }}
      contentContainerStyle={styles.container}
    >
      <SourceItem question="Research Journals" answer={"TBD"} key="1" />
      <SourceItem question="Health Organizations" answer={"WHO"} key="2" />
      <SourceItem question="News Outlets" answer={"CNN"} key="3" />
      <SourceItem question="Government Agencies" answer={"CDC"} key="4" />
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
