import React, { useEffect, useState } from "react";
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

export function Section({ title, children, titleRight }) {
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
  
 export function NewsArticle({ article, isLast,navigation}) {
    const { urlToImage, url, title, publishedAt, description } = article;
  
    const { styles, colors } = useStyle("divider");
  
    const d = new Date(publishedAt);
    const formatOptions = { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
    const dateString = d.toLocaleDateString("en-US", formatOptions);
    return (
      <View>
        <TouchableOpacity onPress={() => { navigation.navigate("WebView", { title, url }) }}>
        <View style={{ flexDirection: "row", paddingVertical: 15 }}>
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
  
  export function StatsView({ stats }) {
    const {colors } = useStyle();
    return (
      <View style={{marginBottom: 15, marginTop: 5}}>
        <StandardText fontSize={30} isBold>{stats["TotalConfirmed"]}
          <StandardText>  Confirmed Cases</StandardText>
        </StandardText>
  
        <StandardText fontSize={14} style={{color: colors.secondarytextcolor}}>
          <Ionicons name="ios-trending-up" size={16}/> {stats["NewConfirmed"]} New Cases 
        </StandardText>
  
        <StandardText fontSize={30} isBold style={{color: "#CD4543", marginTop: 10}}>{stats["TotalDeaths"]}
          <StandardText>  Total Deaths</StandardText>
        </StandardText>
  
        <StandardText fontSize={14} style={{color: colors.secondarytextcolor}}>
          <Ionicons name="ios-trending-up" size={16}/> {stats["NewDeaths"]} New Deaths 
        </StandardText>
  
        <StandardText fontSize={30} isBold style={{color: colors.primarycolor, marginTop: 10}}>{stats["TotalDeaths"]}
          <StandardText>  Recovered</StandardText>
        </StandardText>
  
        <StandardText fontSize={14} style={{color: colors.secondarytextcolor}}>
          <Ionicons name="ios-trending-up" size={16}/> {stats["NewRecovered"]} New Recovered 
        </StandardText>
      </View>
    );
  }
  
  export function ErrorBox() {
    const { colors } = useStyle();
    return (
      <View style={{ height: 240, flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
        <MaterialIcons name="error-outline" color={colors.textcolor} size={25} />
        <StandardText style={{marginLeft: 3}}>Could not reach server</StandardText>
      </View>
    );
  }