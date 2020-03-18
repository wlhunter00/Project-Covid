import * as React from "react";
import { Text, View, TouchableHighlight, TouchableOpacity, Image } from "react-native";
import { SurveyButton } from './../../components/Buttons';
import { styles } from "../../styles/styles";

export function SurveyQuestion({ prompt, answers, currResponse, saveAnswer }) {
    const [currAnswer, changeAnswer] = React.useState("");
    // const setAnswer = React.useCallback(() => {
    //     changeAnswer("hi");
    // }, [currAnswer]);
    const setAnswer = React.useCallback(
        (answer) => (event) => {
            // console.log("hey" + answer);
            // changeAnswer(currAnswer => answer);
            // console.log("hey2" + currAnswer);
            saveAnswer(currResponse + answer + " " );
        },
        []
    );
    // const setAnswer = answer => {
    //     changeAnswer(currAnswer => answer);
    // }

    // const keepAnswer = React.useCallback(() => {
    //     saveAnswer(currResponse => currResponse + " " + currAnswer);
    // }, [currResponse]);
    // console.log(currAnswer);
    return (
        <View>
            <View style={{ marginLeft: 10 }}>
                <Text style={styles.navButtonTitle}>{prompt}</Text>
                <View>
                    {answers.map(function (answer) {
                        return <SurveyButton title={answer} action={setAnswer(answer)}/>
                    })}
                </View>
                {/* <ActionButton title="Continue" action={saveAnswer(currResponse + " " + currAnswer)} /> */}
                {/* <ActionButton title="Continue" action={keepAnswer} /> */}
            </View>
        </View>
    );
}