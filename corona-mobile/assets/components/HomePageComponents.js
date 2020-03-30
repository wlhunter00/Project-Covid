import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import { useStyle } from "../styles/styles";
import { StandardText } from "../components/Texts";
import { Pages } from 'react-native-pages';

export function Section({ title, children, titleRight }) {
    const { styles } = useStyle("homeScreenSection", "shadow");
    return (
        <View style={[styles.homeScreenSection, styles.shadow]}>
            {title && (
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                    <StandardText fontSize="subtitle" isBold >{title}</StandardText>
                    <View style={{ flex: 1 }} />
                    {titleRight}
                </View>
            )
            }
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
  
const BigStat = ({ name, val, color }) => (
    <StandardText fontSize={30} isBold style={color ? { color: color } : {}}>{val}
        <StandardText>  {name}</StandardText>
    </StandardText>
);

const SmallStat = ({ name, val }) => {
    const { colors } = useStyle();
    return (
        <StandardText fontSize={14} style={{ color: colors.secondarytextcolor }}>
            <Ionicons name="ios-trending-up" size={16} /> {val} {name}
        </StandardText>
    );
};

function StatsPage({ stats, title }) {
    const { styles, colors } = useStyle("divider");
    
    return (
        <View style={{ paddingHorizontal: 15 }}>
            <StandardText fontSize="subtitle" isBold>Live Statistics <Text style={{fontWeight: '300'}}>for {title}</Text></StandardText>
            <View style={[styles.divider, {marginVertical: 15}]}/>
            <BigStat name="Confirmed Cases" val={stats["TotalConfirmed"] || stats["Confirmed"]} />
            {stats["NewConfirmed"] && <SmallStat name="New Cases" val={stats["NewConfirmed"]} />}

            <View style={{height: 10}}/>
            <BigStat name="Total Deaths" val={stats["TotalDeaths"] || stats["Deaths"]} color="#CD4543"/>
            {stats["NewDeaths"] && <SmallStat name="New Deaths" val={stats["NewDeaths"]} />}
            <View style={{height: 10}}/>
            <BigStat name="Recovered" val={stats["TotalRecovered"] || stats["Recovered"]} color={colors.primarycolor} />
            {stats["NewRecovered"] && <SmallStat name="New Recovered" val={stats["NewRecovered"]} />}
        </View>
    );
}
  
export function StatsView({ stats }) {
    const { colors } = useStyle();
    
    return (
        <View style={{ marginBottom: 15, marginTop: 5, marginHorizontal: -15 }}>
            <Pages containerStyle={{ height: 290 }} indicatorColor={colors.textcolor}>
                <StatsPage stats={stats["Global_Stats"]} key="Global" title="the World"/>
                {stats.Country_Stats &&
                    <StatsPage stats={stats["Country_Stats"]} key="National" title={stats.Country_Stats.Country === "US" ? "the US" : stats.Country_Stats.Country} />
                }
                {stats.Province_Stats && 
                    <StatsPage stats={stats["Province_Stats"]} key="Local" title={stats.Province_Stats.Name} />
                }
            </Pages>
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