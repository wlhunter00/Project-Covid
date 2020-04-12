import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList
} from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { FontAwesome } from "@expo/vector-icons";

import { useStyle } from "../../styles/styles.js";
import { ActionButton } from "../../components/Buttons";
import { InfoViewDiagnosis } from "../../components/InfoViewDiagnosis";
import { SourceItem } from "../../components/FooterComponents";
import { StandardTextBox } from "../../components/TextBoxes";
import { StandardText } from "../../components/Texts.js";
import BigHeaderScrollView from "../../components/BigHeaderScrollView.js";

const symptomData = require("../../Symptom-Percentages.json");

export function SymptomsList({ navigation }) {
  const { styles, colors, isDark } = useStyle(
    "sectionTitle",
    "container",
    "boxContainer",
    "surveyQuestionText",
    "scrollViewContent",
    "compactNameSmall",
    "divider"
  );

  const [allSymptoms, setAllSymptoms] = useState([]);
  const [currentSearchQuery, setSearchQuery] = useState("");

  // Load the symptoms
  React.useEffect(() => {
    const symptoms = symptomData.map(symptom => ({
      title: symptom.Symptom,
      percentage: symptom.Percentage
    }));
    setAllSymptoms(symptoms);
  }, []);

  const isSearching = currentSearchQuery && currentSearchQuery !== "";

  const symptomsToDisplay = !isSearching
    ? allSymptoms
    : allSymptoms.filter(symptom =>
        symptom.title.toLowerCase().includes(currentSearchQuery.toLowerCase())
      );

  return (
    <View style={[styles.container]}>
      <BigHeaderScrollView title="Symptoms" description="The most common symptoms of COVID-19, and how prevalent they are." image={
        <FontAwesome
          name="stethoscope"
          size={100}
          color={!isDark ? colors.textcolor : "#444"}
        />
        }>
        <View style={styles.boxContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={styles.compactNameSmall}>Search:</Text>
            <View style={{ flex: 1 }}>
              <StandardTextBox
                defaultText={""}
                onChangeText={value => {
                  setSearchQuery(value);
                }}
                value={currentSearchQuery}
              />
            </View>
          </View>
        </View>
        {symptomsToDisplay.map(symptom => (
          <InfoViewDiagnosis
            title={symptom.title}
            body={
              symptom.percentage +
              "% of people who tested positive have this symptom."
            }
            searchText={currentSearchQuery}
            key={symptom.title}
          />
        ))}
        <StandardText
          style={{ textAlign: "right", color: colors.secondarytextcolor }}
        >
          {symptomsToDisplay.length} item(s) found
        </StandardText>
        <View style={{ height: 70 }} />
        <View style={styles.boxContainer}>
          <Text style={styles.surveyQuestionText}>
            You can find local information on COVID-19 data and testing centers
            here:
          </Text>
          <View style={{ height: 10 }} />
          <ActionButton
            title={"Find Center"}
            action={() => navigation.navigate("Testing")}
            style={{ marginHorizontal: 10 }}
          />
        </View>
        <SourceItem
          navigation={navigation}
          typeSource={"Sources"}
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
        <View style={{ height: 7 }} />
      </BigHeaderScrollView>
    </View>
  );
}
