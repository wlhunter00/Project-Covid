import * as React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useStyle } from "../styles/styles";

export function PageButton({
  navigation,
  title,
  navigationName,
  icon,
  description
}) {
  const { styles } = useStyle("navButton", "navButtonTitle", "navButtonDescription");
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate(navigationName);
      }}
      style={{ marginBottom: 6 }}
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
  const { styles } = useStyle("navButton", "navButtonTitle");
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("NewsScreen", {
          site: site
        });
      }}
      style={{ marginBottom: 6 }}
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

export function VisitButton({ site, navigation, style }) {
  const { styles } = useStyle("actionButton", "actionButtonTitle");
  return (
    <TouchableOpacity 
      onPress={() => {
        navigation.navigate("LFRSite", {
          site: site
        });
      }}
      style={[styles.actionButton, style]}>
      <View>
        <Text style={styles.actionButtonTitle}>{site.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function ActionButton({ title, action, style }) {
  const { styles } = useStyle("actionButton", "actionButtonTitle");
  return (
    <TouchableOpacity onPress={action} style={[styles.actionButton, style]}>
      <View>
        <Text style={styles.actionButtonTitle}>{title}</Text>
        </View>
    </TouchableOpacity>
  );
}
// A simple button that's styled like a hyperlink
export function SimpleButton({ title, action }) {
  const { styles } = useStyle("linkButtonTitle");

  return (
    <TouchableOpacity onPress={action} >
      <Text style={styles.linkButtonTitle}>{title}</Text>
    </TouchableOpacity>
  );
}
