import * as React from "react";
import { StyleSheet, Text, View, Button, ScrollView, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useStyle } from "./../../styles/styles.js";
import { ActionButton } from "../../components/Buttons";
import { InfoViewDiagnosis } from "./../../components/InfoViewDiagnosis";
import { SourceItem } from "../../components/FooterComponents";
import { ResponseTextBox } from "../../components/TextBoxes";



export function Diagnosis({ navigation, response }) {
  const { styles } = useStyle("sectionTitle", "container", "boxContainer", "surveyQuestionText", "scrollViewContent", "compactNameSmall");
  const [searched, changeSearched] = React.useState([]);
  const [firstSet, changeFirst] = React.useState(true);

  

  if (firstSet && response !== "") {
    changeFirst(false);
    changeSearched(response);
  }

  const setSearched = React.useCallback(event => {
    if (typeof event.target == 'undefined' || event.nativeEvent.text.trim() == "") {
      if (response !== "") {
        changeSearched(response);
      }
    }
    else if (typeof event.target != 'undefined') {
      if (response !== "") {
        changeSearched(response.filter(symptom => symptom.title.includes(event.nativeEvent.text)));
      }
      }
      event.persist();
    },
    [response]
  );

  

  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      <Text style={[styles.sectionTitle, { textAlign: "center", marginTop: 20 }]}>Symptoms</Text>

      <View style={styles.boxContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
          <Text style={[styles.compactNameSmall, {textAlignVertical:'center', alignSelf:'center'}]}>Search:</Text>
          <View style={{flex: 1, width: 100}}>
          <ResponseTextBox
            defaultText={""}
            changeFunction={setSearched}
            />
          </View>
        </View>
      
      </View>
      
      <FlatList
        data={searched}
        renderItem={({ item }) => (
          <InfoViewDiagnosis
            title={item.title}
            body={
              item.body +
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
