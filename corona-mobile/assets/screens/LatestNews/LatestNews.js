import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useStyle } from "../../styles/styles";
import { SiteButton } from "../../components/Buttons";

export default function LatestNews({ navigation }) {
  const { styles } = useStyle("container");
  const sites = [
    {
      title: "CDC",
      source: "https://www.cdc.gov/coronavirus/2019-ncov/whats-new-all.html",
      imagesrc: require("./../../images/newsLogos/cdc.png")
    },
    {
      title: "WHO",
      source: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019",
      imagesrc: require("./../../images/newsLogos/who.png")
    },
    // {
    //   title: "CNN",
    //   source: "https://www.cnn.com/search?size=10&q=coronavirus",
    //   imagesrc: require("./../../images/newsLogos/cnn.jpg")
    // },
    {
      title: "Associated Press",
      source: "https://apnews.com/VirusOutbreak",
      imagesrc: require("./../../images/newsLogos/ap.png")
    },
    {
      title: "BBC News",
      source: "https://www.bbc.com/news/explainers",
      imagesrc: require("./../../images/newsLogos/bbc.png")
    },
    {
      title: "National Public Radio",
      source: "https://www.npr.org/series/812054919/the-coronavirus-crisis",
      imagesrc: require("./../../images/newsLogos/npr.png")
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
      title: "New York Times",
      source: "https://www.nytimes.com/search?query=coronavirus",
      imagesrc: require("./../../images/newsLogos/nyt.jpg")
    },
    {
      title: "Bloomberg",
      source: "https://www.bloomberg.com/",
      imagesrc: require("./../../images/newsLogos/bloom.jpg")
    }
    // {
    //   title: "CNBC",
    //   source:
    //     "https://www.cnbc.com/search/?query=coronavirus&qsearchterm=coronavirus",
    //   imagesrc: require("./../../images/newsLogos/cnbc.png")
    // },
    // {
    //   title: "Sky News",
    //   source: "https://news.sky.com/topic/coronavirus-8483",
    //   imagesrc: require("./../../images/newsLogos/sky.png")
    // },
  ];
  return (
    <ScrollView style={styles.container}>
      {sites.map(site => {
        return (
          <SiteButton site={site} key={site.title} navigation={navigation} />
        );
      })}
    </ScrollView>
  );
}
