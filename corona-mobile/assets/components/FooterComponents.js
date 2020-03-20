import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from "react-native"
import { defaults } from "../styles/styles"
import { SimpleButton } from './Buttons';

export function TeamMemberBox({ image, profile }) {
    const { name, position, schoolAndYear, bio } = profile;
    const [bioExpanded, setBioExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", marginBottom: 10}}>
                <View style={{flexShrink: 1}}>
                    <Text style={styles.compactName}>{name}</Text>
                    <Text style={styles.position}>{position}</Text>
                    <Text style={styles.school}>{schoolAndYear}</Text>
                </View>
                <View style={{ flex: 1 }} />
                <Image source={image} style={styles.profileImages} />
            </View>
            <View style={styles.divider}/>
            <Text style={styles.bio} numberOfLines={bioExpanded ? 0 : 2}>{bio}</Text>
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
        <View style={styles.container}>
            <Text style={styles.compactName}>{name}</Text>
            <Text style={styles.position}>{position}</Text>
            <Text style={styles.school}>{schoolAndYear}</Text>
        </View>
    );
}

export function FAQItem({ question, answer }) {
    const [expanded, setExpanded] = useState(false)
}

const styles = StyleSheet.create({
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
        fontSize: 16
    }
});