import React, { useState } from "react";
import {
  View,
} from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";

import { useStyle } from "../styles/styles";
import { StandardText } from "./Texts.js";
import { Header } from 'react-navigation-stack';
import { useHeaderHeight } from "@react-navigation/stack";


export default function BigHeaderScrollView({ title, description, image, children }) {
    const { styles, colors } = useStyle("container" );
    let header = useHeaderHeight(); 

    return (<ParallaxScrollView
        parallaxHeaderHeight={header*3}
        stickyHeaderHeight={header}
        backgroundColor={colors.backgroundcolor}
        contentBackgroundColor={colors.backgroundcolor}
        renderBackground={() => <View style={styles.container} />}
        renderForeground={() => (
            <View
                style={{
                    marginBottom: 20,
                    marginTop: 100,
                    paddingHorizontal: 15,
                    marginLeft: 10,
                    marginRight: 10,
                    flexDirection: "row"
                }}
            >
                <View style={{ flex: 1 }}>
                    <StandardText
                        fontSize="title"
                        isBold
                        allowFontScaling={false}
                        style={{
                            marginBottom: 10
                        }}
                    >
                        {title}
      </StandardText>
                    <StandardText allowFontScaling={false}>
                        {description}
      </StandardText>
                </View>
                {image}
            </View>
        )}
        renderStickyHeader={() => (
            <View
                style={{
                    borderBottomColor: colors.accentcolor,
                    borderBottomWidth: 1,
                    paddingHorizontal: 15,
                    paddingBottom: 12,
                    justifyContent: "flex-end",
                    height: "100%"
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <StandardText isBold>{title}</StandardText>
                </View>
            </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        keyboardDismissMode="on-drag"
    >
        {children}
    </ParallaxScrollView>
    );
}