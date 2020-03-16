import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Panel from "./Panel";

export default function PreventativePractices() {
  return (
    <View style={styles.container}>
      <Panel title="This is the title">
        <Text>This is the text that goes inside</Text>
      </Panel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
