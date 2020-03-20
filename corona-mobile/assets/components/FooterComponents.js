import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { defaults, styles } from "../styles/styles"
import { SimpleButton } from './Buttons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function TeamMemberBox({ image, profile }) {
    const { name, position, schoolAndYear, bio } = profile;
    const [bioExpanded, setBioExpanded] = useState(false);

    return (
        <View style={localStyles.container}>
            <View style={{ flexDirection: "row", marginBottom: 10}}>
                <View style={{flexShrink: 1}}>
                    <Text style={localStyles.compactName}>{name}</Text>
                    <Text style={localStyles.position}>{position}</Text>
                    <Text style={localStyles.school}>{schoolAndYear}</Text>
                </View>
                <View style={{ flex: 1 }} />
                <Image source={image} style={localStyles.profileImages} />
            </View>
            <View style={localStyles.divider}/>
            <Text style={localStyles.bio} numberOfLines={bioExpanded ? 0 : 2}>{bio}</Text>
            <View style={{ flexDirection: "row", marginTop: 6 }}>
                <View style={{ flex: 1 }} />
                <View style={{backgroundColor: "white", paddingHorizontal: 3}}>
                    <SimpleButton title={bioExpanded ? "Show less" : "Show more"} action={() => setBioExpanded(!bioExpanded)} />
                </View>
            </View>
        </View>
    );
}

export function CompactTeamMemberBox({ name, schoolAndYear, position }) {
    return (
        <View style={localStyles.container}>
            <Text style={localStyles.compactName}>{name}</Text>
            <Text style={localStyles.position}>{position}</Text>
            <Text style={localStyles.school}>{schoolAndYear}</Text>
        </View>
    );
}

export function FAQItem({ question, answer }) {
    const [expanded, setExpanded] = useState(false);
    const color = expanded ? "black" : "grey"
    return [
        <View style={{ margin: 15 }}>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <Text style={[localStyles.questionText, { color: color }]}>{question}</Text>
                    <View style={{ flex: 1 }} />
                    <Ionicons name={expanded ? "ios-close" : "ios-add"} size={18} color={color} />
                </View>
            </TouchableOpacity>
            {expanded && <Text style={localStyles.answerText}>{answer}</Text>}
        </View>,
        <View style={styles.divider}/>
    ];
}

const localStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        shadowColor: 'rgba(67, 160, 71, 0.2)',
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15
    },
    divider: {
        height: 1,
        backgroundColor: "#e1e8ee",
        marginVertical: 10
      },
    profileImages: {
        height: 100,
        width: 66,
        resizeMode: "contain"
    },
    name: {
        fontSize: 30,
        fontWeight: '600'
    },
    compactName: {
        fontSize: 24,
        
    },
    position: {
        fontSize: 16,
        fontWeight: "700",
        color: "grey",
        
    },
    school: {
        fontSize: 16,
        fontWeight: "500",
        color: "grey",
        flexShrink: 1
    },
    bio: {
        color: "#000",
        fontSize: 16,
        color: "grey",
    },
    questionText: {
        fontSize: 16,
        fontWeight: "600",
        flexShrink: 1
    },
    answerText: {
        fontSize: 16,
        color: "grey",
        marginTop: 10
    }
});