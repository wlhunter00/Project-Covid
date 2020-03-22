import * as React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import { useStyle } from "../styles/styles";
import { PrimaryTextBold } from "./Texts";

export function InfoViewDiagnosis({ title, body }) {
  return (
    <View style={boxStyles.container}>
      <Text style={boxStyles.compactNameSmall}>{title}</Text>
      <View style={boxStyles.divider} />
      <View style={boxStyles.bio}>
        <Text>{body}</Text>
      </View>
    </View>
  );
}
