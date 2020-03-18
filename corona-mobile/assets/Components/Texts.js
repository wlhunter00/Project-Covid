import * as React from "react";
import { Text, View, TouchableHighlight, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles, defaults } from "../styles/styles";

export function PrimaryText({
  text
}) {
  return (
    <Text style={{color: defaults.primarycolor, padding: defaults.padding, paddingTop: 0}}>
      {text}
    </Text>
  );
}

export function PrimaryTextBold({
  text
}) {
  return (
    <Text style={{color: defaults.primarycolor, fontWeight: 'bold', padding: defaults.padding}}>
      {text}
    </Text>
  );
}

