import * as React from "react";
import {
  Text,
  View,
} from "react-native";
import { useStyle } from "../styles/styles";
import { StandardText } from "./Texts";

export function InfoViewDiagnosis({ title, body, searchText }) {
  const { styles, colors } = useStyle("boxContainer", "normalText", "divider", "bioText", "surveyQuestionText");

  let formattedTitle;
  if (searchText) {
    const start = title.toLowerCase().indexOf(searchText.toLowerCase());
    const end = start + searchText.length;
    formattedTitle = (
      <Text>
        {title.substring(0, start)}
        <Text style={{ fontWeight: "bold", color: colors.primarycolor }}>{title.substring(start, end)}</Text>
        {title.substring(end)}
      </Text>
    );
  } else {
    formattedTitle = title;
  }

  return (
    <View style={styles.boxContainer}>
      <StandardText fontSize={18}>{formattedTitle}</StandardText>
      <View style={[styles.divider, {marginVertical: 10}]} />
      <View >
        <Text style={styles.bioText}>{body}</Text>
      </View>
    </View>
  );
}
