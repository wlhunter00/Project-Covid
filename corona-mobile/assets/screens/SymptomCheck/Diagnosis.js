import React, { useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, FlatList } from "react-native";
import { useStyle } from "./../../styles/styles.js";
import { ActionButton } from "../../components/Buttons";
import { InfoViewDiagnosis } from "./../../components/InfoViewDiagnosis";
import { SourceItem } from "../../components/FooterComponents";
import { ResponseTextBox } from "../../components/TextBoxes";
import { getSymptoms } from "../../APIService.js";

const symptomData = require("../");


export function Diagnosis({ navigation }) {
  const { styles } = useStyle("sectionTitle", "container", "boxContainer", "surveyQuestionText", "scrollViewContent", "compactNameSmall");

  const [allSymptoms, setAllSymptoms] = useState([]);
  const [currentSearchQuery, setSearchQuery] = useState("");
  const [errorLoading, setErrorLoading] = useState(null);

  // Load the symptoms
  // React.useEffect(() => {
  //   const fetchSymptoms = async () => {
  //     const resp = await getSymptoms();
  //     console.log(resp);
  //     if (!resp.errorMessage) {
  //       setAllSymptoms(resp);
  //     } else {
  //       console.log(resp.errorMessage);
  //       setErrorLoading(resp.errorMessage);
  //     }
  //   }

  //   fetchSymptoms()
  // }, [])

  // Load the symptoms
  React.useEffect(() => {
    setAllSymptoms(symptomData);
  },[])

  const isSearching = currentSearchQuery && currentSearchQuery === ""
  
  const symptomsToDisplay = !isSearching ? allSymptoms : allSymptoms.filter(symptom => symptom.title.includes(currentSearchQuery));

  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      <Text style={[styles.sectionTitle, { textAlign: "center", marginTop: 20 }]}>Symptoms</Text>

      <View style={styles.boxContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
          <Text style={[styles.compactNameSmall, {textAlignVertical:'center', alignSelf:'center'}]}>Search:</Text>
          <View style={{flex: 1, width: 100, alignSelf: 'center', justifyContent: 'center'}}>
          <ResponseTextBox
              defaultText={""}
              onChangeText={(value) => {
                setSearchQuery(value);
              }}
            />
          </View>
        </View>
      
      </View>
      
      <FlatList
        data={allSymptoms}
        renderItem={({ item }) => (
          <InfoViewDiagnosis
            title={item.Symptom}
            body={
              item.Percentage +
              "% of people who tested positive have this symptom."
            }
          />
        )}
      />
      <View style={styles.boxContainer}>
        <Text style={styles.surveyQuestionText}>
          You can find local information on COVID-19 data and 
          testing centers here:
          </Text>
        <View style={{ height: 10 }} />
        <ActionButton
          title={"Find Center"}
          action={() => navigation.navigate("Testing")}
        style={{marginHorizontal: 10}}
        />
      </View>
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
    </ScrollView>
  );
}
