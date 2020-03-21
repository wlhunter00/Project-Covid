import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function StudentResources() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>StudentResources</Text>
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
