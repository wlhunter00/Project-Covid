import * as React from "react";
import { View, TextInput } from "react-native";
import { styles } from "../styles/styles";

export function ResponseTextBox({ defaultText, changeFunction }) {
    return (
        <View style = {styles.textBox}>
                <TextInput 
                onChange={changeFunction}
                defaultValue={defaultText}
                />
            <View style={{ flex: 1 }} />
        </View>
    );
}