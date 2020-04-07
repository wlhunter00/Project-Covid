import * as React from "react";
import { View } from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { useStyle } from "../styles/styles";

export function ParallaxScrollView(props) {
    const { title, description, image, body } = props;
    const { styles } = useStyle("textBox");
    return (
        <ParallaxScrollView
            parallaxHeaderHeight={240}
            stickyHeaderHeight={89}
            backgroundColor={colors.backgroundcolor}
            contentBackgroundColor={colors.backgroundcolor}
            renderBackground={() => <View style={styles.container} />}
            renderForeground={() => (
                <View
                    style={{
                        marginBottom: 20,
                        marginTop: 100,
                        paddingHorizontal: 15,
                        flexDirection: "row"
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <StandardText
                            fontSize="title"
                            isBold
                            style={{
                                marginBottom: 10
                            }}
                        >
                            Symptoms
              </StandardText>
                        <StandardText allowFontScaling={false}>
                            The most common symptoms of COVID-19, and how prevalent they
                            are.
              </StandardText>
                    </View>
                    <FontAwesome
                        name="stethoscope"
                        size={100}
                        color={!isDark ? colors.textcolor : "#444"}
                    />
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
                        <StandardText isBold>Symptoms</StandardText>
                    </View>
                </View>
            )}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            keyboardDismissMode="on-drag"
        >
    );
}