import React from "react";
import { AccordionList } from "accordion-collapse-react-native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";

import image1 from "../../images/preventativePractice/handwash.png";
import image2 from "../../images/preventativePractice/image3.gif";
import image3 from "../../images/preventativePractice/image2.jpg"; //need to get pic, not gif
import image4 from "../../images/preventativePractice/image4.jpg";
import image5 from "../../images/preventativePractice/image5C.jpg";
import image6 from "../../images/preventativePractice/image6.jpg";

export default class PreventativePractices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          image: image1,
          title: "Hygiene Habits",
          body: [
            "Hand Washing",
            "\u2022 20 seconds (typically the chorus of a song), rubbing between fingers, over tops and palms, and under nail beds ",
            "\u2022 Antibacterial soap or alcohol-based sanitizer",
            "\u2022 Avoid scalding hot water that may dry out skin, this may create microtears in the skin’s protective barrier",
            "General Tips",
            "\u2022 Avoid touching your face, become conscious of how often you do ",
            "\u2022 Because COVID-19 can transmit to the eyes, avoid wearing contact lenses if possible which may trap contaminants and wear traditional glasses instead",
            "\u2022 Routinely sanitize personal belongings (phones, wallets, keys, glasses) and high contact surfaces (handles, counters, car steering wheels)",
            "\u2022 Cover your coughs and sneezes with your elbow, facing away from others",
            "\u2022 Avoid handshaking and hugs when greeting others professionally and socially",
            "\u2022 Masks: N95 masks should ONLY be used in those showing symptoms, or those around the potentially infected",
            "\u2022 Surfaces: COVID-19 can live on fabrics and hard surfaces for a predicted period of several days, clean surfaces routinely with disinfectants "
          ],
          id: "1"
        },
        {
          image: image2,
          title: "Social Distancing",
          body: [
            "\u2022 Avoid touching your face, become conscious of how often you do ",
            "\u2022 Because COVID-19 can transmit to the eyes, avoid wearing contact lenses if possible which may trap contaminants and wear traditional glasses instead",
            "\u2022 Routinely sanitize personal belongings (phones, wallets, keys, glasses) and high contact surfaces (handles, counters, car steering wheels)",
            "\u2022 Cover your coughs and sneezes with your elbow, facing away from others",
            "\u2022 Avoid handshaking and hugs when greeting others professionally and socially",
            "\u2022 Masks: N95 masks should ONLY be used in those showing symptoms, or those around the potentially infected",
            "\u2022 Surfaces: COVID-19 can live on fabrics and hard surfaces for a predicted period of several days, clean surfaces routinely with disinfectants "
          ],
          id: "2"
        },
        {
          image: image3,
          title: "Stress and Stigma",
          id: "3",
          body: ["text1", "text2", "text3"]
        },
        {
          image: image4,
          title: "Preparation for the Potential",
          id: "4",
          body: ["text1", "text2", "text3"]
        },
        {
          image: image5,
          title: "Protecting the Immunocompromised",
          id: "5",
          body: ["text1", "text2", "text3"]
        },
        {
          image: image6,
          title: "Caring for the Infected",
          id: "6",
          body: ["text1", "text2", "text3"]
        }
      ]
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  _head = item => {
    const dimensions = Dimensions.get("window");
    const imageHeight = Math.round((dimensions.width * 3) / 4);
    const imageWidth = dimensions.width;
    return (
      // <Separator bordered style={{ alignItems: "center" }}>
      //<Text style={styles.header}>{item.title}</Text>
      <View style={styles.header}>
        <ImageBackground
          source={item.image}
          style={[
            {
              width: imageWidth * 0.9,
              height: imageHeight
            },
            styles.headerImage
          ]}
        >
          <Text style={[{ top: imageHeight - 37 }, styles.headerText]}>
            {item.title}
          </Text>
        </ImageBackground>
      </View>
    );
  };

  _body = item => {
    const dimensions = Dimensions.get("window");
    const imageWidth = dimensions.width;
    const bulletPoints = item.body.map(text => (
      <Text style={{ marginBottom: 5 }}>{text}</Text>
    ));
    return <View style={styles.content}>{bulletPoints}</View>;
  };

  render() {
    return (
      <View style={styles.container}>
        <AccordionList
          list={this.state.list}
          header={this._head}
          body={this._body}
          keyExtractor={item => item.id}
        />
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
    textShadowRadius: 2,

    shadowOffset: { height: 0, width: 0 }
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

//
