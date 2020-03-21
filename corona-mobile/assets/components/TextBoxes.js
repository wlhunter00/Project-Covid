import * as React from "react";
import { View, TextInput } from "react-native";
import { styles } from "../styles/styles";

export function ResponseTextBox({ defaultText, changeFunction }) {
    return (
        <View style = {styles.textBox}>
            <TextInput 
                multiline={true}
                onChange={changeFunction}
                defaultValue={defaultText}
                numberOfLines={5}
            />
            <View style={{ flex: 1 }} />
        </View>
    );
}