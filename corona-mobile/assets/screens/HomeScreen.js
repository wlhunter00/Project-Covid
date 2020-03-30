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
import { MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import { useStyle } from "../styles/styles";
import { PageButton, SimpleButton, EmbeddedPageButton } from "../components/Buttons";
import { StandardText } from "../components/Texts";
import { getTopNews, getLatestStats } from "../APIService";
import ParallaxScrollView from "react-native-parallax-scroll-view"
import ViewPager from '@react-native-community/viewpager';

import { Section, ErrorBox, StatsView, NewsArticle } from "../components/HomePageComponents"

const logo = require("../images/logo-notext.png")

export default function HomeScreen({ navigation }) {
  const { styles, colors } = useStyle("container", "appTitle", "subtitle", "divider");

  const [topNews, setTopNews] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const resp = await getTopNews();
      if (!resp.error) {
        setTopNews({ news: resp.slice(0, 4) });
      } else {
        setTopNews({ error: "Could not reach server."})
      }
    }
    fetchNews();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      const resp = await getLatestStats();
      if (!resp.error) {
        setStats({ stats: resp["Global_Stats"] });
      } else {
        setStats({ error: "Could not reach server" });
      }
    }
    fetchStats();
  }, []);

  return (
    <View style={[styles.container]}>
      <ParallaxScrollView
        parallaxHeaderHeight={260}
        stickyHeaderHeight={88}
        backgroundColor={colors.backgroundcolor}
        contentBackgroundColor={colors.backgroundcolor}
        renderBackground={() => (<View style={styles.container}></View>)}
        renderForeground={() => (
          <View style={{ marginBottom: 20, marginTop: 60, paddingHorizontal: 15 }}>
            <Image source={logo} style={{ height: 90, width: 90 }} />
            <StandardText fontSize="title" isBold style={{
              marginBottom: 10
            }}>
              Project<Text style={{ fontWeight: "normal" }}>Covid</Text>
            </StandardText>
            <StandardText>
              Live tracking and resources to help you get through the pandemic.
            </StandardText>
          </View>
        )}
        renderStickyHeader={() => (
          <View style={{ borderBottomColor: colors.accentcolor, borderBottomWidth: 1, paddingHorizontal: 15, paddingBottom: 5, justifyContent: 'flex-end', height: '100%' }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={logo} style={{ height: 43, width: 43, marginRight: 5, marginBottom: 3 }} />
              <StandardText fontSize="title" isBold>
                Project<Text style={{ fontWeight: "normal" }}>Covid</Text>
              </StandardText>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >

        <Section title="Live Statistics">
          {stats ? (
            stats.stats ?
              <StatsView stats={stats.stats} /> : <ErrorBox />
          ) : <ActivityIndicator style={{ height: 200 }} />}
        </Section>
        
        <Section title="Latest News" titleRight={
          <SimpleButton title="More news" action={() => { navigation.navigate("LatestNews") }} hasChevron />
        }>
          {topNews ? (
            topNews.news ?
              topNews.news.map((article, index) => <NewsArticle article={article} key={article.url} isLast={index === 3} navigation={navigation} />
              ) : <ErrorBox />
          ) : <ActivityIndicator style={{ height: 200 }} />
          }
        </Section>

        <Section title="Global Resources" titleRight={
          <SimpleButton title="View more" action={() => { navigation.navigate("GlobalResources") }} hasChevron />
        } >
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
            description="All you need to know about COVID-19"
            navigation={navigation}
          />
          <View style={styles.divider} />
          <EmbeddedPageButton
            title="Symptoms"
            navigationName="Symptoms"
            icon={
              <FontAwesome name="stethoscope" size={25} color={colors.textcolor} />
            }
            description="Learn about the symptoms of the virus."
            navigation={navigation}
          />
          <View style={styles.divider} />
          <EmbeddedPageButton
            title="Preventative Practices"
            navigationName="PreventativePractices"
            icon={
              <MaterialIcons name="healing" size={25} color={colors.textcolor} />
            }
            description="Tips for to stay healthy"
            navigation={navigation}
          />
        </Section>

        <PageButton
          title="Live Twitter Feed"
          navigationName="TwitterFeed"
          icon={<Entypo name="twitter" size={25} color={colors.textcolor} />}
          description="View a curated feed from reliable sources."
          navigation={navigation}
        />

        <PageButton
          title="Sources"
          navigationName="Sources"
          icon={<FontAwesome name="book" size={25} color={colors.textcolor} />}
          description="Learn where this information comes from."
          navigation={navigation}
        />
      </ParallaxScrollView>
    </View>);
}

