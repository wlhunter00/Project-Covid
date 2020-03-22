import * as React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useStyle } from "./../../styles/styles.js";
import {
  SurveyNavigationButton,
  SurveyNavigationButtonLarge,
  SurveyButton
} from "../../components/Buttons";
import { InfoViewDiagnosis } from "./../../components/InfoViewDiagnosis";
import { SourceItem } from "../../components/FooterComponents";

var symptoms = [];

var a;

export function Diagnosis({ navigation, response, retakeSurvey }) {
  const { styles } = useStyle("sectionTitle", "container", "boxContainer", "surveyQuestionText");

  for (a in response) {
    if (response[a]["Percentage"]) {
      console.log(response[a]["Symptom"]);
      symptoms.push({
        title: response[a]["Symptom"],
        body: response[a]["Percentage"]
      });
    }
  }
  if (response == "") {
    symptoms = [];
  }
  return (
    <ScrollView>
      <Text style={[styles.sectionTitle, {textAlign: "center", marginLeft: 5}]}> Diagnosis Results</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {symptoms.map(symptom => {
          return (
            <View>
            <InfoViewDiagnosis
              title={symptom.title}
              body={
                symptom.body +
                "% of people who tested positive have this symptom."
              }
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={{ marginTop: 10, marginRight: 10, marginLeft: 10 }}>
        <View style={styles.boxContainer}>
          <Text style={styles.surveyQuestionText}>
            Based on your symptoms, we recommend utlizing the following
            knowledge resources:
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <SurveyNavigationButton
                title={"Info Toolkit"}
                navigation={navigation}
                navigationName={"InformationalToolkit"}
              />
            </View>
            <View style={{ flex: 1 }}>
              <SurveyNavigationButton
                title={"Prevention"}
                navigation={navigation}
                navigationName={"PreventativePractices"}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 10}}>
        <View style={styles.boxContainer}>
          <Text style={styles.surveyQuestionText}>
            You can also find local information on COVID-19 data, and find
            testing centers for help:
          </Text>
          <SurveyNavigationButtonLarge
            title={"Find Center"}
            navigation={navigation}
            navigationName={"TestingCenters"}
          />
        </View>
        <SurveyButton title="Retake Symptom Check" action={retakeSurvey} />
        <SourceItem
          navigation={navigation}
          typeSource={"Information Sources"}
          sourcesList={[
            {
              title: "World Health Organization",
              headline:
                "Report of the WHO-China Joint Mission on Coronavirus Disease 2019 (COVID-19)",
              url:
                "https://www.who.int/docs/default-source/coronaviruse/who-china-joint-mission-on-covid-19-final-report.pdf"
            }
          ]}
          key={"sourceList"}
        />
      </View>
    </ScrollView>
  );
}
