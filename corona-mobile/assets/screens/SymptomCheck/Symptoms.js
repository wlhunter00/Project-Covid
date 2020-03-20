import * as React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { styles } from "./../../styles/styles.js";
import { MultipleChoiceQuestion, ShortAnswerQuestion } from './SurveyQuestion';
import { sendSymptoms } from './../../APIService.js';
import { SurveyButton } from '../../components/Buttons';
import {
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";

export function Symptoms({ changeBackendResponse, changeSurveyDone }) {
  const [response, changeResponse] = React.useState("");
  const [questionNumber, changeQuestionNumber] = React.useState(0);
  const [allAnswers, changeAllAnswers] = React.useState(["", "", "", ""]);

  const advanceQuestionSimple = () => {
    changeQuestionNumber(questionNumber + 1);
  }
  
  const advanceQuestion = (newResponse) => {
    changeResponse(response + newResponse + " ");
    updateAnswer(newResponse);
    changeQuestionNumber(questionNumber + 1);
  }

  const advanceQuestionSend = (newResponse) => {
    changeResponse(response + newResponse + " ");
    updateAnswer(newResponse);
    changeQuestionNumber(questionNumber + 1);
    changeBackendResponse(sendSymptoms(response));
    changeSurveyDone(true);
  }

  const updateAnswer = (newAnswer) => {
    let newAnswers = [...allAnswers];
    newAnswers[questionNumber-1] = newAnswer;
    changeAllAnswers(newAnswers);
  }

  const goBack = (newResponse) => {
    updateAnswer(newResponse);
    changeQuestionNumber(questionNumber - 1);
  }

  console.log(response);
  return (
    <ScrollView>
      {questionNumber == 0 && (
        <View style={{alignItems:"center"}}>
        <FontAwesome name="stethoscope" size={100}/>
        <Text style={styles.surveyQuestionText}>Welcome to Symptom Check</Text>
        <Text style={styles.subtitle}>Here, you can fill out some questions to let us know how you're feeling. We will provide you with information and recommendations based on your responses.</Text>
        <SurveyButton title="Begin" action={advanceQuestionSimple} />
        </View>
      )}
      {questionNumber == 1 && (
        <View>
        <Text style={styles.surveyQuestionText}>Question {questionNumber}/4</Text>
        <ShortAnswerQuestion
          prompt="Could you describe your overall wellness over the past few days? Do you have any unusual symptoms or feel unwell?"
          currResponse={response}
          saveAnswer={advanceQuestion}
          defaultText={allAnswers[questionNumber-1]}
          goBack={goBack} />   
         </View> 
      )}
      {questionNumber == 2 && (
        <View>
        <Text style={styles.surveyQuestionText}>Question {questionNumber}/4</Text>
        <ShortAnswerQuestion
          prompt="Could you please summarize any travel you have done recently?"
          currResponse={response}
          saveAnswer={advanceQuestion}
          defaultText={allAnswers[questionNumber-1]} 
          goBack={goBack} />
        </View>
      )
      }
      {questionNumber == 3 && (
        <View>
        <Text style={styles.surveyQuestionText}>Question {questionNumber}/4</Text>
        <ShortAnswerQuestion
          prompt= "Have you had personal interactions with individuals who have traveled recently?"
          currResponse={response}
          saveAnswer={advanceQuestion}
          defaultText={allAnswers[questionNumber-1]} 
          goBack={goBack} />
        </View>
      )
      }
      {questionNumber == 4 && (
        <View>
        <Text style={styles.surveyQuestionText}>Question {questionNumber}/4</Text>
        <ShortAnswerQuestion
          prompt="Have you been in any regions with high incidence of COVID-19? To learn more about current COVID-19 incidence, please view the heat map."
          currResponse={response}
          saveAnswer={advanceQuestionSend}
          defaultText={allAnswers[questionNumber-1]} 
          goBack={goBack} />
        </View>
      )
      }
      {/* {questionNumber > 4 && (
        // <Text style={styles.surveyQuestionText}>Thank you for completing the survey. Please give us a moment while we calculate your results.</Text> 
      )
      } */}
    </ScrollView>
  );
}
