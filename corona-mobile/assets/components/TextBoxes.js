import * as React from "react";
import { View, TextInput, TouchableOpacity, RefreshControl } from "react-native";
import { useStyle } from "../styles/styles";

export function ResponseTextBox(props) {
    const { defaultText, changeFunction } = props;
    const { styles } = useStyle("textBox");
    return (
        <TextInput
            style={styles.textBox}
            multiline={true}
            onChange={changeFunction}
            defaultValue={defaultText}
            numberOfLines={5}
            {...props}
        />
    );
}