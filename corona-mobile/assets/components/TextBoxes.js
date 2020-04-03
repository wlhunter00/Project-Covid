import * as React from "react";
import { View, TextInput, TouchableOpacity, RefreshControl } from "react-native";
import { useStyle } from "../styles/styles";

export function StandardTextBox(props) {
    const { defaultText, changeFunction } = props;
    const { styles } = useStyle("textBox");
    return (
        <TextInput
            style={[styles.textBox]}
            onChange={changeFunction}
            defaultValue={defaultText}
            {...props}
        />
    );
}