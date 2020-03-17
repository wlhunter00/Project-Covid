import * as React from "react";
import { Text, View, TouchableHighlight, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "./../styles/styles";

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
    >
      <View style={styles.navButton}>
        {icon}
        <View style={{ marginLeft: 10 }}>
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
