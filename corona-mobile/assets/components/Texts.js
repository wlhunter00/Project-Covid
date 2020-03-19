import * as React from "react";
import { Text, View, TouchableHighlight, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles, defaults } from "../styles/styles";

export function PrimaryText({
  text,
  padding
}) {
  return (
    <View style={{padding: padding, paddingTop: 0}}>
      <Text style={styles.primaryText}>
        {text}
      </Text>
    </View>
  );
}

export function PrimaryTextBold({
  text,
  padding
}) {
  return (
    <View style={{padding: padding}}>
      <Text style={styles.primaryTextBold}>
        {text}
      </Text>
    </View>
  );
}

