import React, { useState } from "react";
import { StyleSheet, View, Image, Text, LayoutAnimation } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Hyperlink from "react-native-hyperlink";
import { defaults, styles, boxStyles } from "../styles/styles";
import { SimpleButton } from "./Buttons";
import { TouchableOpacity } from "react-native-gesture-handler";

export function TeamMemberBox({ image, profile }) {
  const { name, position, schoolAndYear, bio } = profile;
  const [bioExpanded, setBioExpanded] = useState(false);
  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setBioExpanded(!bioExpanded);
  };
  return (
    <View style={boxStyles.container}>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <View style={{ flexShrink: 1 }}>
          <Text style={boxStyles.compactName}>{name}</Text>
          <Text style={boxStyles.position}>{position}</Text>
          <Text style={boxStyles.school}>{schoolAndYear}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Image source={image} style={boxStyles.profileImages} />
      </View>
      <View style={boxStyles.divider} />
      <Text style={boxStyles.bio} numberOfLines={bioExpanded ? 0 : 2}>
        {bio}
      </Text>
      <View style={{ flexDirection: "row", marginTop: 6 }}>
        <View style={{ flex: 1 }} />
        <View style={{ backgroundColor: "white", paddingHorizontal: 3 }}>
          <SimpleButton
            title={bioExpanded ? "Show less" : "Show more"}
            action={toggleExpanded}
          />
        </View>
      </View>
    </View>
  );
}

export function CompactTeamMemberBox({ name, schoolAndYear, position }) {
  return (
    <View style={boxStyles.container}>
      <Text style={boxStyles.compactName}>{name}</Text>
      <Text style={boxStyles.position}>{position}</Text>
      <Text style={boxStyles.school}>{schoolAndYear}</Text>
    </View>
  );
}

export function FAQItem({ question, answer }) {
  const [expanded, setExpanded] = useState(false);
  const color = expanded ? "black" : "grey";
  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };
  return [
    <View
      style={{
        marginBottom: 8,
        padding: 15,
        backgroundColor: "white",
        shadowColor: "rgba(67, 160, 71, 0.2)",
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        borderRadius: 5
      }}
    >
      <TouchableOpacity onPress={toggleExpanded}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[boxStyles.questionText, { color: color }]}>
            {question}
          </Text>
          <View style={{ flex: 1 }} />
          <Ionicons
            name={expanded ? "ios-close" : "ios-add"}
            size={18}
            color={color}
          />
        </View>
      </TouchableOpacity>
      {expanded && (
        <Hyperlink linkDefault linkStyle={styles.linkButtonTitle}>
          <Text style={boxStyles.answerText}>{answer}</Text>
        </Hyperlink>
      )}
    </View>
  ];
}
