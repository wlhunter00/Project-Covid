import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button } from "react-native";
import { Diagnosis } from "./Diagnosis.js";
import { Symptoms } from "./Symptoms.js";
import { useStyle } from "./../../styles/styles.js";
import { SurveyButton } from '../../components/Buttons';
import { boxStyles } from './../../styles/styles'

export default function SymptomCheck({ navigation }) {
  const { styles } = useStyle("container");

  const [backendResponse, changeBackendResponse] = React.useState("");
  const [surveyDone, changeSurveyDone] = React.useState(false);
  const [reset, changeReset] = React.useState(false);
  const [instanceKey, setInstanceKey] = React.useState(0);

  const retakeSurvey = () => {
    changeSurveyDone(false);
    changeBackendResponse("");
    setInstanceKey(i => i + 1);
  }

  return (
    <View style={[styles.container, {padding: 10}]}>
      <Symptoms
        key={instanceKey}
        changeBackendResponse={changeBackendResponse}
        changeSurveyDone={changeSurveyDone}
      />
      {surveyDone && (
        <View style={{flex: 1, padding: 0}}>
          <Diagnosis key={instanceKey} navigation={navigation} response={backendResponse} retakeSurvey={retakeSurvey}/>
        </View>
      )}
    </View>
  );
}