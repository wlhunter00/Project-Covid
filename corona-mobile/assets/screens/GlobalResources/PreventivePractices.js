import React from "react";
import { AccordionList } from "accordion-collapse-react-native";
import { Divider } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";

export default class PreventativePractices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          title: "Getting Started",
          body:
            "React native Accordion/Collapse component, very good to use in toggles & show/hide content"
        },
        {
          title: "Components",
          body: "AccordionList,Collapse,CollapseHeader & CollapseBody"
        }
      ]
    };
  }

  _head = item => {
    return (
      // <Separator bordered style={{ alignItems: "center" }}>
      <View style={styles.header}>
        <Text style={styles.header}>{item.title}</Text>
        <Divider style={{ height: 2, backgroundColor: "##99d19b" }} />
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
    paddingTop: 20
  },
  header: {
    textAlign: "center",
    padding: 5,
    marginBottom: 5,
    backgroundColor: "#8abdbb",
    borderRadius: 25
  },
  content: { padding: 10, backgroundColor: "#b8dedd", borderRadius: 10 }
});
