import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button } from "react-native";
import { Diagnosis } from "./Diagnosis.js";
import { Symptoms } from "./Symptoms.js";
import { defaults } from "./../../styles/styles.js";

export default function SymptomCheck({ navigation }) {
  const [backendResponse, changeBackendResponse] = React.useState("");
  const [surveyDone, changeSurveyDone] = React.useState(false);

  return (
    <View style={styles.container}>
      <Symptoms
        changeBackendResponse={changeBackendResponse}
        changeSurveyDone={changeSurveyDone}
      />
      {surveyDone && (
        <Diagnosis response={backendResponse} navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defaults.backgroundcolor
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
