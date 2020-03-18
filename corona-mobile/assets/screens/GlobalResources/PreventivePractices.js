import React from "react";
import { AccordionList } from "accordion-collapse-react-native";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

import image1 from "../../images/preventativePractice/handwash.png";
// import image2 from "../../images/preventativePractice/image2";
// import image3 from "../../images/preventativePractice/image3";
// import image4 from "../../images/preventativePractice/image4";
// import image5 from "../../images/preventativePractice/image5C";
// import image6 from "../../images/preventativePractice/image6";

export default class PreventativePractices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          title: image1,
          body:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim, augue sed viverra fermentum, dolor arcu rutrum magna, nec dictum enim augue congue tortor. Phasellus eget arcu vel diam euismod dignissim ac vel eros."
        },
        {
          title: image1,
          body:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim, augue sed viverra fermentum, dolor arcu rutrum magna, nec dictum enim augue congue tortor. Phasellus eget arcu vel diam euismod dignissim ac vel eros."
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
          source={image1}
          style={{
            width: imageWidth,
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
    return (
      <View style={styles.content}>
        <Text style={{ textAlign: "center" }}>{item.body}</Text>
      </View>
    );
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
    paddingHorizontal: 20,
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
  }
});
