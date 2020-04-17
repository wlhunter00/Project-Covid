import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { BlurView } from "expo-blur";
import {Ionicons} from "@expo/vector-icons"

import { useStyle } from "../../styles/styles";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { TouchableOpacity } from "react-native-gesture-handler";

const headerHeight = 300;

export default function ResourceTopic({route, navigation}){
  const { styles, colors, isDark } = useStyle("container", "imageButtonHeader", "imageButtonText", "imageButtonImage", "bioText", "positionText", "container");

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
      
      <BlurView intensity={100} style={{
        zIndex: 1, position: 'absolute',
        top: 10,
        right: 10,
        height: 35,
        width: 35,
        zIndex: 1,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
      }} tint="dark">
        <TouchableOpacity onPress={() => navigation.popToTop()} style={{height: '100%', width: '100%'}}>
          <Ionicons name="md-close" size={26} color="white" style={{ paddingTop: 4, marginLeft: 1 }} />
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}