import React, { useState } from "react";
import {
  View,
  Image,
  Text
} from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";

import { useStyle } from "../styles/styles";
import { StandardText } from "./Texts.js";
import { Header } from 'react-navigation-stack';
import { useHeaderHeight } from "@react-navigation/stack";


export default function BigHeaderScrollView({ title, description, image, children, numLines, isHome=false }) {
    const { styles, colors } = useStyle("container" );
    const logo = require("../images/logo-notext.png")
    let header = useHeaderHeight(); 
    let parallaxHeader = header*3 - 20;
    if (numLines == 1) {
        parallaxHeader = header*2.5;
    }
    if (isHome) {
        parallaxHeader = header * 3;
    }
    return (<ParallaxScrollView
        parallaxHeaderHeight={parallaxHeader}
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
            
            isHome ?
            (
                <View style={{ borderBottomColor: colors.accentcolor, borderBottomWidth: 1, paddingHorizontal: 15, paddingBottom: 5, justifyContent: 'flex-end', height: '100%' }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={logo} style={{ height: 43, width: 43, marginRight: 5, marginBottom: 3 }} />
                    <StandardText fontSize="title" isBold>
                        Project<Text style={{ fontWeight: "normal" }}>Covid</Text>
                    </StandardText>
                    </View>
                </View>
            )
            
            : (<View
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
            </View>)
        )}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        keyboardDismissMode="on-drag"
    >
        {children}
    </ParallaxScrollView>
    );
}