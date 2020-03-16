import React from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image
} from "react-native";
import downArrow from "../../images/downArrow.png";
import rightArrow from "../../images/rightArrow.png";
import Animated from "react-native-reanimated";

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.icons = {
      right: rightArrow,
      down: downArrow
    };

    this.state = {
      title: this.props.title,
      expanded: true,
      animation: new Animated.Value()
    };
  }

  toggle = () => {
    let initialValue = this.state.expanded
      ? this.state.maxHeight + this.state.minHeight
      : this.state.minHeight;
    let finalValue = this.state.expanded
      ? this.state.minHeight
      : this.state.maxHeight + this.state.minHeight;

    this.setState({ expanded: !this.state.expanded });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, { toValue: finalValue }).start();
  };

  setMaxHeight = event => {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  };

  setMinHeight = event => {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  };

  render() {
    let icon = this.state.expanded ? this.icons["down"] : this.icons["right"];

    return (
      <Animated.View
        style={[styles.container, { height: this.state.animation }]}
      >
        <View style={styles.titleContainer} onLayout={() => this.setMinHeight}>
          <Text style={styles.title}>{this.state.title}</Text>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.toggle}
            underlayColor="#f1f1f1"
          >
            <Image style={styles.buttonImage} source={icon}></Image>
          </TouchableHighlight>
        </View>

        <View
          style={styles.body}
          onLayout={() => {
            this.setMaxHeight;
          }}
        >
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 10,
    overflow: "hidden"
  },
  titleContainer: {
    flexDirection: "row"
  },
  title: {
    flex: 1,
    padding: 10,
    color: "#2a2f43",
    fontWeight: "bold"
  },
  button: {},
  buttonImage: {
    width: 30,
    height: 25
  },
  body: {
    padding: 10,
    paddingTop: 0
  }
});

export default Panel;
