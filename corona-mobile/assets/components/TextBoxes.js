import * as React from "react";
import { View, TextInput, TouchableOpacity, RefreshControl } from "react-native";
import { styles } from "../styles/styles";

export function ResponseTextBox({ defaultText, changeFunction }) {
    return (
            <TextInput
                style={styles.textBox}
                multiline={true}
                onChange={changeFunction}
                defaultValue={defaultText}
                numberOfLines={5}
            />
    );
}