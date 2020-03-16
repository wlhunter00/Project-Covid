import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function LatestNews({ navigation }) {
  const sites = [
    {
      title: "CNN",
      source:
        "https://www.cnn.com/world/live-news/coronavirus-outbreak-03-16-20-intl-hnk/index.html"
    },
    { title: "BBC", source: "https://www.bbc.com/news/explainers" },
    {
      title: "New York Times",
      source: "https://www.nytimes.com/search?query=coronavirus"
    },
    {
      title: "Aljazeera",
      source: "https://www.aljazeera.com/Search/?q=coronavirus"
    },
    {
      title: "Reuters",
      source: "https://www.reuters.com/search/news?blob=coronavirus"
    },
    {
      title: "CNBC",
      source:
        "https://www.cnbc.com/search/?query=coronavirus&qsearchterm=coronavirus"
    },
    {
      title: "WHO",
      source:
        "https://www.who.int/news-room/detail/search-results?indexCatalogue=genericsearchindex1&searchQuery=coronavirus&wordsMode=AllWords"
    },
    { title: "Sky News", source: "https://news.sky.com/topic/coronavirus-8483" }
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
