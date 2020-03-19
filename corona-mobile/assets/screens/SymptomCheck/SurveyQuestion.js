import * as React from "react";
import { Text, View, TouchableHighlight, TouchableOpacity, Image } from "react-native";
import { SurveyButton } from './../../components/Buttons';
import { styles } from "../../styles/styles";

export function MultipleChoiceQuestion({ prompt, answers, currResponse, saveAnswer }) {
    const [currAnswer, changeAnswer] = React.useState("");
    const setAnswer = React.useCallback(
        (answer) => (event) => {
            saveAnswer(currResponse + answer + " " );
        },
        []
    );
    return (
        <View>
            <View style={{ marginLeft: 10 }}>
                <Text style={styles.navButtonTitle}>{prompt}</Text>
                <View>
                    {answers.map(function (answer) {
                        return <SurveyButton title={answer} action={setAnswer(answer)}/>
                    })}
                </View>
            </View>
        </View>
    );
}

export function ShortAnswerQuestion({ prompt, currResponse, saveAnswer }) {
    const [currAnswer, changeAnswer] = React.useState("");

    const setAnswer = React.useCallback(
         (event) => {
            {event.target &&
                changeAnswer(currAnswer => event.target.value);
                event.persist();
            }
        },
        []
    );

    const recordAnswer = React.useCallback(
        (answer) => (event) => {
            saveAnswer(currResponse + answer + " ");
        },
        []
    );
    return (
        <View>
            <View style={{ marginLeft: 10 }}>
                <Text style={styles.navButtonTitle}>{prompt}</Text>
                <View>
                    <input
                        type="text"
                        onChange={setAnswer}
                    />
                </View>
                <SurveyButton title="Continue" action={recordAnswer(currAnswer)} />
            </View>
        </View>
    );
}