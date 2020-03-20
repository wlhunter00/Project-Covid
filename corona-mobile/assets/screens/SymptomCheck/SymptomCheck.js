import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button } from "react-native";
import { Diagnosis } from "./Diagnosis.js";
import { Symptoms } from "./Symptoms.js";

export default function SymptomCheck({ navigation }) {
  const [backendResponse, changeBackendResponse] = React.useState("");

  return (
    <View style={styles.container}>
      <Symptoms changeBackendResponse={changeBackendResponse}/>
      <Diagnosis backendResponse={backendResponse}/>
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
