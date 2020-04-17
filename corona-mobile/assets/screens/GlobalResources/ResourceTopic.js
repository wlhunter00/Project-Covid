import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { useStyle } from "../../styles/styles";
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const headerHeight = 300;

export default function ResourceTopic({route, navigation}){
  const { styles, colors } = useStyle("container", "imageButtonHeader", "imageButtonText", "imageButtonImage", "bioText", "positionText", "container");

  const { title, source, body } = route.params;

  return (
    <View style={[styles.container]}>
      <ParallaxScrollView
        contentBackgroundColor={colors.backgroundColor}
        parallaxHeaderHeight={headerHeight}
        renderBackground={() => (
          <ImageBackground
            source={source}
            style={[
              {
                width: '100%',
                height: '100%'
              },
            ]}
          />
        )}
        renderForeground={() => (
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={[
              { top: headerHeight - 45 },
              styles.imageButtonText
            ]}
          >
            {title}
          </Text>
        )}>
        <View style={[styles.container, { height: '100%', paddingTop: 15, paddingHorizontal: 15, paddingBottom: 7 }]}>
          {body}
        </View>
      </ParallaxScrollView>
    </View>
  );
}