import * as React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useStyle } from "../styles/styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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

export function ImageButton({ title, source, body, navigation }){
  

  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round((dimensions.width * 3) / 4);
  const imageWidth = dimensions.width;

  return (
    <TouchableWithoutFeedback 
      style={localStyles.header} 
      onPress={() => {navigation.navigate("ResourceTopic", {
          title: title,
          source: source,
          body: body
        })}
      }
    >
      <ImageBackground
        source={source}
        style={[
          {
            width: imageWidth * 0.9,
            height: imageHeight
          },
          localStyles.headerImage
        ]}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={[
            { top: imageHeight - 45 },
            localStyles.headerText
          ]}
        >
          {title}
        </Text>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}





const localStyles = StyleSheet.create({
  header: {
    padding: 0,
    marginBottom: 5,
    borderRadius: 50,
    borderBottomRightRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    padding: 10,
    paddingTop: 0,
    borderRadius: 5,
    marginBottom: 10
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    position: "relative",
    left: 9,
    textShadowColor: "black",
    textShadowRadius: 2
  },
  headerImage: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    overflow: "hidden",
    resizeMode: "cover",
    borderRadius: 5
  }
});
