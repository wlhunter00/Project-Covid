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

import image1 from "./../../images/informationalToolkit/image1.jpg";
import image2 from "./../../images/informationalToolkit/image2.jpg";
import image3 from "./../../images/informationalToolkit/image3.jpg";
import image4 from "./../../images/informationalToolkit/image4.jpg";
import Modal from "react-native-modal";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView
} from "react-native-gesture-handler";

import { ModalImage } from "./../../components/ModalImage";

export default class InformationalToolkit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          image: image1,
          title: "COVID-19",
          body: [
            "What is COVID-19?",
            "\u2022 COVID-19 is the name of the disease caused by Coronavirus, originally discovered in Wuhan, China, that can be transmitted from human to human",
            "\u2022 The CoronaVirus 2020 outbreak is officially considered a pandemic by the World Health Organization (WHO)",
            " ",
            "How does one get affected?",
            "\u2022 Close contact with people (within 6 feet) who are infected",
            "\u2022 It may be possible for someone to get COVID-19 by touching a surface with the virus on it and then touching their mouth, nose, eyes, or face",
            " ",
            "What are the signs and symptoms?",
            "\u2022 Common symptoms include fever, cough, and shortness of breath",
            "\u2022 Other symptoms include sneezing, runny nose, sore throat, and muscle aches",
            "\u2022 Those infected can be non-symptomatic carriers of the virus",
            "\u2022 Different people may have different combinations of symptoms, even with the same virus",
            " ",
            "Who is at a higher risk?",
            "\u2022 Those with serious chronic medical conditions like heart disease, diabetes, and lung disease",
            "\u2022 The immunocompromised, such as people with HIV, those taking corticosteroids, those with cancer and current/recent chemotherapy treatment",
            "\u2022 The elderly",
            " ",
            "How is Coronavirus treated? Can I take antibiotics?",
            "\u2022 There are currently no drug treatments approved, but several drugs that are used for other conditions are being studied to see whether they could help treat COVID-19",
            "\u2022 Antibiotics are not effective against the virus",
            " ",
            "Sources:",
            "1. http://www.xinhuanet.com/english/2020-01/09/c_138690570.html",
            "2. https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30154-9/fulltext",
            "3. https://www.who.int/dg/speeches/detail/who-director-general-s-opening-remarks-at-the-media-briefing-on-covid-19---11-march-2020",
            "4. https://www.cdc.gov/coronavirus/2019-ncov/about/transmission.html",
            "5. https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30211-7/fulltext",
            "6. https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30183-5/fulltext",
            "7. https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/high-risk-complications.html",
            "8. https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(20)30150-9/fulltext",
            "9. CDC: “Coronavirus Disease 2019 (COVID-19)",
            "10. https://www.nature.com/articles/s41422-020-0282-0?fbclid=IwAR2wgEzxXL3pzUEefkN4dOTq_iIEoq5O88p9ZPRMgYlDxLpg_bISGT6RoZ4"
          ],
          id: "1"
        },
        {
          image: image2,
          title: "Preparedness",
          body: [
            "What sanitation measures should I be taking?",
            "\u2022 Frequent handwashing for at least 20 seconds several times throughout the day",
            "\u2027 Maintaining distance from others in public spaces (6 feet recommended)",
            "\u2022 Avoid touching one’s face",
            "\u2022 Wear a mask if you suspect you have been exposed or have the virus or if you are caring for someone who has",
            " ",
            "What preventative measures should I be taking?",
            "\u2022 Stay home as much as possible",
            "\u2022 Avoid travel and public spaces as much as possible",
            "\u2022 Practice social distancing by staying away from large groups and gatherings",
            "\u2022 Those who suspect they may have the virus should wear a simple facemask around others",
            " ",
            "Should I self-quarantine and for how long?",
            "\u2022 Research shows that after being exposed and infected by COVID-19 it takes between 2 and 14 days for symptoms to begin, with most beginning by day 5",
            "\u2022 If you have been exposed, it is recommended you self-quarantine for 14 days, and longer if you develop symptoms or receive a positive test result. Government experts and healthcare providers can guide you in this case",
            " ",
            "How does one get diagnosed?",
            "\u2022 From one’s symptoms and risk factors",
            "\u2022 A nasal/throat swab or sputum sample",
            "\u2022 A chest CT scan",
            " ",
            "Is there a vaccine?",
            "\u2022 Currently there is no vaccine",
            "\u2022 Vaccine trials are underway, but may be far from production even if effective",
            "\u2022 According to the WHO, a vaccine is not expected to become available until 2021 at the earliest",
            " ",
            "Sources:",
            "1. https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public",
            "2. https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fabout%2Fsteps-when-sick.html",
            "3. https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fabout%2Fprevention.html",
            "4. https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fabout%2Fsymptoms.html",
            "5. https://onlinelibrary.wiley.com/doi/full/10.1111/tmi.13383",
            "6. https://mmrjournal.biomedcentral.com/articles/10.1186/s40779-020-0233-6",
            "7. https://www.sciencedaily.com/releases/2020/02/200226151951.html",
            "8. https://time.com/5804092/experimental-covid-19-vaccine-test-begins-as-u-s-volunteer-receives-first-shot"
          ],
          id: "2"
        },
        {
          image: image3,
          title: "Post-Infection Steps",
          id: "3",
          body: [
            "What should I be doing if I am sick?",
            "\u2022 The CDC currently recommends: 'If you think you have been exposed to COVID-19 and develop a fever and symptoms, such as cough or difficulty breathing, call your healthcare provider for medical advice.'",
            "\u2027 Look to your state or local guidelines surrounding best practices, testing criteria, and available healthcare facilities caring for patients with suspected COVID-19",
            "\u2022 Infected or possibly infected individuals should stay home (and avoid travel) except to get medical care",
            "\u2027 Call ahead before visiting a healthcare provider (they may have protocols such as meeting you outside to avoid many sick people coming into a waiting room)",
            "\u2027 If you are sick, you should wear a facemask if available when around others in the home or in public",
            "\u2022 Cover your face with a tissue when sneezing and coughing; then, dispose of the tissue and wash your hands for 20 seconds with soap and water",
            "\u2027 Use hand sanitizer with at least 60% alcohol content if you cannot wash your hands with soap and water - rub hands together until the alcohol dries without wiping it off on anything",
            "\u2027 Avoid sharing personal household items",
            "\u2027 Clean and disinfect commonly touched surfaces around the house daily",
            "\u2027 Maintain as much space between people as possible while in the same room; droplets carrying the virus can travel several feet. When possible, stay in a separate room and use a separate bathroom from other household members",
            "\u2027 Do not give aspirin to children with a fever as it can cause a serious condition called Reyes Syndrome",
            "\u2027 Do not leave home isolation until you are instructed to do so by healthcare providers in consultation with state and local health departments if you are confirmed to have COVID-19",
            "\u2027 If you develop difficulty breathing, pain or pressure in the chest, new confusion or inability to arouse, bluish lips or face, call your doctor or the local emergency room to find out the best way to get medical care immediately",
            " ",
            "Sources:",
            "1. https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html",
            "2. https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fabout%2Fprevention.html",
            "3. https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
          ]
        },
        {
          image: image4,
          title: "Myth-Busting",
          id: "4",
          body: [
            "Myth: Packages from China will infect me",
            "Fact:  Coronavirus is thought to spread by respiratory droplets. There is no evidence of Coronavirus infections associated with imported goods",
            " ",
            "Myth: I can get the Coronavirus from my pet",
            "Fact: There are no reports of people being infected by animals. However, CDC recommends people with Coronavirus limit contact with animals and with others",
            " ",
            "Myth: I should avoid people of Chinese ethnicity",
            "Fact: People of Chinese descent are not more likely to spread the virus. Disease affects everybody regardless of race or ethnicity",
            " ",
            "Myth: If I am young and healthy, I don’t have to worry about it affecting me",
            "Fact: Many healthy people can be without symptoms but still spread the virus and infect the rest of their community; this puts the elderly and people with weak immune systems at highest risk",
            " ",
            "Myth: I should wear a mask to protect me from Coronavirus",
            "Fact: Certain models of face masks protect healthcare workers who care for patients. Wearing a mask when you have symptoms but you must leave the home (for example, to access healthcare) can help protect others. Surgical masks available to the general public do not have a tight fit and do not protect from infection. Stocking up on masks for general prevention will deplete resources from healthcare workers and is not recommended at this time in the US. We are in this together, and ensuring that the people who need masks the most have adequate supply will be most important in preventing the spread of COVID-19",
            "Myth: Children are immune to Coronavirus",
            "Fact: Children of any age can be infected by Coronavirus. Children with existing health conditions are more likely to have complications",
            " ",
            "Myth:  Bleach, steroids, silver, essential oils,  UV lamps, gargling salt water, and at home remedies will protect or cure me from Coronavirus",
            "Fact: None of these will protect or cure a person from Coronavirus, in fact many of these practices pose a danger. The best practices to avoid being infected is to wash your hands, don’t touch your face, and avoid other people",
            " ",
            "Myth: I can take antibiotics for Coronavirus",
            "Fact: Antibiotics do not work on viruses and therefore do not work on Coronavirus",
            " ",
            "Sources:",
            "1. CDC: “How COVID-19 Spreads",
            "2. https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus/2019-novel-coronavirus-myth-versus-fact",
            "3. https://www.health.harvard.edu/diseases-and-conditions/coronavirus-resource-center",
            "4. https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/share-facts.html",
            "5. https://www.health.harvard.edu/diseases-and-conditions/coronavirus-resource-center",
            "6. https://www.cdc.gov/coronavirus/2019-ncov/faq.html"
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
