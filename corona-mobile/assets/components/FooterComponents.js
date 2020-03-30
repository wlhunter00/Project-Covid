import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Hyperlink from "react-native-hyperlink";
import { useStyle } from "../styles/styles";
import { SimpleButton } from "./Buttons";
import { StandardText } from "./Texts";

export function TeamMemberBox({ image, profile }) {
  const { styles } = useStyle("boxContainer", "positionText", "schoolText", "profileImages", "divider", "bioText");
  const { name, position, schoolAndYear, bio } = profile;
  const [bioExpanded, setBioExpanded] = useState(false);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setBioExpanded(!bioExpanded);
  };

  return (
    <View style={styles.boxContainer}>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <View style={{ flexShrink: 1 }}>
        <StandardText fontSize={24} isBold style={{marginBottom: 10}}>{name}</StandardText>
          <StandardText style={{marginBottom: 3}}>{position}</StandardText>
          <StandardText>{schoolAndYear}</StandardText>
        </View>
        <View style={{ flex: 1 }} />
        <Image source={image} style={styles.profileImages} />
      </View>
      <View style={styles.divider} />
      <View style={{ height: 10 }} />
      <StandardText numberOfLines={bioExpanded ? 0 : 2}>{bio}</StandardText>
      <View style={{ flexDirection: "row", marginTop: 6 }}>
        <View style={{ flex: 1 }} />
        <View style={{ paddingHorizontal: 3 }}>
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
  const { styles } = useStyle("boxContainer", "normalText", "positionText", "schoolText");
  return (
    <View style={styles.boxContainer}>
      <StandardText fontSize={21} isBold style={{marginBottom: 7}}>{name}</StandardText>
      <StandardText style={{marginBottom: 3}}>{position}</StandardText>
      <StandardText>{schoolAndYear}</StandardText>
    </View>
  );
}

export function FAQItem({ question, answer }) {
  const { styles, colors } = useStyle("questionText", "answerText", "expandableItem");

  const [expanded, setExpanded] = useState(false);
  const color = expanded ? colors.textcolor : colors.secondarytextcolor;
  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return [
    <View
      style={styles.expandableItem}
    >
      <TouchableOpacity onPress={toggleExpanded}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.questionText, { color: color }]}>
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
          <Text style={styles.answerText}>{answer}</Text>
        </Hyperlink>
      )}
    </View>
  ];
}

export function SourceItem({ navigation, typeSource, sourcesList }) {
  const { styles, colors } = useStyle("questionText", "answerText", "expandableItem");
  
  const [expanded, setExpanded] = useState(false);
  const color = expanded ? colors.textcolor : colors.secondarytextcolor;
  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return [
    <View style={styles.expandableItem} >
      <TouchableOpacity onPress={toggleExpanded}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.questionText, { color: color }]}>
            {typeSource}
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
        <React.Fragment>
          <View style={{height: 8}}/>
          {sourcesList.map(source => {
            return (
              <SourceLink
                url={source.url}
                title={source.title}
                headline={source.headline}
                key={source.url}
                navigation={navigation}
              />
            );
          })}
        </React.Fragment>
      )}
    </View>
  ];
}

export function SourceLink({ url, title, navigation, headline }) {
  const { styles } = useStyle("linkButtonTitle", "headerTextBold", "underlineText", "sourcesBox");

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ViewSource", {
          url: url
        });
      }}
      style={{ marginTop: 10 }}
    >
      <View style={styles.sourcesBox}>
          <Text style={styles.headerTextBold}>{title}</Text>
          <Text style={styles.underlineText}> {headline} </Text>
      </View>
    </TouchableOpacity>
  );
}
