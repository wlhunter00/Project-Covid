
import * as React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { styles } from "./../../styles/styles.js";
import { linkButton } from '../../components/Buttons';
import { InfoView } from './../../components/InfoView';
import { SurveyButton } from '../../components/Buttons';


var symptoms = [];

var a;

export function Diagnosis({navigation, response}) {
  for(a in response){
    symptoms.push({title : response[a]["Symptom"], body : response[a]["Percentage"]});
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
      <linkButton  title = {"Information Toolkit"}  navigation = {navigation} navigationName = {"InformationToolkit"}/>
      <linkButton  title = {"Preventative Practices"}  navigation = {navigation} navigationName = {"PreventativePractices"}/>
      <Text>You can also find Local information on Covid-19 data, and find testing centers for help:</Text>
      <linkButton  title = {"Find Center"}  navigation = {navigation} navigationName = {"findcenter"}/>
    </ScrollView>
  );

}

