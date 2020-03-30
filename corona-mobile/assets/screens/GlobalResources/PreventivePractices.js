import React from "react";
import { AccordionList } from "accordion-collapse-react-native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Button
} from "react-native";

import image1 from "../../images/preventativePractice/handwash.png";
import image2 from "../../images/preventativePractice/image3.gif";
import image3 from "../../images/preventativePractice/image2.jpg";
import image4 from "../../images/preventativePractice/image4.jpg";
import image5 from "../../images/preventativePractice/image5C.jpg";
import image6 from "../../images/preventativePractice/image6.jpg";

import Modal from "react-native-modal";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView
} from "react-native-gesture-handler";

import ModalImage from "./../../components/ModalImage";
import { useStyle } from "../../styles/styles";
import { ImageButton } from "../../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { InfoView } from "../../components/InfoView";
import { SourceItem } from "../../components/FooterComponents";


export default function StyledPreventativePractices() {
  const { styles } = useStyle("container", "resourceText");
  const navigation = useNavigation();
  return <PreventativePractices styles={styles} navigation={navigation} />;
}
class PreventativePractices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          image: image1,
          title: "Hygiene Habits",
          body: (
            <View>
              <InfoView
                title={<Text>Hand Washing</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      • 20 seconds (typically the chorus of a song), rubbing
                      between fingers, over tops and palms, and under nail beds
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Antibacterial soap or alcohol-based sanitizer
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Avoid scalding hot water that may dry out skin, this may
                      create microtears in the skin’s protective barrier
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>General Tips</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                    • Avoid touching your face, become conscious of how often
                      you do
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Because COVID-19 can transmit to the eyes, avoid wearing
                      contact lenses if possible which may trap contaminants and
                      wear traditional glasses instead
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Routinely sanitize personal belongings (phones, wallets,
                      keys, glasses) and high contact surfaces (handles,
                      counters, car steering wheels)
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Cover your coughs and sneezes with your elbow, facing away
                      from others
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Avoid handshaking and hugs when greeting others
                      professionally and socially
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Masks: N95 masks should ONLY be used in those showing
                      symptoms, or those around the potentially infected
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Surfaces: COVID-19 can live on fabrics and hard surfaces
                      for a predicted period of several days, clean surfaces
                      routinely with disinfectants
                    </Text>
                  </View>
                }
              />
              <SourceItem
                navigation={this.props.navigation}
                typeSource={"Sources"}
                sourcesList={[
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/index.html",
                    headline:
                    "Coronavirus (COVID-19)"
                  },
                  {
                    title: "WHO",
                    url:
                      "https://www.who.int/health-topics/coronavirus",
                    headline:
                    "Coronavirus"
                  },
                  {
                    title: "Michigan Health",
                    url:
                      "https://healthblog.uofmhealth.org/wellness-prevention/flattening-curve-for-covid-19-what-does-it-mean-and-how-can-you-help",
                    headline:
                      "Flattening the Curve for COVID-19: What Does It Mean and How Can You Help?"
                  },
                  {
                    title: "SAMHSA",
                    url:
                      "https://store.samhsa.gov/system/files/sma14-4894.pdf",
                    headline: "Publications and Digital Products"
                  },
                  {
                    title: "WKBW Buffalo",
                    headline:
                      "Spectrum to offer free broadband and WiFi to students without it",
                    url:
                      "https://www.wkbw.com/news/national/coronavirus/spectrum-to-offer-free-broadband-and-wifi-to-students-without-it"
                  },
                ]}
                key={"researchJourn"}
              />
            </View>
          ),
          id: "1"
        },
        {
          image: image2,
          title: "Physical Distancing",
          body: (
            <View>
              <InfoView
                title={<Text>General Tips</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Social distancing is advised to prevent an exponential infection 
                      of the American people. As observed in Italy and China, ICUs and 
                      ventilators are not infinite
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Avoid large gatherings and close-contact environments (including gyms)
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Worry, concern, frustration, and loneliness are expected: remind yourself of the greater good you are promoting and advocating for by social distancing
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Those previously experiencing substance abuse and mental health concern may be more likely to struggle in social isolation, consult appropriate providers/resources
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Employees/students are advised to work from home/participate in online courses
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • If you absolutely must leave the house, support small businesses
                    </Text>
                  </View>
                }
              />
              <SourceItem
                navigation={this.props.navigation}
                typeSource={"Sources"}
                sourcesList={[
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/index.html",
                    headline:
                    "Coronavirus (COVID-19)"
                  },
                  {
                    title: "WHO",
                    url:
                      "https://www.who.int/health-topics/coronavirus",
                    headline:
                    "Coronavirus"
                  },
                  {
                    title: "Michigan Health",
                    url:
                      "https://healthblog.uofmhealth.org/wellness-prevention/flattening-curve-for-covid-19-what-does-it-mean-and-how-can-you-help",
                    headline:
                      "Flattening the Curve for COVID-19: What Does It Mean and How Can You Help?"
                  },
                  {
                    title: "SAMHSA",
                    url:
                      "https://store.samhsa.gov/system/files/sma14-4894.pdf",
                    headline: "Publications and Digital Products"
                  },
                  {
                    title: "WKBW Buffalo",
                    headline:
                      "Spectrum to offer free broadband and WiFi to students without it",
                    url:
                      "https://www.wkbw.com/news/national/coronavirus/spectrum-to-offer-free-broadband-and-wifi-to-students-without-it"
                  },
                ]}
                key={"researchJourn"}
              />
            </View>
          ),
          id: "2"
        },
        {
          image: image3,
          title: "Stress and Stigma",
          body: (
            <View>
              <InfoView
                title={<Text>Stigma</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Asian descending, recent travelers and healthcare responders are at risk of stigma
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      Stigmatized populations are subject to social avoidance/rejection, denial of resources, and verbal and/or physical violence
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      We are ALL responsible citizens in practicing cultural competency and community support for these stigmatized populations
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      Take action: share your knowledge from this application and other national/global resources to dissolve myths and public stigma
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      As a population, we must remember to protect our mental health and coping methods
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      Those who previously may have struggled with mental health and/or substance abuse may be at risk of exacerbation
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      If you or someone you know is struggling reach out to appropriate resources
                    </Text>
                  </View>
                }
              />
              <SourceItem
                navigation={this.props.navigation}
                typeSource={"Sources"}
                sourcesList={[
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/index.html",
                    headline:
                    "Coronavirus (COVID-19)"
                  },
                  {
                    title: "WHO",
                    url:
                      "https://www.who.int/health-topics/coronavirus",
                    headline:
                    "Coronavirus"
                  },
                  {
                    title: "Michigan Health",
                    url:
                      "https://healthblog.uofmhealth.org/wellness-prevention/flattening-curve-for-covid-19-what-does-it-mean-and-how-can-you-help",
                    headline:
                      "Flattening the Curve for COVID-19: What Does It Mean and How Can You Help?"
                  },
                  {
                    title: "SAMHSA",
                    url:
                      "https://store.samhsa.gov/system/files/sma14-4894.pdf",
                    headline: "Publications and Digital Products"
                  },
                  {
                    title: "WKBW Buffalo",
                    headline:
                      "Spectrum to offer free broadband and WiFi to students without it",
                    url:
                      "https://www.wkbw.com/news/national/coronavirus/spectrum-to-offer-free-broadband-and-wifi-to-students-without-it"
                  },
                ]}
                key={"researchJourn"}
              />
            </View>
          ),
          id: "3"
        },
        {
          image: image4,
          title: "Preparation",
          body: (
            <View>
              <InfoView
                title={<Text>Two Week's Supply</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                    If you display symptoms, you are advised to self-quarantine for two weeks; develop a two week’s supply of food, medical and cleaning supplies needed in the event you must self-quarantine
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Do not forget your prescriptions and essential medical supplies
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • If you are healthy and able, consider making the trip to build a supply for the immunocompromised and/or older adults in your community
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • If stores are out of stock of staples, online retailers may still deliver
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>When in Stores</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                    • Sanitize your carts and hands; most retailers have stations
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Avoid clashing with other customers
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Thank the employees! They are working around the clock to keep shelves stocked
                    </Text>
                  </View>
                }
              />
              <SourceItem
                navigation={this.props.navigation}
                typeSource={"Sources"}
                sourcesList={[
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/index.html",
                    headline:
                    "Coronavirus (COVID-19)"
                  },
                  {
                    title: "WHO",
                    url:
                      "https://www.who.int/health-topics/coronavirus",
                    headline:
                    "Coronavirus"
                  },
                  {
                    title: "Michigan Health",
                    url:
                      "https://healthblog.uofmhealth.org/wellness-prevention/flattening-curve-for-covid-19-what-does-it-mean-and-how-can-you-help",
                    headline:
                      "Flattening the Curve for COVID-19: What Does It Mean and How Can You Help?"
                  },
                  {
                    title: "SAMHSA",
                    url:
                      "https://store.samhsa.gov/system/files/sma14-4894.pdf",
                    headline: "Publications and Digital Products"
                  },
                  {
                    title: "WKBW Buffalo",
                    headline:
                      "Spectrum to offer free broadband and WiFi to students without it",
                    url:
                      "https://www.wkbw.com/news/national/coronavirus/spectrum-to-offer-free-broadband-and-wifi-to-students-without-it"
                  },
                ]}
                key={"researchJourn"}
              />
            </View>
          ),
          id: "4"
        },
        {
          image: image5,
          title: "Protecting Others",
          body: (
            <View>
              <InfoView
                title={<Text>Vulnerable Populations</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                    • Current observation indicates mild symptoms in non-vulnerable populations
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Vulnerable populations: older adults (65+) and immunocompromised (chronic-diseased) are subject to severe symptoms of illness
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Vulnerable populations may need emergent health services if infected:
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • ICU (intensive care unit) or ventilators
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • These resources are subject to becoming strained as caseload picks up in the United States (following China and Italy’s events)
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>If a Vulnerable Population Member Shows Symptoms</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                    • Call ahead to emergent health services so they can anticipate arrival
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Call local healthcare provider and/or health department to seek testing
                    </Text>
                  </View>
                }
              />
              <SourceItem
                navigation={this.props.navigation}
                typeSource={"Sources"}
                sourcesList={[
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/index.html",
                    headline:
                    "Coronavirus (COVID-19)"
                  },
                  {
                    title: "WHO",
                    url:
                      "https://www.who.int/health-topics/coronavirus",
                    headline:
                    "Coronavirus"
                  },
                  {
                    title: "Michigan Health",
                    url:
                      "https://healthblog.uofmhealth.org/wellness-prevention/flattening-curve-for-covid-19-what-does-it-mean-and-how-can-you-help",
                    headline:
                      "Flattening the Curve for COVID-19: What Does It Mean and How Can You Help?"
                  },
                  {
                    title: "SAMHSA",
                    url:
                      "https://store.samhsa.gov/system/files/sma14-4894.pdf",
                    headline: "Publications and Digital Products"
                  },
                  {
                    title: "WKBW Buffalo",
                    headline:
                      "Spectrum to offer free broadband and WiFi to students without it",
                    url:
                      "https://www.wkbw.com/news/national/coronavirus/spectrum-to-offer-free-broadband-and-wifi-to-students-without-it"
                  },
                ]}
                key={"researchJourn"}
              />
            </View>
          ),
          id: "5"
        },
        {
          image: image6,
          title: "Caring for the Infected",
          body: (
            <View>
              <InfoView
                title={<Text>Signs and Symptoms</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                    • Fever, cough, difficulty breathing, sore throat, runny nose
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • COVID-19 infected individuals may not display all symptoms
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Those with standard immunity may have such mild symptoms they do not believe they have become infected with COVID-19
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • Older adults are subject to blunted immune response, and may not show a fever
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • These resources are subject to becoming strained as caseload picks up in the United States (following China and Italy’s events)
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Viral Shedding</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                    Viral shedding is the period of time bodily secretions can transmit the virus
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • To date, the viral shedding period of COVID-19 is unknown
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • For this reason, continuously practice proper hygiene and cleaning
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                    • COVID-19 may be a contagious virus before and after symptoms appear/clear from infected individuals
                    </Text>
                  </View>
                }
              />
              <SourceItem
                navigation={this.props.navigation}
                typeSource={"Sources"}
                sourcesList={[
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/index.html",
                    headline:
                    "Coronavirus (COVID-19)"
                  },
                  {
                    title: "WHO",
                    url:
                      "https://www.who.int/health-topics/coronavirus",
                    headline:
                    "Coronavirus"
                  },
                  {
                    title: "Michigan Health",
                    url:
                      "https://healthblog.uofmhealth.org/wellness-prevention/flattening-curve-for-covid-19-what-does-it-mean-and-how-can-you-help",
                    headline:
                      "Flattening the Curve for COVID-19: What Does It Mean and How Can You Help?"
                  },
                  {
                    title: "SAMHSA",
                    url:
                      "https://store.samhsa.gov/system/files/sma14-4894.pdf",
                    headline: "Publications and Digital Products"
                  },
                  {
                    title: "WKBW Buffalo",
                    headline:
                      "Spectrum to offer free broadband and WiFi to students without it",
                    url:
                      "https://www.wkbw.com/news/national/coronavirus/spectrum-to-offer-free-broadband-and-wifi-to-students-without-it"
                  },
                ]}
                key={"researchJourn"}
              />
            </View>
          ),
          id: "6"
        }
      ]
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { styles } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
          {this.state.list.map(item => {
            return (
              <ImageButton
                title={item.title}
                source={item.image}
                body={item.body}
                navigation={this.props.navigation}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
