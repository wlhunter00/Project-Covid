import * as React from "react";
import {
  Text,
  View,
} from "react-native";
import { useStyle } from "../styles/styles";
import { StandardText } from "./Texts";

export function InfoViewDiagnosis({ title, body }) {
  const { styles } = useStyle("boxContainer", "normalText", "divider", "bioText", "surveyQuestionText");

  return (
    <View style={styles.boxContainer}>
      <StandardText fontSize={18}>{title}</StandardText>
      <View style={[styles.divider, {marginVertical: 10}]} />
      <View >
        <Text style={styles.bioText}>{body}</Text>
      </View>
    </View>
  );
}
