import * as React from "react";
import {
  Text,
  View,
} from "react-native";
import { useStyle } from "../styles/styles";

export function InfoViewDiagnosis({ title, body }) {
  const { styles } = useStyle("boxContainer", "compactNameSmall", "divider", "bioText", "surveyQuestionText");

  return (
    <View style={styles.boxContainer}>
      <Text style={styles.compactNameSmall}>{title}</Text>
      <View style={[styles.divider, {marginVertical: 10}]} />
      <View >
        <Text style={styles.bioText}>{body}</Text>
      </View>
    </View>
  );
}
