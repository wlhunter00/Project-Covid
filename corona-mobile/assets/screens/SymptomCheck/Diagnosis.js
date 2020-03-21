
import * as React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { styles } from "./../../styles/styles.js";
import { SurveyNavigationButton } from '../../components/Buttons';
import { InfoViewDiagnosis } from './../../components/InfoViewDiagnosis';
import { SurveyButton } from '../../components/Buttons';


var symptoms = [];

var a;

export function Diagnosis({navigation, response}) {
  for(a in response){
    symptoms.push({title : response[a]["Symptom"], body : response[a]["Percentage"]});
  }
  if (response == "") {
    symptoms = [];
  }
    return (
    <ScrollView>
      <Text style={styles.title}> Diagnosis Results</Text>
      <ScrollView style={styles.container}>
        {symptoms.map(symptom => {
        return (
          <InfoViewDiagnosis title={symptom.title} body={symptom.body + "% of people who tested positive have this symptom."}  />
        );
      })}
    </ScrollView>
      <Text style={styles.surveyQuestionText}>Based on your symptoms, we reccomend utlizing the following knowledge resources:</Text>
      <SurveyNavigationButton  title = {"Information Toolkit"}  navigation = {navigation} navigationName = {"InformationToolkit"}/>
      <SurveyNavigationButton  title = {"Preventative Practices"}  navigation = {navigation} navigationName = {"PreventativePractices"}/>
      <Text style={styles.surveyQuestionText}>You can also find Local information on Covid-19 data, and find testing centers for help:</Text>
      <SurveyNavigationButton  title = {"Find Center"}  navigation = {navigation} navigationName = {"findcenter"}/>
    </ScrollView>
  );

}

