import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableHighlight
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "../../styles/styles";
import { SiteButton } from "../../Components/Buttons";

export default function LatestNews({ navigation }) {
  const sites = [
    {
      title: "WHO",
      source: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019",
      imagesrc: require("./../../images/newsLogos/who.png")
    },
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
      title: "Sky News",
      source: "https://news.sky.com/topic/coronavirus-8483",
      imagesrc: require("./../../images/newsLogos/sky.jpg")
    },
    {
      title: "CDC",
      source: "https://www.cdc.gov/coronavirus/2019-ncov/whats-new-all.html",
      imagesrc: require("./../../images/newsLogos/cdc.png")
    }
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
<<<<<<< HEAD


=======
>>>>>>> 47472ba4b124451ca3c9c11133240b38d6bc4303
