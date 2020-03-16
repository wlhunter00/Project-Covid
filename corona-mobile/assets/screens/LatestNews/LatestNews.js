import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function LatestNews({ navigation }) {
  const sites = [
    {
      title: "CNN",
      source: "https://www.cnn.com/search?size=10&q=coronavirus",
      imagesrc: require("./../../images/newsLogos/cnn.jpg")
    },
    {
      title: "BBC News",
      source: "https://www.bbc.com/news/explainers",
      imagesrc: require("./../../images/newsLogos/bbc.png")
    },
    {
      title: "New York Times",
      source: "https://www.nytimes.com/search?query=coronavirus",
      imagesrc: require("./../../images/newsLogos/nyt.jpg")
    },
    {
      title: "Aljazeera",
      source:
        "https://www.aljazeera.com/topics/events/coronavirus-outbreak.html",
      imagesrc: require("./../../images/newsLogos/alj.png")
    },
    {
      title: "Reuters",
      source: "https://www.reuters.com/search/news?blob=coronavirus",
      imagesrc: require("./../../images/newsLogos/Reuters.jpg")
    },
    {
      title: "CNBC",
      source:
        "https://www.cnbc.com/search/?query=coronavirus&qsearchterm=coronavirus",
      imagesrc: require("./../../images/newsLogos/cnbc.png")
    },
    {
      title: "WHO",
      source: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019",
      imagesrc: require("./../../images/newsLogos/who.png")
    },
    {
      title: "Sky News",
      source: "https://news.sky.com/topic/coronavirus-8483",
      imagesrc: require("./../../images/newsLogos/sky.jpg")
    }
  ];
  return (
    <View style={styles.container}>
      {sites.map(site => {
        return (
          <SiteButton site={site} key={site.title} navigation={navigation} />
        );
      })}
    </View>
  );
}

function SiteButton({ site, navigation }) {
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("NewsScreen", {
          site: site
        });
      }}
    >
      <View style={styles.siteButton}>
        <Image
          source={site.imagesrc}
          resizeMode="contain"
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <Text style={styles.siteTitle}>{site.title}</Text>
        <View style={{ flex: 1 }} />
        <Entypo name="chevron-thin-right" />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  siteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderBottomColor: "#c8c7cc",
    borderBottomWidth: 0.5
  },
  siteTitle: {
    fontSize: 18
  }
});
