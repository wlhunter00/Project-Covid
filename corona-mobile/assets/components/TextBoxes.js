import * as React from "react";
import { View } from "react-native";
import { styles } from "../styles/styles";

export function ResponseTextBox({ defaultText, changeFunction }) {
    return (
        <View style={styles.textBox}>
            <input
                type="text"
                placeholder={defaultText}
                onChange={changeFunction}
            />
            <View style={{ flex: 1 }} />
        </View>
    );
}