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

export function EmbeddedPageButton({
  navigation,
  title,
  navigationName,
  icon,
  description,
}) {
  const { styles, colors } = useStyle( "navButtonTitle", "navButtonDescription", "embeddedNavButton");

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(navigationName);
      }}
    >
      <View style={styles.embeddedNavButton}>
        {icon}
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.navButtonTitle}>{title}</Text>
          <Text style={styles.navButtonDescription}>{description}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Entypo name="chevron-thin-right" color={colors.textcolor}/>
      </View>
    </TouchableOpacity>
  );
}

export function PageButton({
  navigation,
  title,
  navigationName,
  icon,
  description,
}) {
  const { styles, colors } = useStyle("navButton", "navButtonTitle", "navButtonDescription", "embeddedNavButton");

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate(navigationName);
      }}
      style={{ marginBottom: 15 }}
    >
      <View style={styles.navButton}>
        {icon}
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.navButtonTitle}>{title}</Text>
          <Text style={styles.navButtonDescription}>{description}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Entypo name="chevron-thin-right" color={colors.textcolor}/>
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
export function SimpleButton({ title, action, hasChevron }) {
  const { styles, colors } = useStyle("linkButtonTitle");

  return (
    <TouchableOpacity onPress={action} style={{flexDirection: "row", alignItems: "center"}}>
      <Text style={styles.linkButtonTitle}>{title}</Text>
      {hasChevron && <Entypo name="chevron-thin-right" color={colors.primarycolor} size={20}/>}
      
    </TouchableOpacity>
  );
}
