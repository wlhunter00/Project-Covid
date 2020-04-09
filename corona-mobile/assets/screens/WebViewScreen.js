import React, { Component } from "react";
import { StyleSheet, Text, View, Share } from "react-native";
import { WebView } from "react-native-webview";
import { useStyle } from "../styles/styles";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native-gesture-handler";
var URL = require("url");

function ConstructOriginWhitelist(urlString) {
  let parsedUrl = URL.parse(urlString);
  console.log(parsedUrl.protocol + "//" + parsedUrl.host + "/*");
  return [parsedUrl.protocol + "//" + parsedUrl.host + "*"];
}

export default function StyledWebViewScreen({ route, navigation }) {
  const { styles, colors } = useStyle("container");
  return (
    <WebViewScreen
      route={route}
      navigation={navigation}
      styles={styles}
      colors={colors}
    />
  );
}

class WebViewScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.colors);

    this.props.navigation.setOptions({
      title: "Latest News",
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            this.webViewRef.current.reload();
          }}
        >
          <Entypo name={"ccw"} size={25} color={"white"} />
        </TouchableOpacity>
      )
    });
    this.webViewRef = React.createRef();
    this.activeWhitelist =
      this.props.route.params.originWhitelist === undefined
        ? ["*"]
        : originWhitelist;

    this.state = {
      canGoBack: false,
      canGoForward: false,
      currentUrl: this.props.route.params.url
    };
  }

  sharePage = async () => {
    try {
      const result = await Share.share({
        url: this.state.currentUrl
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <View style={this.props.styles.container}>
        <WebView
          source={{ uri: this.props.route.params.url }}
          style={this.props.styles.container}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          originWhitelist={this.activeWhitelist}
          mediaPlaybackRequiresUserAction={true}
          ref={this.webViewRef}
          onNavigationStateChange={state => {
            this.setState({
              canGoBack: state.canGoBack,
              canGoForward: state.canGoForward,
              currentUrl: state.url
            });
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            maxHeight: 40,
            backgroundColor: this.props.colors.primarycolor
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 2
            }}
          >
            <TouchableOpacity
              style={{ marginHorizontal: 5 }}
              disabled={!this.state.canGoBack}
              onPress={() => {
                this.webViewRef.current.goBack();
              }}
            >
              <Entypo
                name="chevron-left"
                size={35}
                color={
                  this.state.canGoBack
                    ? "white"
                    : this.props.colors.secondarytextcolor
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginHorizontal: 5 }}
              disabled={!this.state.canGoForward}
              onPress={() => {
                this.webViewRef.current.goForward();
              }}
            >
              <Entypo
                name="chevron-right"
                size={35}
                color={
                  this.state.canGoForward
                    ? "white"
                    : this.props.colors.secondarytextcolor
                }
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              this.sharePage(this.state.currentUrl);
            }}
          >
            <FontAwesome
              style={{ marginRight: 17 }}
              name="share"
              size={25}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
