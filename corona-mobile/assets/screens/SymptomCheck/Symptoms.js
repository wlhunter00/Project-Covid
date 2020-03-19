import * as React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { styles } from "./../../styles/styles.js";
import { MultipleChoiceQuestion, ShortAnswerQuestion } from './SurveyQuestion';
import { sendSymptoms } from './../../APIService.js';

export function Symptoms() {
  const [response, changeResponse] = React.useState("");
  const [questionNumber, changeQuestionNumber] = React.useState(1);

  const advanceQuestion = (newResponse) => {
    changeResponse(newResponse);
    changeQuestionNumber(questionNumber + 1);
  }

  const advanceQuestionSend = (newResponse) => {
    changeResponse(newResponse);
    changeQuestionNumber(questionNumber + 1);
    sendSymptoms(response);
  }
  console.log(response);
  return (
    <ScrollView>
      {questionNumber == 1 && (
        <ShortAnswerQuestion
          prompt="Could you describe your overall wellness over the past few days? Do you have any unusual symptoms or feel unwell?"
          currResponse={response}
          saveAnswer={advanceQuestion} />
          
      )}
      {questionNumber == 2 && (
        <ShortAnswerQuestion
          prompt="Could you please summarize any travel you have done recently?"
          currResponse={response}
          saveAnswer={advanceQuestion} />
      )
      }
      {questionNumber == 3 && (
        <ShortAnswerQuestion
          prompt= "Have you had personal interactions with individuals who have traveled recently?"
          currResponse={response}
          saveAnswer={advanceQuestion} />
      )
      }
      {questionNumber == 4 && (
        <ShortAnswerQuestion
          prompt="Have you been in any regions with high incidence of COVID-19? To learn more about current COVID-19 incidence, please view the heat map."
          currResponse={response}
          saveAnswer={advanceQuestionSend} />
      )
      }
      {questionNumber > 4 && (
        <Text style={styles.navButtonTitle}>Thank you for completing the survey. Please give us a moment while we calculate your results.</Text>
        
      )
      }
    </ScrollView>
  );
}
