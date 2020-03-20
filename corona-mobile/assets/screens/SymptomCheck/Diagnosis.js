
import * as React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { styles } from "./../../styles/styles.js";
import { InfoView } from './../../components/InfoView';
import { SurveyButton } from '../../components/Buttons';


var symptoms = [];

export function Diagnosis({response}) {
  for(a in response){
    symptoms.push({title : "You've been experiencing " + a["Symptom"], body : "According to our cited WHO study "+ a["Percentage"] + "% of patients who tested positive for COVID-19 have experienced the same symptom"});
  }
    return (
    <ScrollView>
      <Text> Diagnosis Results</Text>
      <ScrollView style={styles.container}>
      {symptoms.map(symptom => {
        return (
          <InfoView title={symptom.title} body={symptom.body}  />
        );
      })}
    </ScrollView>
      <Text>Based on your symptoms, we reccomend utlizing the following knowledge resources:</Text>
      <Text>You can also find Local information on Covid-19 data, and find testing centers for help:</Text>
    </ScrollView>
  );

}

