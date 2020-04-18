import * as React from "react";
import {
  Text,
  View,
} from "react-native";
import { SimpleButton } from "./Buttons.js";
import { useStyle } from "../styles/styles";
import { StandardText } from "./Texts.js";


export function InfoView({ title, details, url, navigation }) {
  const { styles, colors } = useStyle(
    "boxContainer",
    "normalText",
    "divider",
    "resourceText"
  );

  return (
    <View style={styles.boxContainer}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 2 }}>
          <Text style={[styles.normalText, { fontSize: 24 }]}>{title}</Text>
        </View>
        {url && (
          <View style={{
            flex: 1, alignItems: "flex-end", justifyContent: 'center'
          }}>
            <SimpleButton
              title="Resource"
              action={() => {
                navigation.navigate("WebView", { title, url });
              }}
              hasChevron
            />
          </View>
        )}
      </View>
      <View style={[styles.divider, { marginVertical: 10 }]} />
      {
        details.map((text, index) => (
          <StandardText style={styles.resourceText}>{text}</StandardText>
        ))  
      }
    </View>
  );
}
