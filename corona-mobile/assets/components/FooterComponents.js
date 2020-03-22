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

export function TeamMemberBox({ image, profile }) {
  const { styles } = useStyle("boxContainer", "compactTeamMemberNameText", "positionText", "schoolText", "profileImages", "divider", "bioText");
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
          <Text style={styles.compactTeamMemberNameText}>{name}</Text>
          <Text style={styles.positionText}>{position}</Text>
          <Text style={styles.schoolText}>{schoolAndYear}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Image source={image} style={styles.profileImages} />
      </View>
      <View style={styles.divider} />
      <View style={{height: 10}}/>
      <Text style={styles.bioText} numberOfLines={bioExpanded ? 0 : 2}>
        {bio}
      </Text>
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
  const { styles } = useStyle("boxContainer", "compactTeamMemberNameText", "positionText", "schoolText");
  return (
    <View style={styles.boxContainer}>
      <Text style={styles.compactTeamMemberNameText}>{name}</Text>
      <Text style={styles.positionText}>{position}</Text>
      <Text style={styles.schoolText}>{schoolAndYear}</Text>
    </View>
  );
}

export function FAQItem({ question, answer }) {
  const { styles } = useStyle("questionText", "answerText");

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
  const { styles } = useStyle("questionText", "answerText");

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
          {sourcesList.map(source => {
            return (
              <SourceLink
                url={source.url}
                title={source.title}
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

export function SourceLink({ url, title, navigation }) {
  const { styles } = useStyle("linkButtonText");

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ViewSource", {
          url: url
        });
      }}
      style={{ marginTop: 10 }}
    >
      <Text style={styles.linkButtonTitle}>{title}</Text>
    </TouchableOpacity>
  );
}
