import React, { useEffect, useState, useRef } from "react";
import { View, Image, ActivityIndicator, Animated } from "react-native";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";

import { useStyle } from "../styles/styles";
import {
  PageButton,
  SimpleButton,
  EmbeddedPageButton,
} from "../components/Buttons";
import { StandardText } from "../components/Texts";
import { getTopNews, getLatestStats } from "../utils/APIService";
import {
  Section,
  ErrorBox,
  StatsView,
  NewsArticle,
} from "../components/HomePageComponents";
import { useLocationAddress } from "../utils/Hooks";
import { ResourceNames } from "./GlobalResources/ResourcePage";

const logo = require("../images/logo-notext.png");

export default function HomeScreen({ navigation }) {
  const { styles, colors, isDark } = useStyle(
    "container",
    "appTitle",
    "subtitle",
    "divider",
    "scrollViewContent"
  );

  const [topNews, setNews] = useState(null);
  const [stats, setStats] = useState(null);
  const address = useLocationAddress();

  // Load from server
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

  // animate status bar blur
  const animatedScrollYValue = useRef(new Animated.Value(0)).current;

  const statusBarOpacity = animatedScrollYValue.interpolate({
    inputRange: [0, 30],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container]}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: animatedScrollYValue } } },
        ])}
      >
        <View style={{ flexDirection: "row", marginTop: 80, marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <StandardText fontSize="title" isBold style={{ marginBottom: 10 }}>
              Project
              <StandardText style={{ fontWeight: "400" }} fontSize="title">
                Covid
              </StandardText>
            </StandardText>

            <StandardText style={{ marginBottom: 10 }}>
              Live tracking and resources to help you get through the pandemic.
            </StandardText>
          </View>
          <Image source={logo} style={{ height: 100, width: 100 }} />
        </View>

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
              title: "Curated Tweets",
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
              title="View"
              action={() => {
                navigation.navigate("GlobalResources");
              }}
              hasChevron
            />
          }
        >
          <EmbeddedPageButton
            title="Information Toolkit"
            navigationName="ResourcePage"
            navigationParams={{
              resourceName: ResourceNames.informationToolkit,
              title: "Information Toolkit",
            }}
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
            navigationName="ResourcePage"
            navigationParams={{
              resourceName: ResourceNames.preventativePractices,
              title: "Preventative Practices",
            }}
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
      </Animated.ScrollView>
      <Animated.View
        opacity={statusBarOpacity}
        style={{
          zIndex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: Constants.statusBarHeight,
          zIndex: 1,
        }}
      >
        <BlurView
          intensity={100}
          style={{ flex: 1 }}
          tint={isDark ? "dark" : "default"}
        />
      </Animated.View>
    </View>
  );
}
