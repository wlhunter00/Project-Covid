import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { PageButton } from "./../../components/Buttons";
import { useStyle } from "./../../styles/styles";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default function GlobalResourcesMain({ navigation }) {
  const { styles, colors } = useStyle("container");
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.backgroundcolor }]}
      contentContainerStyle={{ padding: 15 }}
    >
      <PageButton
        title="Informational Toolkit"
        navigationName="InformationalToolkit"
        icon={
          <MaterialCommunityIcons
            name="toolbox"
            size={25}
            color={colors.textcolor}
          />
        }
        description="All you need to know about COVID-19"
        navigation={navigation}
      />
      <PageButton
        title="Symptoms"
        navigationName="Symptoms"
        icon={
          <FontAwesome name="stethoscope" size={25} color={colors.textcolor} />
        }
        description="Learn about the symptoms of the virus."
        navigation={navigation}
      />
      <PageButton
        title="Preventative Practices"
        navigationName="PreventativePractices"
        icon={
          <MaterialIcons name="healing" size={25} color={colors.textcolor} />
        }
        description="Tips for to stay healthy"
        navigation={navigation}
      />

      <PageButton
        title="Mental Health"
        navigationName="MentalHealth"
        icon={<FontAwesome name="heart" size={25} color={colors.textcolor} />}
        description="Information for a healthy mindset"
        navigation={navigation}
      />
      <PageButton
        title="General Resources"
        navigationName="StudentResources"
        icon={
          <FontAwesome5
            name="hands-helping"
            size={25}
            color={colors.textcolor}
          />
        }
        description="Other useful resources to consider"
        navigation={navigation}
      />
    </ScrollView>
  );
}
