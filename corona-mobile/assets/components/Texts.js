import * as React from "react";
import { Text } from "react-native";
import { useStyle } from "../styles/styles";

export function StandardText({ children, fontSize, isBold, numberOfLines, style, allowFontScaling=true}) {
    const { styles } = useStyle("normalText");
    var realFontSize;
    switch (fontSize) {
        case "title":
            realFontSize = 34
            break;
        case "subtitle":
            realFontSize = 21;
            break;
        default:
            realFontSize = fontSize || 16;
    }
    return (
        <Text style={
            [styles.normalText,
            {
                fontSize: realFontSize,
                fontWeight: isBold ? "bold" : "normal"
                },
            style
            ]
        }
            numberOfLines={numberOfLines}
            allowFontScaling={allowFontScaling}
        >
            {children}
        </Text>
    );
}