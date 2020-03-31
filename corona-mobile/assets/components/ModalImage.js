import React from "react";
import { AccordionList } from "accordion-collapse-react-native";
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Button
} from "react-native";

import Modal from "react-native-modal";
import {
  TouchableWithoutFeedback,
  ScrollView,
  TouchableHighlight
} from "react-native-gesture-handler";
import { useStyle } from "../styles/styles";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function StyledModalImage(props) {
  const { styles, colors } = useStyle("bioText");
  return <ModalImage {...props} styles={styles} colors={colors} />;
}

class ModalImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      scrollOffset: 0
    };
    this.scrollRef = React.createRef();
  }

  _head = (item, x) => {
    const dimensions = Dimensions.get("window");
    const imageHeight = Math.round((dimensions.width * 3) / 4);
    const imageWidth = dimensions.width;
    return (
      <View style={localStyles.header}>
        <ImageBackground
          source={item.image}
          style={[
            {
              width: imageWidth * 0.9,
              height: imageHeight
            },
            localStyles.headerImage
          ]}
        >
          {x ? (
            <View style={{ alignItems: "flex-end" }}>
              <TouchableWithoutFeedback
                title="collapse"
                onPress={this.ToggleModalOff}
              >
                <Entypo
                  name="cross"
                  size={40}
                  adjustsFontSizeToFit={true}
                  style={{ color: "black" }}
                />
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <View />
          )}

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={[
              { top: x ? imageHeight - 90 : imageHeight - 45 },
              localStyles.headerText
            ]}
          >
            {item.title}
          </Text>
        </ImageBackground>
      </View>
    );
  };

  _body = item => {
    const { colors } = this.props;

    const dimensions = Dimensions.get("window");
    const imageWidth = dimensions.width;
    const bulletPoints = item.body.map((text, i) => (
      <Text key={i} style={{ marginBottom: 0 }}>
        {text}
      </Text>
    ));
    return (
      <View
        style={[
          localStyles.content,
          { backgroundColor: colors.secondarybackgroundcolor }
        ]}
      >
        {this._head(item, true)}
        <View style={{ height: 10 }} />
        <Text style={this.props.styles.bioText}>{bulletPoints}</Text>
      </View>
    );
  };

  ToggleModalOff = () => {
    this.setState({ isVisible: false });
  };

  ToggleModalOn = () => {
    this.setState({ isVisible: true });
  };

  handleOnScroll = event => {
    this.setState({ scrollOffset: event.nativeEvent.contentOffset.y });
  };

  handleScrollTo = p => {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollTo(p);
    }
  };

  render() {
    const { colors } = this.props;
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={this.ToggleModalOn}
          style={{ padding: 5 }}
        >
          {this._head(this.props.item, false)}
        </TouchableWithoutFeedback>
        <Modal
          isVisible={this.state.isVisible}
          propagateSwipe={true}
          onBackdropPress={this.ToggleModalOff}
          onSwipeComplete={this.ToggleModalOff}
          scrollTo={this.handleScrollTo}
          scrollOffset={this.state.scrollOffset}
        >
          <View style={{ flex: 1 }}>
            <ScrollView
              ref={this.scrollRef}
              onScroll={this.handleOnScroll}
              scrollEventThrottle={8}
              nestedScrollEnabled={true}
              contentContainerStyle={{ paddingTop: 30 }}
            >
              <View>
                {/* <TouchableWithoutFeedback
                  onPress={this.ToggleModalOff}
                > */}
                {this._body(this.props.item)}
                {/* </TouchableWithoutFeedback> */}
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  header: {
    padding: 0,
    marginBottom: 5,
    borderRadius: 50,
    borderBottomRightRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    padding: 10,
    paddingTop: 0,
    borderRadius: 5,
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
    borderRadius: 5
  }
});
