import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useStyle } from "../styles/styles";
import { PageButton, SimpleButton, EmbeddedPageButton } from "../components/Buttons";
import { StandardText } from "../components/Texts";
import { getTopNews } from "../APIService";
import { TouchableOpacity } from "react-native-gesture-handler";

const logo = require("../images/logo-notext.png")

export default function HomeScreen({ navigation }) {
  const { styles, colors } = useStyle("container", "appTitle", "subtitle", "divider");

  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const resp = await getTopNews();
       setTopNews(resp.slice(0,4));
    }
    fetchNews();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingHorizontal: 15 }}>
      <View style={{ marginBottom: 20, marginTop: 60, }}>
        <Image source={logo} style={{height: 90, width: 90}}/>
        <StandardText fontSize="title" isBold style={{
          marginBottom: 10
        }}>
          Project<Text style={{ fontWeight: "normal" }}>Covid</Text>
        </StandardText>
        <StandardText>
          Live tracking and resources to help you get through the pandemic.
      </StandardText>
      </View>

      <Section title="Live Statistics">
        <View style={{height: 180, justifyContent: 'center', marginBottom: 20}}>
          <Text style={{ textAlign: "center" }}>Stats coming soon</Text>
          </View>
      </Section>
      
      <Section title="Latest News" titleRight={
        <SimpleButton title="More news" action={() => { navigation.navigate("LatestNews") }} hasChevron/>
      }>
        {topNews.length > 0 ? topNews.map((article, index) => <NewsArticle article={article} key={article.url} isLast={index === 3} navigation={navigation}/>
        ) : <ActivityIndicator style={{height: 200}}/>}
      </Section>

      <Section title="Global Resources" titleRight={
        <SimpleButton title="View more" action={() => { navigation.navigate("GlobalResources") }} hasChevron/>
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
        <View style={styles.divider}/>
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
    </ScrollView>
  );
}

function Section({ title, children, titleRight }) {
  const { styles } = useStyle("homeScreenSection", "shadow");
  return (
    <View style={[styles.homeScreenSection, styles.shadow]}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <StandardText fontSize="subtitle" isBold >{title}</StandardText>
        <View style={{flex: 1}}/>
        {titleRight}
      </View>
      {children}
    </View>
  );
}

function NewsArticle({ article, isLast,navigation}) {
  const { urlToImage, url, title, publishedAt, description } = article;

  const { styles, colors } = useStyle("divider");

  const d = new Date(publishedAt);
  const formatOptions = { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
  const dateString = d.toLocaleDateString("en-US", formatOptions);
  return (
    <View>
      <TouchableOpacity onPress={() => { navigation.navigate("WebView", { title, url }) }}>
      <View style={{ flexDirection: "row", paddingVertical: 10 }}>
          <Image source={urlToImage ? { uri: urlToImage } : {}} style={{
            width: 50,
            height: 50,
            borderRadius: 5,
            backgroundColor: colors.accentcolor,
            marginRight: 10
          }} resizeMode="cover" />
          <StandardText style={{ flex: 1, fontWeight: "400" }}>
            {title} • <Text style={{ color: colors.secondarytextcolor }}>{dateString}</Text>
          </StandardText>
        </View>
        </TouchableOpacity>
      {!isLast && <View style={styles.divider} />}
    </View>
  );
}