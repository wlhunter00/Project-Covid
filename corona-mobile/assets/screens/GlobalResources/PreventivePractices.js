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

import { ModalImage } from "./../../components/ModalImage";

export default class PreventativePractices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          image: image1,
          title: "Hygiene Habits",
          body: [
            "Hand Washing:",
            "\u2022 20 seconds (typically the chorus of a song), rubbing between fingers, over tops and palms, and under nail beds",
            "\u2022 Antibacterial soap or alcohol-based sanitizer",
            "\u2022 Avoid scalding hot water that may dry out skin, this may create microtears in the skin’s protective barrier",
            " ",
            "General Tips:",
            "\u2022 Avoid touching your face, become conscious of how often you do",
            "\u2022 Because COVID-19 can transmit to the eyes, avoid wearing contact lenses if possible which may trap contaminants and wear traditional glasses instead",
            "\u2022 Routinely sanitize personal belongings (phones, wallets, keys, glasses) and high contact surfaces (handles, counters, car steering wheels)",
            "\u2022 Cover your coughs and sneezes with your elbow, facing away from others",
            "\u2022 Avoid handshaking and hugs when greeting others professionally and socially",
            "\u2022 Masks: N95 masks should ONLY be used in those showing symptoms, or those around the potentially infected",
            "\u2022 Surfaces: COVID-19 can live on fabrics and hard surfaces for a predicted period of several days, clean surfaces routinely with disinfectants"
          ],
          id: "1"
        },
        {
          image: image2,
          title: "Social Distancing",
          body: [
            "\u2022 FACT: viral droplets can infect via eyes, nose, and mouth up to 15-feet away",
            "\u2027 Social distancing is advised to prevent an exponential infection of the American people. As observed in Italy and China, ICUs and ventilators are not infinite",
            "\u2022 Avoid large gatherings and close-contact environments (including gyms)",
            "\u2022 Worry, concern, frustration, and loneliness are expected: remind yourself of the greater good you are promoting and advocating for by social distancing",
            "\u2022 Those previously experiencing substance abuse and mental health concern may be more likely to struggle in social isolation, consult appropriate providers/resources",
            "\u2022 Employees/students are advised to work from home/participate in online courses",
            "\u2022 If you absolutely must leave the house, support small businesses"
          ],
          id: "2"
        },
        {
          image: image3,
          title: "Stress and Stigma",
          id: "3",
          body: [
            "\u2022 Asian descending, recent travelers and healthcare responders are at risk of stigma",
            "\u2027 Stigmatized populations are subject to social avoidance/rejection, denial of resources, and verbal and/or physical violence",
            "\u2022 We are ALL responsible citizens in practicing cultural competency and community support for these stigmatized populations",
            "\u2027 WTake action: share your knowledge from this application and other national/global resources to dissolve myths and public stigma",
            "\u2027 Take action: express your support to those who may have experienced stigma amidst COVID-19, and refer to mental health services as needed",
            "\u2022 As a population, we must remember to protect our mental health and coping methods",
            "\u2027 Those who previously may have struggled with mental health and/or substance abuse may be at risk of exacerbation",
            "\u2027 If you or someone you know is struggling reach out to appropriate resources"
          ]
        },
        {
          image: image4,
          title: "Preparation for the Potential",
          id: "4",
          body: [
            "\u2022 Two Week’s Supply: If you display symptoms, you are advised to self-quarantine for two weeks; develop a two week’s supply of food, medical and cleaning supplies needed in the event you must self-quarantine",
            "\u2022 Do not forget your prescriptions and essential medical supplies",
            "\u2022 If you are healthy and able, consider making the trip to build a supply for the immunocompromised and/or older adults in your community",
            "\u2022 If stores are out of stock of staples, online retailers may still deliver",
            " ",
            "When in stores:",
            "\u2022 Sanitize your carts and hands; most retailers have stations",
            "\u2022 Avoid clashing with other customers",
            "\u2022 Thank the employees! They are working around the clock to keep shelves stocked"
          ]
        },
        {
          image: image5,
          title: "Protecting the Immunocompromised",
          id: "5",
          body: [
            "\u2022 Current observation indicates mild symptoms in non-vulnerable populations",
            "\u2022 Vulnerable populations: older adults (65+) and immunocompromised (chronic-diseased) are subject to severe symptoms of illness",
            "\u2022 Vulnerable populations may need emergent health services if infected:",
            "\u2027 ICU (intensive care unit) or ventilators",
            "\u2027 These resources are subject to becoming strained as caseload picks up in the United States (following Chin and Italy’s events)",
            " ",
            "If a vulnerable population member shows symptoms:",
            "\u2022 Call ahead to emergent health services so they can anticipate arrival",
            " ",
            "If a non-vulnerable population member shows symptoms",
            "\u2022 Call local healthcare provider and/or health department to seek testing"
          ]
        },
        {
          image: image6,
          title: "Caring for the Infected",
          id: "6",
          body: [
            "Signs and Symptoms (May Vary):",
            "\u2022 Fever, cough, difficulty breathing, sore throat, runny nose",
            "\u2027 COVID-19 infected individuals may not display all symptoms",
            "\u2022 Those with standard immunity may have such mild symptoms they do not believe they have become infected with COVID-19",
            "\u2027 Older adults are subject to blunted immune response, and may not show a fever",
            " ",
            "Viral shedding: the period of time bodily secretions can transmit the virus",
            "\u2022 To date, the viral shedding period of COVID-19 is unknown",
            "\u2022 For this reason, continuously practice proper hygiene and cleaning",
            "\u2022 COVID-19 may be a contagious virus before and after symptoms appear/clear from infected individuals"
          ]
        }
      ]
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.list.map(item => {
            return <ModalImage item={item} key={item.id} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 5,
    paddingTop: 10,
    height: "100%"
  },
  header: {
    padding: 5,
    marginBottom: 5,
    borderRadius: 50,
    borderBottomRightRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    padding: 10,
    backgroundColor: "#b8dedd",
    borderRadius: 10,
    marginBottom: 10
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    position: "relative",
    left: 9,
    textShadowColor: "black",
    textShadowRadius: 2
  },
  headerImage: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    overflow: "hidden",
    resizeMode: "cover",
    borderRadius: 15
  }
});
