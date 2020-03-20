import * as React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import { styles } from "../styles/styles";

export function PageButton({
  navigation,
  title,
  navigationName,
  icon,
  description
}) {
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate(navigationName);
      }}
      style={{ marginBottom: 5 }}
    >
      <View style={styles.navButton}>
        {icon}
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.navButtonTitle}>{title}</Text>
          <Text style={styles.navButtonDescription}>{description}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Entypo name="chevron-thin-right" />
      </View>
    </TouchableHighlight>
  );
}

export function SiteButton({ site, navigation }) {
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("NewsScreen", {
          site: site
        });
      }}
    >
      <View style={styles.navButton}>
        <Image
          source={site.imagesrc}
          resizeMode="contain"
          style={{ width: 50, height: 50, marginRight: 20 }}
        />
        <Text style={styles.navButtonTitle}>{site.title}</Text>
        <View style={{ flex: 1 }} />
        <Entypo name="chevron-thin-right" />
      </View>
    </TouchableHighlight>
  );
}

export function ActionButton({ title, action }) {
  return (
    <TouchableOpacity onPress={action} style={styles.actionButton}>
      <View>
        <Text style={styles.actionButtonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function SurveyButton({ title, action }) {
  return (
    <TouchableOpacity onPress={action} style={styles.surveyButton}>
      <View>
        <Text style={styles.surveyButtonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
export function SurveyNavigationButton({ title, navigation, navigationName }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(navigationName);
      }}
    >
      <View>
        <Text style={styles.surveyButtonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
  // A simple button that's styled like a hyperlink
export function SimpleButton({ title, action }) {
  return (
    <TouchableOpacity onPress={action}>
      <Text style={styles.linkButtonTitle}>{title}</Text>
    </TouchableOpacity>
  );
}
