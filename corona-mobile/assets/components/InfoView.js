import * as React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import { SimpleButton } from "./Buttons.js";
import { useStyle } from "../styles/styles";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export function InfoView({ title, body, url }) {
  const navigation = useNavigation();

  const { styles } = useStyle(
    "boxContainer",
    "normalText",
    "divider",
    "bioText"
  );

  return (
    <View style={styles.boxContainer}>
      <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 2 }}>
          <Text style={[styles.normalText, { fontSize: 24 }]}>{title}</Text>
      </View>
      <View style={{ flex: 1 }}>
      {url && (
        <SimpleButton
          title="View Resource"
          action={() => {
            navigation.navigate("WebView", { title, url });
          }}
          hasChevron
        />
          )}
        </View>
        </View>
      <View style={[styles.divider, { marginVertical: 10 }]} />
      <View style={styles.bio}>{body}</View>
    </View>
  );
}
