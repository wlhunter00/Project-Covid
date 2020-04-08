import React, { Component } from "react";
import { StyleSheet, Text, View, Share } from "react-native";
import { WebView } from "react-native-webview";
import { useStyle } from "../styles/styles";
import {
  Entypo
} from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
var URL = require('url');


function ConstructOriginWhitelist(urlString){
  let parsedUrl = URL.parse(urlString);
  console.log(parsedUrl.protocol + "//" + parsedUrl.host + "/*");
  return [parsedUrl.protocol + "//" + parsedUrl.host + "*"];
}

export default function StyledWebViewScreen({route, navigation}){
  const { styles } = useStyle("container");
  return <WebViewScreen route={route} navigation={navigation} styles={styles} />;
}

class WebViewScreen extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props);

    this.props.navigation.setOptions({ title: this.props.route.params.title });
    this.webViewRef = React.createRef();
    this.activeWhitelist = (this.props.route.params.originWhitelist === undefined) ? ["*"] : originWhitelist;
    
    this.state = {
      canGoBack: false,
      canGoForward: false,
      currentUrl: this.props.route.params.url
    }
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
  }
  
  render() {
    return(
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
            })
          }}
        />
        <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', maxHeight: 40, backgroundColor: 'green'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableHighlight 
              disabled={!this.state.canGoBack} 
              onPress={() => {this.webViewRef.current.goBack()}}
            >
              <Entypo name='chevron-left' size={40} color={this.state.canGoBack ? 'white' : 'grey'}/>
            </TouchableHighlight>
            <TouchableHighlight 
              disabled={!this.state.canGoForward}
              onPress={() => {this.webViewRef.current.goForward()}}
            >
              <Entypo name='chevron-right' size={40} color={this.state.canGoForward ? 'white' : 'grey'}/>
            </TouchableHighlight>
          </View>

          <TouchableHighlight style={{flex: 1}} onPress={() => {this.sharePage(this.state.currentUrl)}}>
            <Text style={{flex: 1, color: 'white', fontSize: 30}}>
              SHARE
            </Text>
          </TouchableHighlight>
            
        </View>

      </View>
    );
  }


}