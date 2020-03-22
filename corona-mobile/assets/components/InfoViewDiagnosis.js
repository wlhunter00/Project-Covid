import * as React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import { styles, defaults, boxStyles } from "../styles/styles";
import { PrimaryTextBold } from "./Texts";

export function InfoViewDiagnosis({ title, body }) {
  return (
    <View style={boxStyles.container}>
      <Text style={boxStyles.compactName}>{title}</Text>
      <View style={boxStyles.divider} />
      <View style={boxStyles.bio}>
        <Text>{body}</Text>
      </View>
    </View>
  );
}
