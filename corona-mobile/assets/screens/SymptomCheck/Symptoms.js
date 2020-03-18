import * as React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { styles } from "./../../styles/styles.js";
import { SurveyQuestion } from './SurveyQuestion';

export function Symptoms() {
  const [response, changeResponse] = React.useState("");
  const [questionNumber, changeQuestionNumber] = React.useState(1);

  const advanceQuestion = (newResponse) => {
    changeResponse(newResponse);
    changeQuestionNumber(questionNumber + 1);
  }

  return (
    <ScrollView>
      {questionNumber == 1 && (
        <SurveyQuestion
          prompt="Have you been in contact with anyone with symptoms?"
          answers={["Yes", "No"]}
          currResponse={response}
          saveAnswer={advanceQuestion} />
          
      )}
      {questionNumber == 2 && (
        <SurveyQuestion
          prompt="Do you have a cough?"
          answers={["Yes", "No"]}
          currResponse={response}
          saveAnswer={advanceQuestion} />
      )
      }
      {questionNumber == 3 && (
        <SurveyQuestion
          prompt="How's your temperature?"
          answers={["Normal (97°F to 99°F)", "High (99°F or higher)"]}
          currResponse={response}
          saveAnswer={advanceQuestion} />
      )
      }
      {questionNumber > 3 && (
        <Text>Thank you for completing the survey. Please give us a moment while we calculate your results.</Text>
      )
      }
    </ScrollView>
  );
}
