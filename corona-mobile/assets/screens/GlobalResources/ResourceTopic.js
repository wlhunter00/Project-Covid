import React from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { useStyle } from "../../styles/styles";
import { ScrollView } from "react-native-gesture-handler";

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { useNavigation } from "@react-navigation/native";

export default function StyledResourceTopic(props) {
  const { styles } = useStyle("container", "imageButtonHeader", "imageButtonText", "imageButtonImage", "bioText", "positionText", "container");
  const navigation = useNavigation()
  return <ResourceTopic {...props} styles={styles} navigation={navigation}/>;
}
class ResourceTopic extends React.Component {
  constructor(props){
    super(props);
    this.headerHeight = 300;
  }

  componentDidMount(){
    this.props.navigation.setOptions({
      title: this.props.route.params.title,
      gestureResponseDistance: {
        horizontal: 200
      }
    })
  }

  render(){
    return(
      <View style={[this.props.styles.container]}>
        <ParallaxScrollView
          contentBackgroundColor={this.props.styles.container.backgroundColor}
          parallaxHeaderHeight={this.headerHeight}
          renderBackground={() => (
            <ImageBackground
              source={this.props.route.params.source}
              style={[
                {
                  width: '100%',
                  height: '100%'
                },
              ]}
            >
            </ImageBackground>
          )}
          renderForeground={() => (
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={[
                { top: this.headerHeight - 45 },
                this.props.styles.imageButtonText
              ]}
            >
              {this.props.route.params.title}
            </Text>
          )}>
          <View style={[this.props.styles.container, {height: '100%', paddingTop: 15, paddingHorizontal: 15, paddingBottom: 7}]}>
            {this.props.route.params.body}
          </View>
        </ParallaxScrollView>
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
