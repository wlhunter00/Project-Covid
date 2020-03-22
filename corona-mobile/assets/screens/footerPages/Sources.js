import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { defaults } from "./../../styles/styles.js";
import { SourceItem } from "../../components/FooterComponents";

export default function Sources({ route, navigation }) {
  return (
    <ScrollView
      style={{ backgroundColor: defaults.backgroundcolor }}
      contentContainerStyle={styles.container}
    >
      <SourceItem
        navigation={navigation}
        typeSource={"Research Journals"}
        sourcesList={[
          {
            title: "The Lancet",
            url:
              "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30154-9/fulltext"
          },
          {
            title: "The Lancet",
            url:
              "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30211-7/fulltext"
          },
          {
            title: "The Lancet",
            url:
              "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30183-5/fulltext"
          },
          {
            title: "The Lancet",
            url:
              "https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(20)30150-9/fulltext"
          },
          {
            title: "Nature",
            url:
              "https://www.nature.com/articles/s41422-020-0282-0?fbclid=IwAR2wgEzxXL3pzUEefkN4dOTq_iIEoq5O88p9ZPRMgYlDxLpg_bISGT6RoZ4"
          },
          {
            title: "Tropical Medicine and International Health",
            url: "https://onlinelibrary.wiley.com/doi/full/10.1111/tmi.13383"
          },
          {
            title: "https://onlinelibrary.wiley.com/doi/full/10.1111/tmi.13383",
            url:
              "https://mmrjournal.biomedcentral.com/articles/10.1186/s40779-020-0233-6"
          }
        ]}
        key={"researchJourn"}
      />
      <SourceItem
        navigation={navigation}
        typeSource={"Health Organizations"}
        sourcesList={[
          {
            title: "World Health Organization",
            url:
              "https://www.who.int/dg/speeches/detail/who-director-general-s-opening-remarks-at-the-media-briefing-on-covid-19---11-march-2020"
          },
          {
            title: "World Health Organization",
            url:
              "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
          },
          {
            title: "World Health Organization",
            url:
              "https://www.who.int/docs/default-source/coronaviruse/who-china-joint-mission-on-covid-19-final-report.pdf"
          },
          {
            title: "Johns Hopkins Medicine",
            url:
              "https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus/2019-novel-coronavirus-myth-versus-fact"
          },
          {
            title: "Harvard Medical School",
            url:
              "https://www.health.harvard.edu/diseases-and-conditions/coronavirus-resource-center"
          }
        ]}
        key={"healthOrg"}
      />
      <SourceItem
        navigation={navigation}
        typeSource={"News Outlet"}
        sourcesList={[
          {
            title: "Xinhua Net",
            url: "http://www.xinhuanet.com/english/2020-01/09/c_138690570.htm"
          },
          {
            title: "Science Daily",
            url:
              "https://www.sciencedaily.com/releases/2020/02/200226151951.htm"
          },
          {
            title: "Time Magazine",
            url:
              "https://time.com/5804092/experimental-covid-19-vaccine-test-begins-as-u-s-volunteer-receives-first-shot"
          },
          {
            title: "Bloomberg",
            url:
              "https://www.bloomberg.com/news/articles/2020-03-15/coronavirus-tests-from-labcorp-quest-will-cost-50-to-100"
          },
          {
            title: "NBC News",
            url:
              "https://www.nbcnews.com/health/health-news/coronavirus-testing-information-covid-19-tests-according-state-health-departments-n1158041"
          }
        ]}
        key={"newsOut"}
      />
      <SourceItem
        navigation={navigation}
        typeSource={"Government Agencies"}
        sourcesList={[
          {
            title: "Centers for Disease Control and Prevention",
            url:
              "https://www.cdc.gov/coronavirus/2019-ncov/about/transmission.html"
          },
          {
            title: "Centers for Disease Control and Prevention",
            url:
              "https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/high-risk-complications.html"
          },
          {
            title: "Centers for Disease Control and Prevention",
            url:
              "https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fabout%2Fsteps-when-sick.html"
          },
          {
            title: "Centers for Disease Control and Prevention",
            url:
              "https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fabout%2Fprevention.html"
          },
          {
            title: "Centers for Disease Control and Prevention",
            url:
              "https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fabout%2Fsymptoms.html"
          },
          {
            title: "Centers for Disease Control and Prevention",
            url:
              "https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html"
          },
          {
            title: "Centers for Disease Control and Prevention",
            url:
              "https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/share-facts.html"
          },
          {
            title: "Centers for Disease Control and Prevention",
            url:
              "https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/testing-in-us.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Ftesting-in-us.html"
          }
        ]}
        key={"govAgen"}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
