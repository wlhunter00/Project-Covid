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
      <SourceItem
        navigation={navigation}
        typeSource={"Research Journals"}
        sourcesList={["https://www.who.int/", "https://www.google.com/"]}
        key={"researchJourn"}
      />
      <SourceItem
        navigation={navigation}
        typeSource={"Health Organizations"}
        sourcesList={["https://www.who.int/", "https://www.google.com/"]}
        key={"healthOrg"}
      />
      <SourceItem
        navigation={navigation}
        typeSource={"News Outlet"}
        sourcesList={["https://www.who.int/", "https://www.google.com/"]}
        key={"newsOut"}
      />
      <SourceItem
        navigation={navigation}
        typeSource={"Government Agencies"}
        sourcesList={["https://www.who.int/", "https://www.google.com/"]}
        key={"govAgen"}
      />
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
