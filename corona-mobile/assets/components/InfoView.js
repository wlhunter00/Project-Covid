import * as React from "react";
import { Text, View, TouchableHighlight, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles, defaults } from "../styles/styles";
import { PrimaryTextBold } from "./Texts";

export function InfoView({
  title,
  body,
  chevron
}) {
  return (
    <View style={styles.infoViewOuterView}>
      <View style={[styles.infoViewTitleView, {paddingLeft: 14.5}]}>
        <PrimaryTextBold text={title} padding={0} />
        {chevron
          ? <Entypo name='chevron-thin-right' style={styles.primaryTextBold}/>
          : <View/>
        }
      </View>
      <View style={styles.infoViewBodyView}>
        {body}
      </View>
    </View>
  );
}

