import React, { Component } from "react";

import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

import { useStyle } from "../../../styles/styles";

export default function LFRSite({ route, navigation }) {
    const { styles } = useStyle("container");
    const { site } = route.params;
    navigation.setOptions({ title: site.title });

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: site.source }}
                style={styles.container}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                originWhitelist={["*"]}
            />
        </View>
    );
}
