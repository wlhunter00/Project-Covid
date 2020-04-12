import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo
} from "@expo/vector-icons";
import { useStyle } from "../styles/styles";
import {
  PageButton,
  SimpleButton,
  EmbeddedPageButton
} from "../components/Buttons";
import { StandardText } from "../components/Texts";
import { getTopNews, getLatestStats } from "../utils/APIService";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import BigHeaderScrollView from "./../components/BigHeaderScrollView";

import {
  Section,
  ErrorBox,
  StatsView,
  NewsArticle
} from "../components/HomePageComponents";
import { useLocationAddress } from "../utils/Hooks";

const logo = require("../images/logo-notext.png");

export default function HomeScreen({ navigation }) {
  const { styles, colors } = useStyle(
    "container",
    "appTitle",
    "subtitle",
    "divider"
  );

  const [topNews, setNews] = useState(null);
  const [stats, setStats] = useState(null);
  const address = useLocationAddress();

  useEffect(() => {
    async function load() {
      const statsResp = await getLatestStats(address);
      if (!statsResp.error) {
        setStats({ stats: statsResp });
      } else {
        setStats({ error: "Could not reach server" });
      }

      const newsResp = await getTopNews(address);
      if (!newsResp.error) {
        setNews({ news: newsResp.slice(0, 3) });
      } else {
        setNews({ error: "Could not reach server." });
      }
    }

    load();
  }, [address]);

  return (
    <View style={[styles.container]}>
      <BigHeaderScrollView
        title="ProjectCovid"
        description="Live tracking and resources to help you get through the pandemic."
        image={<Image source={logo} style={{ height: 100, width: 100 }} />}
        isHome={true}
      >
        <Section title={stats ? null : "Live Statistics"}>
          {stats ? (
            stats.stats ? (
              <StatsView stats={stats.stats} />
            ) : (
              <ErrorBox />
            )
          ) : (
            <ActivityIndicator style={{ height: 280 }} />
          )}
          <View style={styles.divider} />
          <EmbeddedPageButton
            title="Global Tracker"
            navigationName="Live Tracker"
            icon={<Entypo name="globe" size={25} color={colors.textcolor} />}
            description="Get stats for anywhere in the world."
            navigation={navigation}
          />
        </Section>
        <Section
          title="Latest News"
          titleRight={
            <SimpleButton
              title="More news"
              action={() => {
                navigation.navigate("LatestNews");
              }}
              hasChevron
            />
          }
        >
          {topNews ? (
            topNews.news ? (
              topNews.news.map((article, index) => (
                <NewsArticle
                  article={article}
                  key={article.url}
                  isLast={index === 3}
                  navigation={navigation}
                />
              ))
            ) : (
              <ErrorBox />
            )
          ) : (
            <ActivityIndicator style={{ height: 200 }} />
          )}
          <EmbeddedPageButton
            title="Live Twitter Feed"
            navigationName="WebView"
            navigationParams={{
              url:
                "https://twitter.com/projectcovid/lists/trustworthy-sources?ref_src=twsrc%5Etfw",
              title: "Curated Tweets"
            }}
            icon={<Entypo name="twitter" size={25} color={colors.textcolor} />}
            description="Curated feed from reliable sources."
            navigation={navigation}
          />
        </Section>

        <Section
          title="Global Resources"
          titleRight={
            <SimpleButton
              title="View more"
              action={() => {
                navigation.navigate("GlobalResources");
              }}
              hasChevron
            />
          }
        >
          <EmbeddedPageButton
            title="Informational Toolkit"
            navigationName="InformationalToolkit"
            icon={
              <MaterialCommunityIcons
                name="toolbox"
                size={25}
                color={colors.textcolor}
              />
            }
            description="All you need to know about COVID-19."
            navigation={navigation}
          />
          <View style={styles.divider} />
          <EmbeddedPageButton
            title="Symptoms"
            navigationName="Symptoms"
            icon={
              <FontAwesome
                name="stethoscope"
                size={25}
                color={colors.textcolor}
              />
            }
            description="Learn about the symptoms of the virus."
            navigation={navigation}
          />
          <View style={styles.divider} />
          <EmbeddedPageButton
            title="Preventative Practices"
            navigationName="PreventativePractices"
            icon={
              <MaterialIcons
                name="healing"
                size={25}
                color={colors.textcolor}
              />
            }
            description="Tips for to stay healthy."
            navigation={navigation}
          />
        </Section>
        <PageButton
          title="Sources"
          navigationName="Sources"
          icon={<FontAwesome name="book" size={25} color={colors.textcolor} />}
          description="Learn where this information comes from."
          navigation={navigation}
        />
      </BigHeaderScrollView>
    </View>
  );
}
