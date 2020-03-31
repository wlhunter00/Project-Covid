import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";
import { MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import { useStyle } from "../styles/styles";
import { StandardText } from "../components/Texts";
import PageControl from "react-native-page-control";

const PADDING = 15;
const WINDOW_WIDTH = Dimensions.get('window').width;
const PAGE_WIDTH = WINDOW_WIDTH - 2 * PADDING;

export function Section({ title, children, titleRight }) {
    const { styles } = useStyle("homeScreenSection", "shadow");
    return (
        <View style={[styles.homeScreenSection, styles.shadow]}>
            {title && (
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10}}>
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
        <View style={{ paddingHorizontal: 15, width: PAGE_WIDTH}}>
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
  const [currentPage, changePage] = useState(0);

  const { colors, isDark } = useStyle();

  // Set up the different stats pages
  let statsItems = [];

  if (stats.Province_Stats) {
    statsItems.push({ stats: stats.Province_Stats, title: stats.Province_Stats.Name, key: 0 });
  }

  if (stats.Country_Stats) {
    statsItems.push({ stats: stats.Country_Stats, title: stats.Country_Stats.Country === "US" ? "the US" : stats.Country_Stats.Country, key: 1 });
  }

  statsItems.push( { stats: stats.Global_Stats, title: "the World", key: 2 })

  // https://stackoverflow.com/questions/48045696/flatlist-scrollview-error-on-any-state-change-invariant-violation-changing-on
  const onViewRef = React.useRef(({ viewableItems }) => {
    const newPageNum = viewableItems[0].item.key;
    changePage(newPageNum);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });


  return (
      <View style={{ marginBottom: 15,  marginHorizontal: -15, alignItems: "stretch" }}>
      <FlatList
        horizontal
        data={statsItems}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.title}
        renderItem={({ item }) => <StatsPage stats={item.stats} title={item.title} />}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <PageControl
        currentPage={currentPage}
        numberOfPages={statsItems.length}
        pageIndicatorTintColor={!isDark ? colors.accentcolor : colors.secondarytextcolor}
        currentPageIndicatorTintColor={colors.primarycolor} style={{ marginTop: 30 }}hidesForSinglePage />
      
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