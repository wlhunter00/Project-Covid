import React from "react";
import { AccordionList } from "accordion-collapse-react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList
} from "react-native";

import image1 from "../../images/preventativePractice/handwash.png";
import image2 from "../../images/preventativePractice/image2.jpg";
import image3 from "../../images/preventativePractice/image3.gif";
import image4 from "../../images/preventativePractice/image4.jpg";
import image5 from "../../images/preventativePractice/image5C.jpg";
import image6 from "../../images/preventativePractice/image6.jpg";

export default class PreventativePractices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          title: image1,
          body: [
            "20 seconds (typically the chorus of a song), rubbing between fingers, over tops and palms, and under nail beds ",
            "Antibacterial soap or alcohol-based sanitizer",
            "Avoid scalding hot water that may dry out skin, this may create microtears in the skin’s protective barrier"
          ]
        },
        {
          title: image2,
          body: ["text1", "text2", "text3"]
        },
        {
          title: image3,
          body: ["text1", "text2", "text3"]
        },
        {
          title: image4,
          body: ["text1", "text2", "text3"]
        },
        {
          title: image5,
          body: ["text1", "text2", "text3"]
        },
        {
          title: image6,
          body: ["text1", "text2", "text3"]
        }
      ]
    };
  }

  _head = item => {
    const dimensions = Dimensions.get("window");
    const imageHeight = Math.round((dimensions.width * 9) / 16);
    const imageWidth = dimensions.width;
    return (
      // <Separator bordered style={{ alignItems: "center" }}>
      //<Text style={styles.header}>{item.title}</Text>
      <View style={styles.header}>
        <Image
          source={item.title}
          style={{
            width: imageWidth * 0.9,
            height: imageHeight,
            overflow: "hidden",
            resizeMode: "cover",
            borderRadius: 25
          }}
        />
      </View>
    );
  };

  _body = item => {
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#99d19b",
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
    marginBottom: 10,
    flexDirection: "column"
  }
});
