import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button } from "react-native";
import { Diagnosis } from "./Diagnosis.js";
import { useStyle } from "./../../styles/styles.js";
import { getSymptoms } from './../../APIService.js';


export default function SymptomCheck({ navigation }) {
  const { styles } = useStyle("container");

  const [backendResponse, changeBackendResponse] = React.useState("");
  const [parResp, changeParResp] = React.useState("");
  const [instanceKey, setInstanceKey] = React.useState(0);
  const [firstSet, changeFirst] = React.useState(true);


  React.useEffect(() => {
    getSymptoms(changeBackendResponse);
  }, []);
  
  if (firstSet && backendResponse !== "") {
    changeFirst(false);
    let sympt = [];
    for (var a in backendResponse) {
      if (backendResponse[a]["Percentage"]) {
        sympt.push({
          title: backendResponse[a]["Symptom"],
          body: backendResponse[a]["Percentage"]
        });
      }
    }
    changeParResp(sympt);
  }

  return (
    <View style={styles.container}>
        <Diagnosis key={instanceKey} navigation={navigation} response={parResp} />
    </View>
  );
}