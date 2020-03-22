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

export function InfoView({ title, body }) {
  const { styles } = useStyle("boxContainer", "compactTeamMemberNameText", "divider", "bioText");

  return (
    <View style={styles.boxContainer}>
      <Text style={styles.compactTeamMemberNameText}>{title}</Text>
      <View style={[styles.divider, {marginVertical: 10}]} />
      <View style={styles.bio}>{body}</View>
    </View>
  );
}
